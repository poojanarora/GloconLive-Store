import React from 'react';
import {StripeProvider} from '@stripe/stripe-react-native';
import Checkout from './Checkout';

const PaymentComponent = props => (
  <StripeProvider
    publishableKey="pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3"
    urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
  >
    <Checkout />
  </StripeProvider>
);

export default Payment = PaymentComponent;
