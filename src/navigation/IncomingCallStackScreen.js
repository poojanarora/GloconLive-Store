import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {COLORS} from '../constant';
import MenuIcon from '../components/MenuIcon';
import {IncomingCallListing, IncomingCallAdd, Ringing} from '../screens';
import CallPage from '../screens/incomingcall/CallPage';
import BackIcon from '../components/BackIcon';
import InCallChat from '../screens/chat/InCallChat';
const IncomingCallStackScreen = ({navigation}) => {
  const IncomingCallStack = createStackNavigator();

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
