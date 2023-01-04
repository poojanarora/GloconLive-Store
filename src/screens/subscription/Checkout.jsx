import React from 'react';
import {useStripe} from '@stripe/stripe-react-native';
import {setLoading} from '../../actions/appAction';
import showAlertPopup from '../../components/AlertComp';
import axiosPrivate from '../../config/privateApi';
import { useDispatch } from 'react-redux';

export const useCheckoutScreen = (profile) => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const dispatch = useDispatch();

  const fetchPaymentSheetParams = async (deviceCount, subscriptionTotalAmount) => {
    let response = await axiosPrivate.post('stripe/payment-sheet', {
      email: profile.email,
      name: profile.name,
      amount: subscriptionTotalAmount,
      device_count: deviceCount,
      currency: 'usd',
    });
    if (response.data.success === true) {
      const {paymentIntent, ephemeralKey, customer, publishableKey} =
        response.data.data;
      return {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey,
      };
    }
  };

  const initializePaymentSheet = async (deviceCount, subscriptionTotalAmount) => {
    const {paymentIntent, ephemeralKey, customer, publishableKey} =
      await fetchPaymentSheetParams(deviceCount, subscriptionTotalAmount);

    const {error} = await initPaymentSheet({
      merchantDisplayName: 'GLOCONLIVE',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: false,
      defaultBillingDetails: {
        name: profile.name,
      },
    });
    dispatch(setLoading(false));
    if (!error) {
      openPaymentSheet();
    }
  };

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();

    if (error) {
      showAlertPopup(`Error code: ${error.code}`, error.message, 'ok');
    } else {
      showAlertPopup('Success', 'Your order is confirmed!', 'ok');
    }
  };

  // useEffect(() => {
  //   initializePaymentSheet();
  // }, []);

  return initializePaymentSheet;
};
