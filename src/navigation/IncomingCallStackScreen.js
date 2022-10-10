import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS, images } from '../constant';
import MenuIcon from '../components/MenuIcon';
import {  IncomingCallListing, IncomingCallAdd } from '../screens';
const IncomingCallStackScreen = ({ navigation }) => {
    const IncomingCallStack = createNativeStackNavigator();
    return(
        <IncomingCallStack.Navigator
            screenOptions={{
                headerShown: true,
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: COLORS.primaryTextColor,
                },
                headerTintColor: COLORS.white,
                headerTitleStyle: {
                    fontWeight: '600',
                }
            }}
            initialRouteName="IncomingCallListing"
        >
            <IncomingCallStack.Screen 
                options={{ 
                    title: 'Incoming Calls',
                    headerLeft: () => {
                        return (
                            <MenuIcon navigate={navigation} />
                        )
                    }
                }}
                name="IncomingCallListing" 
                component={IncomingCallListing} 
            />
            <IncomingCallStack.Screen 
                options={{ 
                    //headerShown: false,
                    title: 'Incoming Call Add',
                }}
                name="IncomingCallAdd" 
                component={IncomingCallAdd} 
            />
            
        </IncomingCallStack.Navigator>
    );
};

export default IncomingCallStackScreen;