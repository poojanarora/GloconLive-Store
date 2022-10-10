import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../screens/index.js';

const PublicStackScreen = () => {
    const PublicStack = createNativeStackNavigator();
    return(
        <PublicStack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Login"
        >
            <PublicStack.Screen name="Login" component={Login} />
        </PublicStack.Navigator>
    );
};

export default PublicStackScreen;