import React from 'react'
import { View } from 'react-native'

import { ZegoUIKitPrebuiltCall, ONE_ON_ONE_VOICE_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn'

const appID = 1249344658;
const appSign = "2ed2bb743e506fe41e001c9a0db1bedb84a7134a6d6808ff544a640fdfa4d181";
const userID = 2;
const userName = "Test User";
const callID = "123";

const Calling = ({ navigation }) => {
  return (
    <View style={{height: "100%"}}>
      <ZegoUIKitPrebuiltCall
        appID={appID}
        appSign={appSign}
        userID={userID} // userID can be something like a phone number or the user id on your own user system. 
        userName={userName}
        callID={callID} // callID can be any unique string. 

        config={{
          // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
          ...ONE_ON_ONE_VOICE_CALL_CONFIG,
          onOnlySelfInRoom: () => { navigation.navigate('Home') },
          onHangUp: () => { navigation.navigate('Home') },
        }}
      />
    </View>
  )
}

export default Calling