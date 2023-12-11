import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, AppState } from "react-native";
import { Button, ListItem, Avatar, Switch } from "@rneui/themed";
import Icon from "react-native-vector-icons/FontAwesome6";
import auth from "@react-native-firebase/auth";
import * as ZIM from "zego-zim-react-native";
import * as ZPNs from "zego-zpns-react-native";
import ZegoUIKitPrebuiltCallService, {
  ZegoSendCallInvitationButton,
} from "@zegocloud/zego-uikit-prebuilt-call-rn";
import {
  useGetZegoTokenQuery,
  useGetProvidersQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../apis/user";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { AuthState, removeJwt, storeUserData } from "../../store/slices/authSlice";

interface HomeProps {
  navigation: any;
}

const appID = 1249344658;
const appSign =
  "2ed2bb743e506fe41e001c9a0db1bedb84a7134a6d6808ff544a640fdfa4d181";

const Home: React.FC<HomeProps> = ({ navigation }) => {

  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();
  const userdata = useSelector((state: { auth: AuthState }) => state.auth.userData);
  console.log("🔴" + JSON.stringify(userdata));

  const userID: string = userdata.id;

  const name = useSelector((state: RootState) => state.auth.userData.name);
  const photoURL = useSelector((state: RootState) => state.auth.userData.photoURL);
  const jwt = useSelector((state: RootState) => state.auth.jwt);
  const userName = userdata.name;

  console.log("🙌🙌😂😂💕💕", jwt);


  const response = useGetZegoTokenQuery();
  // const providersListRes = useGetProvidersQuery();
  const getProfile = useGetProfileQuery();
  const [updateProfile, updateProfileRes] = useUpdateProfileMutation();

  const [appState, setAppState] = useState(AppState.currentState);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {

    const handleAppStateChange = (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        setIsMounted(true);
        updateProfile({ status: "ONLINE" })
      } else if (appState === 'active' && nextAppState.match(/inactive|background/)) {
        setIsMounted(false);
        updateProfile({ status: "OFFLINE" })
      }
      setAppState(nextAppState);
    };

    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  console.log("Mount Status: ", isMounted);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      dispatch(removeJwt())
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  };

  const toggleSwitch = () => {
    setChecked(!checked);
    // updateProfile({})
  };

  useEffect(() => {
    if (getProfile.data) {
      dispatch(
        storeUserData({
          name: getProfile.data.firstName,
          photoURL: getProfile.data.pfp,
          id: getProfile.data.id.substring(0, 8),
          // email: res.data.email,
        })
      );
      userdata && console.log("😂" + JSON.stringify(userdata));
    }
  }, [getProfile.data, getProfile.isLoading]);

  useEffect(() => {
    try {
      ZegoUIKitPrebuiltCallService.init(
        appID, // You can get it from ZEGOCLOUD's console
        appSign, // You can get it from ZEGOCLOUD's console
        userID, // It can be any valid characters, but we recommend using a phone number.
        userName,
        [ZIM, ZPNs],
        {
          ringtoneConfig: {
            incomingCallFileName: "rutu.mp3",
            outgoingCallFileName: "ringing.mp3",
          },
          notifyWhenAppRunningInBackgroundOrQuit: true,
          androidNotificationConfig: {
            channelID: "AudioChannel",
            channelName: "CC",
          },
        }
      );
    } catch (error) {
      console.error("Error initializing ZegoUIKitPrebuiltCallService:", error);
    }
  }, []);

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <Avatar
            rounded
            size={"medium"}
            avatarStyle={{ borderWidth: 3, borderColor: "white" }}
            source={{ uri: getProfile.data?.pfp }}
          />
          <View>
            <Text style={styles.boldText}>Hi! {getProfile.data?.firstName}</Text>
            <Text style={styles.greyText}>Total Credits Earned: {0}</Text>
          </View>
        </View>
        <Button
          size={"sm"}
          buttonStyle={styles.buyCreditsButton}
          containerStyle={styles.buyCreditsContainer}
          titleStyle={styles.buyCreditsTitle}
          title={"Sign Out"}
          onPress={() => handleLogout()}
        />
      </View>

      <View style={{ padding: 8 }}>

        <View style={{ padding: 16, marginBottom: 16, borderWidth: 2, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ color: 'black' }}>Visibilty</Text>
          <Switch
            value={checked}
            // onValueChange={(value) => setChecked(value)}
            onValueChange={toggleSwitch}
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
          <Text style={{ fontWeight: "bold", color: "black" }}>Analytics</Text>
          <Text style={{ fontSize: 12, color: "gray" }}>This month</Text>
        </View>


        <View style={{ flexDirection: 'row', gap: 12, marginVertical: 4 }}>
          <View style={{ padding: 16, gap: 2, borderRadius: 8, backgroundColor: '#5E449B', flexGrow: 1 }}>
            <Text style={{ fontSize: 11, color: 'silver' }}>Calls connected</Text>
            <Text style={{ fontWeight: '800', color: 'white' }}>76</Text>
          </View>

          <View style={{ padding: 16, gap: 2, borderRadius: 8, backgroundColor: '#5E449B', flexGrow: 1 }}>
            <Text style={{ fontSize: 11, color: 'silver' }}>Calls Duration</Text>
            <Text style={{ fontWeight: '800', color: 'white' }}>232 minutes</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 12, marginVertical: 4 }}>
          <View style={{ padding: 16, gap: 2, borderRadius: 8, backgroundColor: '#5E449B', flexGrow: 1 }}>
            <Text style={{ fontSize: 11, color: 'silver' }}>Credits Earned</Text>
            <Text style={{ fontWeight: '800', color: 'white' }}>4506</Text>
          </View>

          {/* <View style={{ padding: 16, gap: 2, borderRadius: 8, backgroundColor: '#5E449B', flexGrow: 1 }}>
            <Text style={{ fontSize: 11, color: 'silver' }}>Calls Duration</Text>
            <Text style={{ fontWeight: '800', color: 'white' }}>232 minutes</Text>
          </View> */}
        </View>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FADD9A",
    marginBottom: 16,
  },
  profileInfo: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  boldText: {
    fontWeight: "bold",
    color: "black",
  },
  greyText: {
    fontSize: 12,
    color: "gray",
  },
  buyCreditsButton: {
    paddingHorizontal: 20,
    backgroundColor: "#5E449B",
  },
  buyCreditsContainer: {
    borderRadius: 50,
  },
  buyCreditsTitle: {
    fontSize: 10,
  },
  activeUsers: {
    paddingHorizontal: 16,
  },
  listItem: {
    paddingVertical: 0,
  },
});

export default Home;