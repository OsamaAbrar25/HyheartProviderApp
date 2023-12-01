import { Avatar, Button, ListItem } from '@rneui/themed';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { PermissionsAndroid, Platform } from 'react-native';

import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';

import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
  ZegoSendCallInvitationButton,
  ZegoMenuBarButtonName,
  ZegoUIKitPrebuiltCallFloatingMinimizedView,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { useSelector } from 'react-redux';

const appID = 1249344658;
const appSign = "2ed2bb743e506fe41e001c9a0db1bedb84a7134a6d6808ff544a640fdfa4d181";
const userID = "2";
const userName = "Provider User";



const Home = ({ navigation }) => {

  const name = useSelector(state => state.auth.userData.name);
  const photoURL = useSelector(state => state.auth.userData.photoURL)

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
            incomingCallFileName: 'rutu.mp3',
            outgoingCallFileName: 'ringing.mp3',
          },
          // notifyWhenAppRunningInBackgroundOrQuit: true,
          androidNotificationConfig: {
            channelID: "AudioChannel",
            channelName: "CC",
          },
        })
    } catch (error) {
      console.error('Error initializing ZegoUIKitPrebuiltCallService:', error);
    }
  }, []);



  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View
        style={{
          flexDirection: 'row',
          padding: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FADD9A',
          marginBottom: 16,
        }}>
        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
          <Avatar
            rounded
            // showEditButton
            size={'medium'}
            avatarStyle={{ borderWidth: 3, borderColor: 'white' }}
            source={{
              uri: photoURL,
            }}
          />
          <View>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>Hi! {name}</Text>
            <Text style={{ fontSize: 12, color: 'gray' }}>Your Credits: 12</Text>
          </View>
        </View>
        <Button
          size={'sm'}
          buttonStyle={{ paddingHorizontal: 20, backgroundColor: '#5E449B' }}
          containerStyle={{ borderRadius: 50 }}
          titleStyle={{ fontSize: 10 }}
          title={'Buy Credits'}
        />
      </View>

      <ZegoSendCallInvitationButton
        invitees={[{
          userID: "1", userName: "Test User"
        }]}
        isVideoCall={false}
        resourceID={"zego_data"} // Please fill in the resource ID name that has been configured in the ZEGOCLOUD's console here.
      />

    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#0055cc',
    margin: 5,
  },
  main: { flex: 1, alignItems: 'center' },
  scroll: { flex: 1, backgroundColor: '#ddeeff', width: '100%' },
  scrollContainer: { alignItems: 'center' },
  videoView: { width: '90%', height: 200 },
  btnContainer: { flexDirection: 'row', justifyContent: 'center' },
  head: { fontSize: 20 },
});

export default Home;
