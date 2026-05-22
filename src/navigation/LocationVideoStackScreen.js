import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../constant';
import MenuIcon from '../components/MenuIcon';
import LocationVideoUploadBanner from '../components/LocationVideoUploadBanner';
import { LocationVideoListing, LocationVideoAdd } from '../screens';

const LocationVideoMenuButton = ({ navigation }) => {
  return <MenuIcon navigate={navigation} />;
};

const LocationVideoStackScreen = ({ navigation }) => {
  const LocationVideoStack = createStackNavigator();
  return (
    <>
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
        initialRouteName="LocationVideoListing"
      >
        <LocationVideoStack.Screen
          options={{
            title: 'Location Videos',
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => (
              <LocationVideoMenuButton navigation={navigation} />
            ),
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
      <LocationVideoUploadBanner />
    </>
  );
};

export default LocationVideoStackScreen;
