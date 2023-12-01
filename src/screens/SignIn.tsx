import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native';
import { Button } from '@rneui/themed';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useValidateFirebaseTokenMutation } from '../apis/user';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { storeJwt, storeUserData } from '../store/slices/authSlice';

const SignIn = ({ navigation }) => {

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);
    const [validateFirebaseToken, validateFirebaseTokenRes] = useValidateFirebaseTokenMutation();
    const dispatch = useDispatch()

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '464645337735-ffkhbmdnod8uc9084pvtj0di82ins1tk.apps.googleusercontent.com',
        });
    }, []);

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);


    const onGoogleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
            // await auth().signInWithCredential(googleCredential);
            const user = auth().currentUser;

            const response = await auth().signInWithCredential(googleCredential)
                .then((result) => {
                    result.user
                        .getIdToken()
                        .then((token) => {
                            console.log("Token: ", token);
                            validateFirebaseToken({ token: token })
                        })
                    console.log(JSON.stringify(result.user));
                    dispatch(storeUserData({
                        name: result.user.displayName,
                        photoURL: result.user.photoURL,
                        email: result.user.email,
                    }))

                });

            // const token = await user?.getIdToken();
            // console.log(JSON.stringify(token));

            // console.log(JSON.stringify(response.user.getIdTokenResult()));


        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // User canceled the sign-in process
                console.log(error);

            } else if (error.code === statusCodes.IN_PROGRESS) {
                // Operation (e.g., sign in) is in progress already
                console.log(error);
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // Play services not available or outdated
                console.log(error);
            } else {
                // Some other error happened
                console.log(error);
            }
        }
    };

    if (initializing) return null;

    if (validateFirebaseTokenRes.isSuccess) {
        console.log("JWT " + JSON.stringify(validateFirebaseTokenRes.data.jwt));
        dispatch(storeJwt(validateFirebaseTokenRes.data.jwt))
        // AsyncStorage.setItem('JWT', validateFirebaseTokenRes.data.jwt);
    }


    return (
        <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            {user ?
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'MainTabNavigator' }],
                })
                :
                <Button
                    ViewComponent={LinearGradient} // Don't forget this!
                    linearGradientProps={{
                        colors: ['#FF84A7', '#E03368'],
                        start: { x: 0, y: 0.5 },
                        end: { x: 1, y: 0.5 },
                    }}
                    buttonStyle={{ width: 200, borderRadius: 4 }}
                    title="Sign in with Google"
                    onPress={onGoogleSignIn}
                />
            }
        </View>
    );
}

export default SignIn