import React, {useState, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import { createStackNavigator } from '@react-navigation/stack';
import {COLORS, images} from '../constant';
import MenuIcon from '../components/MenuIcon';
import {IncomingCallListing, IncomingCallAdd, Ringing} from '../screens';
import CallPage from '../screens/incomingcall/CallPage';
import BackIcon from '../components/BackIcon';
import InCallChat from '../screens/chat/InCallChat';
const IncomingCallStackScreen = ({navigation}) => {
  const IncomingCallStack = createStackNavigator();

  useEffect(() => {
    console.log('Incoming call stack mounted');

    //Function to handel foreground push notification
    messaging().onMessage(async remoteMessage => {
      if (remoteMessage.data.type === 'ringing') {
        navigation.navigate('Ringing', remoteMessage.data);
      } else if (remoteMessage.data.type === 'silent') {
        navigation.navigate('IncomingCallListing');
      }
    });

    //When app is minimised and user click on received notification it goes here
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
      if (remoteMessage.data.type === 'ringing') {
        navigation.navigate('Ringing', remoteMessage.data);
      }
    });
  }, []);

  return (
    <IncomingCallStack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: COLORS.primaryTextColor,
        },
        headerTintColor: COLORS.white,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
      initialRouteName="IncomingCallListing">
      <IncomingCallStack.Screen
        options={{
          title: 'Incoming Calls',
          headerLeft: () => {
            return <MenuIcon navigate={navigation} />;
          },
        }}
        name="IncomingCallListing"
        component={IncomingCallListing}
      />
      <IncomingCallStack.Screen
        options={{
          headerShown: false,
        }}
        name="Ringing"
        component={Ringing}
      />
      <IncomingCallStack.Screen
        options={{
          //headerShown: false,
          title: 'Incoming Call Add',
        }}
        name="IncomingCallAdd"
        component={IncomingCallAdd}
      />
      <IncomingCallStack.Screen
        options={{
          headerShown: false,
        }}
        name="CallPage"
        component={CallPage}
      />
      <IncomingCallStack.Screen
        options={{
          title: '',
          headerLeft: () => {
            return <BackIcon navigate={navigation} />;
          },
        }}
        name="InCallChat"
        component={InCallChat}
      />
    </IncomingCallStack.Navigator>
  );
};

export default IncomingCallStackScreen;
