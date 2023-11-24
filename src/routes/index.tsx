// import { useSelector } from "react-redux";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import CallHistory from '../screens/CallHistory';
import CreditHistory from '../screens/CreditHistory';
import Settings from '../screens/Settings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import UserProfile from '../screens/UserProfile';

import * as ZIM from 'zego-zim-react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
  ZegoSendCallInvitationButton,
  ZegoMenuBarButtonName,
  ZegoUIKitPrebuiltCallFloatingMinimizedView,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);

const CallHistoryStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CallHistory" component={CallHistory} />
  </Stack.Navigator>
);

const CreditHistoryStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CreditHistory" component={CreditHistory} />
  </Stack.Navigator>
);

const SettingsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Settings" component={Settings} />
  </Stack.Navigator>
);

const MainStack = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarIcon: ({ focused, color }) => {
        const size = 22;
        if (route.name === 'HomeTab') {
          return <Icon name="home-lightning-bolt" size={30} color={color} />;
        } else if (route.name === 'CallHistoryTab') {
          return <Icon name="history" size={25} color={color} />;
        } else if (route.name === 'CreditHistoryTab') {
          return <Icon name="credit-card-clock" size={25} color={color} />;
        } else if (route.name === 'SettingsTab') {
          return <Icon2 name="settings-sharp" size={25} color={color} />;
        }
      },
      tabBarActiveTintColor: '#5E449B',
      // tabBarInactiveTintColor: '#64748B',
      tabBarLabelStyle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 10,
      },
      // tabBarStyle: {
      //   height: 60,
      //   paddingTop: 10,
      //   paddingBottom: 5,
      //   position: 'absolute',
      // },
    })}>
    <Tab.Screen
      name="HomeTab"
      options={{ tabBarLabel: 'Home' }}
      // options={{tabBarShowLabel: false}}
      component={HomeStack}
    />
    <Tab.Screen
      name="CallHistoryTab"
      options={{ tabBarLabel: 'Call History' }}
      // options={{tabBarShowLabel: false}}
      component={CallHistoryStack}
    />
    <Tab.Screen
      name="CreditHistoryTab"
      options={{ tabBarLabel: 'Credit History' }}
      // options={{tabBarShowLabel: false}}
      component={CreditHistoryStack}
    />
    <Tab.Screen
      name="SettingsTab"
      options={{ tabBarLabel: 'Settings' }}
      // options={{tabBarShowLabel: false}}
      component={SettingsStack}
    />
  </Tab.Navigator>
);

const RootStack = () => {
  // const userData = useSelector(state => state.Auth.userData);
  // const dispatch = useDispatch();
  // dispatch(setDefaultBook(userData?.defaultBook));
  // const isLoggedIn = userData.jwt;

  return (
    <Stack.Navigator>
      {/* // <Stack.Screen name="AuthStack" component={AuthStack} /> */}

      <Stack.Screen
        name="MainStack"
        component={MainStack}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />

      <Stack.Screen
        options={{ headerShown: false }}
        // DO NOT change the name 
        name="ZegoUIKitPrebuiltCallWaitingScreen"
        component={ZegoUIKitPrebuiltCallWaitingScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        // DO NOT change the name
        name="ZegoUIKitPrebuiltCallInCallScreen"
        component={ZegoUIKitPrebuiltCallInCallScreen}
      />

    </Stack.Navigator>
  );
};

//   const DrawerNavigator = () => (
//     <Drawer.Navigator
//       screenOptions={{
//         headerShown: false,
//         drawerStyle: {
//           backgroundColor: '#fff',
//           width: WIDTH,
//         },
//         drawerType: 'slide',
//       }}
//       drawerContent={props => <DrawerContent {...props} />}>
//       <Drawer.Screen name="RootStack" component={RootStack} />
//     </Drawer.Navigator>
//   );

export default RootStack;
