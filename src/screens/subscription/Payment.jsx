import React from 'react';
import {StripeProvider} from '@stripe/stripe-react-native';
import Checkout from './Checkout';
import { stripeConfig } from '../../config/config';

const PaymentComponent = ({children}) => (
  <StripeProvider
    publishableKey={stripeConfig.publishableKey}
    urlScheme={stripeConfig.urlScheme} // required for 3D Secure and bank redirects
    merchantIdentifier={stripeConfig.merchantIdentifier} // required for Apple Pay
  >
    {children}
  </StripeProvider>
);

export default Payment = PaymentComponent;
