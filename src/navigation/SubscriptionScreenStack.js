import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SubscriptionScreen} from '../screens';
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
    </SubscriptionStack.Navigator>
  );
};

export default SubscriptionScreenStack;
