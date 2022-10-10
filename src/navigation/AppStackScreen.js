import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Splash } from '../screens';
import PublicStackScreen from './PublicStackScreen';
import DrawerScreen from './DrawerScreen';

const AppStackScreen = ({ navigation }) => {
    const AppStack = createNativeStackNavigator();
    return(
        <AppStack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Splash"
        >
            <AppStack.Screen name="Splash" component={Splash} />
            <AppStack.Screen name="PublicStackScreen" component={PublicStackScreen} />
            <AppStack.Screen 
                // options={({route}) => ({
                //     headerShown: true,
                //     headerTitleAlign: "center",
                //     headerStyle: {
                //         backgroundColor: COLORS.primaryTextColor,
                //     },
                //     headerTintColor: COLORS.white,
                //     headerTitleStyle: {
                //         fontWeight: '600',
                //     },
                //     headerLeft: () => {
                //         return (
                //             <MenuIcon navigate={navigation} />
                //         )
                //     },
                //     title: 'Incoming Call',
                // })}
                name="PrivateStackScreen" 
                component={DrawerScreen}
            />
            
        </AppStack.Navigator>
    );
};

export default AppStackScreen;