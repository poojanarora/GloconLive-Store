import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Payment, Subscription} from '../screens';
import { COLORS } from '../constant';
import MenuIcon from '../components/MenuIcon';
const SubscriptionScreenStack = ({navigation}) => {
  const SubscriptionStack = createStackNavigator();
  return (
    <SubscriptionStack.Navigator
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
      initialRouteName="SubscriptionScreen">
      <SubscriptionStack.Screen
        name="SubscriptionScreen"
        component={Subscription}
        options={{
          title: 'Subscription',
          headerLeft: () => {
            return <MenuIcon navigate={navigation} />;
          },
        }}
      />
      <SubscriptionStack.Screen
        name="Payment"
        component={Payment}
      />
    </SubscriptionStack.Navigator>
  );
};

export default SubscriptionScreenStack;
