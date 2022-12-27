import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Login,
  CheckApplicationStatus,
  ApplicationStatus,
  DeviceLoginWithQR,
  ConceirgeShopperLogin,
} from '../screens/index.js';
import { COLORS } from '../constant/theme.js';
import BackIcon from '../components/BackIcon.jsx';

const PublicStackScreen = ({ navigation }) => {
  const PublicStack = createNativeStackNavigator();
  return (
    <PublicStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login">
      <PublicStack.Screen name="Login" component={Login} />
      <PublicStack.Screen
        name="CheckApplicationStatus"
        component={CheckApplicationStatus}
        options={{
          title: 'Application Status',
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: COLORS.primaryTextColor,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerLeft: () => {
            return <BackIcon navigate={navigation} />;
          },
        }}
      />
      <PublicStack.Screen
        name="ApplicationStatus"
        component={ApplicationStatus}
        options={{
          title: 'Application Status',
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: COLORS.primaryTextColor,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerLeft: () => {
            return <BackIcon navigate={navigation} />;
          },
        }}
      />
      <PublicStack.Screen
        name="DeviceLogin"
        component={DeviceLoginWithQR}
        options={{
          title: 'Link Device',
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: COLORS.primaryTextColor,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerLeft: () => {
            return <BackIcon navigate={navigation} />;
          },
        }}
      />
      <PublicStack.Screen
        name="conceirgeLogin"
        component={ConceirgeShopperLogin}
        options={{
          title: 'Conceirge Shopper Login',
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: COLORS.primaryTextColor,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerLeft: () => {
            return <BackIcon navigate={navigation} />;
          },
        }}
      />
    </PublicStack.Navigator>
  );
};

export default PublicStackScreen;
