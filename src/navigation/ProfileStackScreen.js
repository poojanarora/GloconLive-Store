import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLORS} from '../constant';
import MenuIcon from '../components/MenuIcon';
import {ShopVideoPreview, ViewProfile, AddStoreVideo} from '../screens';

const ProfileStackScreen = ({navigation}) => {
  const ProfileStack = createNativeStackNavigator();
  return (
    <ProfileStack.Navigator
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
      initialRouteName="ViewProfile">
      <ProfileStack.Screen
        options={{
          title: 'Profile',
          headerLeft: () => {
            return <MenuIcon navigate={navigation} />;
          },
        }}
        name="ViewProfile"
        component={ViewProfile}
      />
      <ProfileStack.Screen
        options={{
          //headerShown: false,
          title: 'Preview Video',
        }}
        name="ShopVideoPreview"
        component={ShopVideoPreview}
      />
      <ProfileStack.Screen
      options={{
          headerShown: false,
        }}
        name="AddStoreVideo"
        component={AddStoreVideo}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;
