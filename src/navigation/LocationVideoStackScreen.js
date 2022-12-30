import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLORS, images} from '../constant';
import MenuIcon from '../components/MenuIcon';
import {LocationVideoListing, LocationVideoAdd} from '../screens';

const LocationVideoStackScreen = ({navigation}) => {
  const LocationVideoStack = createNativeStackNavigator();
  return (
    <LocationVideoStack.Navigator
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
      initialRouteName="LocationVideoListing">
      <LocationVideoStack.Screen
        options={{
          title: 'Location Videos',
          headerLeft: () => {
            return <MenuIcon navigate={navigation} />;
          },
        }}
        name="LocationVideoListing"
        component={LocationVideoListing}
      />
      <LocationVideoStack.Screen
        options={{
          headerShown: false,
        }}
        name="LocationVideoAdd"
        component={LocationVideoAdd}
      />
    </LocationVideoStack.Navigator>
  );
};

export default LocationVideoStackScreen;
