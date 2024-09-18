import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {COLORS, images} from '../constant';
import MenuIcon from '../components/MenuIcon';
import {LocationListing, LocationDetails} from '../screens';

const LocationStackScreen = ({navigation}) => {
  const LocationStack = createStackNavigator();
  return (
    <LocationStack.Navigator
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
      initialRouteName="LocationListing">
      <LocationStack.Screen
        options={{
          title: 'Locations',
          headerLeft: () => {
            return <MenuIcon navigate={navigation} />;
          },
        }}
        name="LocationListing"
        component={LocationListing}
      />
      <LocationStack.Screen
        options={{
          title: 'Departments',
          headerLeft: () => {
            return <MenuIcon navigate={navigation} />;
          },
        }}
        name="LocationDetails"
        component={LocationDetails}
      />
    </LocationStack.Navigator>
  );
};

export default LocationStackScreen;
