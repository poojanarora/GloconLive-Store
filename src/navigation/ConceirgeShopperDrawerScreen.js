import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Dimensions} from 'react-native';
import CustomDrawerScreen from './CustomDrawerScreen';
import ConceirgeCustomDrawerScreen from './ConceirgeCustomDrawerScreen';
import IncomingCallStackScreen from './IncomingCallStackScreen';
import ConceirgeProfileStackScreen from './ConceirgeProfileStackScreen';

const ConceirgeShopperDrawerScreen = () => {
  const windowWidth = Dimensions.get('window').width;
  const drawerWidth = (windowWidth * 70) / 100;
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={props => <ConceirgeCustomDrawerScreen {...props} />}
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
      <Drawer.Screen name="Profile" component={ConceirgeProfileStackScreen} />
    </Drawer.Navigator>
  );
};

export default ConceirgeShopperDrawerScreen;
