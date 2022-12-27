import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Payment, SubscriptionScreen} from '../screens';
const SubscriptionScreenStack = ({navigation}) => {
  const SubscriptionStack = createNativeStackNavigator();
  return (
    <SubscriptionStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SubscriptionScreen">
      <SubscriptionStack.Screen
        name="SubscriptionScreen"
        component={SubscriptionScreen}
      />
      <SubscriptionStack.Screen
        name="Payment"
        component={Payment}
      />
    </SubscriptionStack.Navigator>
  );
};

export default SubscriptionScreenStack;
