import React, { useEffect, useState } from "react";
import { View, Button } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { useValidateFirebaseTokenMutation } from "../apis/user";
import { useDispatch, useSelector } from "react-redux";
import { storeJwt, storeUserData } from "../store/slices/authSlice";

const SignIn: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const dispatch = useDispatch();
  // const [token, setToken] = useState<string | undefined>();
  const [validateFirebaseToken, validateFirebaseTokenRes] = useValidateFirebaseTokenMutation();
  const jwt = useSelector((state: any) => state.auth.jwt);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "464645337735-ffkhbmdnod8uc9084pvtj0di82ins1tk.apps.googleusercontent.com",
    });
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber();
  }, []);

  useEffect(() => {
    if (validateFirebaseTokenRes.isSuccess) {
      dispatch(storeJwt(validateFirebaseTokenRes.data.jwt));
      console.log(validateFirebaseTokenRes);

    }
  }, [validateFirebaseTokenRes.isSuccess]);

  const onAuthStateChanged = (user: any) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  const onGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken
      );
      const response = await auth().signInWithCredential(googleCredential)
        .then((result) => {
          result.user
            .getIdToken()
            .then((token) => {
              // dispatch(storeJwt(token));
              validateFirebaseToken({ token, isProvider: true })
              console.log("Google Token:::::::::::", token);
            })
            .catch((error) => {
              console.log(error)
            })

        })

      // const tokenres = await response.user.getIdToken();
      // if (tokenres) {
      //   console.log("hey");
      //   setToken(tokenres);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleFirebaseTokenValidation = async () => {
  //   try {
  //     const res = await validateFirebaseToken({ token });
  //     if (res.data) {
  //       console.log("😂" + JSON.stringify(res.data));
  //       dispatch(storeJwt(res.data.jwt));

  //       jwt && console.log("😂" + jwt);
  //     } else {
  //       console.error("Failed to validate Firebase token");
  //     }
  //   } catch (error) {
  //     console.error("Error while validating Firebase token", error);
  //   }
  // };

  if (initializing) return null;

  return (
    <View
      style={{ height: "100%", justifyContent: "center", alignItems: "center" }}
    >
      {!jwt ? (
        <Button title="Sign in with Google" onPress={onGoogleSignIn} />
      ) : (
        navigation.reset({
          index: 0,
          routes: [{ name: "MainTabNavigator" }],
        })
      )}
    </View>
  );
};

export default SignIn;
