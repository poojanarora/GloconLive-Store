import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import {Dimensions} from 'react-native';
import CustomDrawerScreen from './CustomDrawerScreen';
import IncomingCallStackScreen from './IncomingCallStackScreen';
import LocationStackScreen from './LocationStackScreen';
import ProfileStackScreen from './ProfileStackScreen';

const DrawerScreen = () => {
  const windowWidth = Dimensions.get('window').width;
  const drawerWidth = (windowWidth * 70) / 100;
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerScreen {...props} />}
      screenOptions={{
        headerShown: false, //This will hide header from all the screens
        drawerStyle: {width: drawerWidth},
        //drawerPosition: 'left',
        //drawerType: 'front',
        // headerTitleAlign: "center",
        // headerStyle: {
        //     backgroundColor: COLORS.primaryTextColor,
        // },
        // headerTintColor: COLORS.white,
        // headerTitleStyle: {
        //     fontWeight: '600',
        // },
      }}
      initialRouteName="Profile">
      <Drawer.Screen name="IncomingCall" component={IncomingCallStackScreen} />
      <Drawer.Screen name="Locations" component={LocationStackScreen} />
      <Drawer.Screen name="Profile" component={ProfileStackScreen} />
      {/*<Drawer.Screen 
                name="Notifications" 
                component={Notification}
                options={{ 
                    //headerShown: false, // This will hide header from scpecific component
                    title: 'My notification',
                }}
            /> */}
    </Drawer.Navigator>
  );
};

export default DrawerScreen;
