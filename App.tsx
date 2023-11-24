import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import type { PropsWithChildren } from 'react';
import MainNavigation from './src/routes';
// import { useColorScheme } from 'react-native';
import * as ZIM from 'zego-zim-react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
  ZegoSendCallInvitationButton,
  ZegoMenuBarButtonName,
  ZegoUIKitPrebuiltCallFloatingMinimizedView,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

import { Colors } from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    // <SafeAreaView style={backgroundStyle}>
    <NavigationContainer>
      <ZegoCallInvitationDialog />
      <MainNavigation />
    </NavigationContainer>
    // </SafeAreaView>
  );
}

export default App;
