import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
  Linking,
} from 'react-native';
import styles from './style.js';
import ButtonComp from '../../components/ButtonComp.jsx';
import IncrementDecrementInput from '../../components/IncermentDecrementInput.jsx';
import images from '../../constant/images.js';
import PopupModal from '../../components/PopupModal.jsx';
import Spinner from '../../components/Spinner.jsx';
import { connect } from 'react-redux';
import { fetchSubscriptionInfo } from '../../actions/subscriptionAction.js';
import Payment from './Payment.jsx';
import { useCheckoutScreen } from './Checkout.jsx';
import AlertComp from '../../components/AlertComp.jsx';
import { useIAP, PurchaseError, requestSubscription } from 'react-native-iap';

const SubscriptionComponent = ({
  profile,
  subscription,
  fetchSubscriptionInfo,
  navigation,
}) => {
  const initialFormValues = {
    deviceCount: 0,
    subscriptionTotalAmount: 0,
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [subDisabled, setSubDisabled] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);
  const initializePaymentSheet = useCheckoutScreen(profile);
  const {
    connected,
    subscriptions,
    getSubscriptions,
    currentPurchase,
    finishTransaction,
    purchaseHistory,
    getPurchaseHistory,
  } = useIAP();

  const [loading, setLoading] = useState(false);

  const errorLog = ({ message, error }) => {
    console.error("An error happened", message, error);
  };

  // const isIos = Platform.OS === "ios";

  const subscriptionSkus = Platform.select({
    ios: ["gloconmonthly299"],
  });

  useEffect(() => {
    console.log('Subscription component mounted');

    fetchSubscriptionInfo(profile.id);

    return () => {
      console.log('Subscription component unmounted');
    };
  }, []);

  const handelSubmit = async () => {
    if (formValues.deviceCount > 0) {
      setSubDisabled(true);
      console.log('formValues', formValues.deviceCount)
      console.log('formValues', formValues.subscriptionTotalAmount)

      initializePaymentSheet(
        formValues.deviceCount,
        formValues.subscriptionTotalAmount,
        onPayment
      );
    } else {
      AlertComp('Error', 'Please add device', 'ok');
    }
  };

  const onPayment = (error) => {
    setSubDisabled(false);
    if (!error) {
      navigation.navigate('Profile');
      hideModal();
    }
  }

  // Function to show modal
  const showModal = () => {
    setModalVisible(true);
  };

  // Function to hide modal
  const hideModal = () => {
    setModalVisible(false);
  };

  // Function to increment price 
  const handelIncrement = () => {
    let currentDeviceCount = formValues.deviceCount + 1;
    let total = parseFloat(formValues.subscriptionTotalAmount);

    if (
      currentDeviceCount + subscription.alreadyAddedDeviceCount <=
      subscription.deviceBaseLimit
    ) {
      total = total + parseFloat(subscription.perDeviceFee);
    } else {
      total = total + parseFloat(subscription.perDeviceFeeAboveBaseLimit);
    }

    setFormValues({
      ...formValues,
      deviceCount: currentDeviceCount,
      subscriptionTotalAmount: total.toFixed(2),
    });
  };

  // Function to decrement price 
  const handelDecrement = () => {
    let currentDeviceCount = formValues.deviceCount;
    if (currentDeviceCount >= 1) {
      let total = parseFloat(formValues.subscriptionTotalAmount);
      if (
        currentDeviceCount + subscription.alreadyAddedDeviceCount <=
        subscription.deviceBaseLimit
      ) {
        total = total - parseFloat(subscription.perDeviceFee);
      } else {
        total = total - parseFloat(subscription.perDeviceFeeAboveBaseLimit);
      }
      setFormValues({
        ...formValues,
        deviceCount: currentDeviceCount - 1,
        subscriptionTotalAmount: total.toFixed(2),
      });
    }
  };
  

  console.log('NEW PRICE',subscription)

  const renderAddSubscriptionModal = () => {
    return (
      <Payment>
        <PopupModal
          show={modalVisible}
          closeAction={hideModal}
          submitAction={handelSubmit}
          title="Add Device"
          //subTitle="Add Subscription"
          primaryButtonText="Add"
          submitDisabled={subDisabled}
          dangerButtonText="Cancel">
          <View style={styles.formSectionWrapper}>
            <IncrementDecrementInput
              label="Number of device"
              placeholder="Enter number of device"
              name="locationName"
              value={formValues.deviceCount}
              incrementIcon={images.add}
              decrementIcon={images.minus}
              incrementAction={handelIncrement}
              decrementAction={handelDecrement}
            />
            <View style={styles?.totalAmountWrapper}>
              <Text style={styles?.totalAmountLabel}>
                Total Amount : ${formValues.subscriptionTotalAmount}
              </Text>
            </View>
          </View>
        </PopupModal>
      </Payment>
    );
  };

  const handleGetPurchaseHistory = async () => {
    try {
      await getPurchaseHistory();
    } catch (error) {
      errorLog({ message: "handleGetPurchaseHistory", error });
    }
  };

  useEffect(() => {
    handleGetPurchaseHistory();
  }, [connected]);

  const handleGetSubscriptions = async () => {
    try {
      await getSubscriptions({ skus: subscriptionSkus });
    } catch (error) {
      errorLog({ message: "handleGetSubscriptions", error });
    }
  };

  useEffect(() => {
    handleGetSubscriptions();
  }, [connected]);


  useEffect(() => {
    if (
      purchaseHistory.find(
        (x) => x.productId === (subscriptionSkus[0] || subscriptionSkus[1]),
      )
    ) {
      navigation.navigate("Home");
    }
  }, [connected, purchaseHistory, subscriptions]);

  useEffect(() => {
    const checkCurrentPurchase = async (purchase) => {
      if (purchase) {
        try {
          const receipt = purchase.transactionReceipt;

          if (receipt) {
            if (Platform.OS === "ios") {
              // const isTestEnvironment = __DEV__;
              //send receipt body to apple server to validete
              // const appleReceiptResponse = await validateReceiptIos(
              //   {
              //     "receipt-data": receipt,
              //     password: ITUNES_SHARED_SECRET,
              //   },
              //   isTestEnvironment,
              // );

              // //if receipt is valid
              // if (appleReceiptResponse) {
              //   const { status } = appleReceiptResponse;
              //   if (status) {
              //     navigation.navigate("Home");
              //   }
              // }
              return;
            }
          }
        } catch (error) {
          console.log("error", error);
        }
      }
    };
    checkCurrentPurchase(currentPurchase);
  }, [currentPurchase, finishTransaction]);


  const convertToUUID = (id) => {
    const idString = String(id);

    const paddedId = idString.padStart(12, '0');

    const uuid = `00000000-0000-0000-0000-${paddedId}`;

    return uuid;
  }

  const handleBuySubscription = async (productId) => {
    try {
      setLoading(true);
      await requestSubscription({
        sku: productId,
        appAccountToken: convertToUUID(profile?.id),
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof PurchaseError) {
        errorLog({ message: `[${error.code}]: ${error.message}`, error });
      } else {
        errorLog({ message: "handleBuySubscription", error });
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <Spinner />
      <View style={styles.body}>
        {renderAddSubscriptionModal()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>Global Seller Subscription
            </Text>
            <Text style={styles.bottomText}>Monthly
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={images.shop} />
          </View>
          <View style={styles.contentWrapper}>
            <View style={styles.contentRowWrapper}>
              <View style={styles.contentLeftSectionWrapper}>
                <Text style={styles.contentText}>1.</Text>
              </View>
              <View style={styles.contentRightSectionWrapper}>
                <Text style={styles.contentText}>
                  Start with a 90-day free trial, followed by a subscription of $899.99 per month per device, with a minimum of 4 devices
                </Text>
              </View>
            </View>
            <View style={styles.contentRowWrapper}>
              <View style={styles.contentLeftSectionWrapper}>
                <Text style={styles.contentText}>2.</Text>
              </View>
              <View style={styles.contentRightSectionWrapper}>
                <Text style={styles.contentText}>
                  The subscription is open-ended and can be canceled anytime with a 30- days notice
                </Text>
              </View>
            </View>
            <View style={styles.contentRowWrapper}>
              <View style={styles.contentLeftSectionWrapper}>
                <Text style={styles.contentText}>3.</Text>
              </View>
              <View style={styles.contentRightSectionWrapper}>
                <Text style={styles.contentText}>
                  Subscription will auto-renew every month based on the subscription plan  unless you cancel it 24 hours prior  to the end of current billing period
                </Text>
              </View>
            </View>

            <View style={styles.contentRowWrapper}>
              <View style={styles.contentLeftSectionWrapper}>
                <Text style={styles.contentText}>4.</Text>
              </View>
              <View style={styles.contentRightSectionWrapper}>
                <Text style={styles.contentText}>
                  GLOCONLIVE reserves the rights to change membership parameters
                  with 30-day notice.
                </Text>
              </View>
            </View>
            <View style={styles.contentRowWrapper}>
              <View style={styles.contentLeftSectionWrapper}>
                <Text style={styles.contentText}>5.</Text>
              </View>
              <View style={styles.contentRightSectionWrapper}>
                <Text style={styles.contentText}>
                  Each additional device beyond {subscription.deviceBaseLimit}{' '}
                  is ${subscription.perDeviceFeeAboveBaseLimit} per device with
                  same incremental 10% increase through year 5
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerWrapper}>
          {Platform.OS === 'android' && 
           <View>
           <Text style={styles.textStyle}>
             By subscribing, You agree to our
             <Text style={{ color: 'blue' }}
               onPress={() => {
                 Linking.openURL('https://app.termly.io/document/privacy-policy/aab54647-8897-4103-8424-388fee762714');
               }}>
               {''} Privacy Policy {''}
             </Text>
             and
             <Text style={{ color: 'blue' }}
               onPress={() => {
                 Linking.openURL('https://gloconlive.com/wp-content/uploads/2023/02/Terms-Of-Service1-Copy-edited.pdf');
               }}>
               {''} Terms of Use
             </Text>
           </Text>
         </View> }
         
          <View style={Platform.OS === 'android' ? styles.buttonSectionWrapper : styles.buttonSectionNonWrapper}>
            {Platform.OS === 'android' &&
              <ButtonComp btnText="Subscribe" btnStyle={{ width: '46%' }} action={() => {
                {
                  subscriptions.map((subscription, index) => {
                    const owned = purchaseHistory.find(
                      (s) => s?.productId === subscription.productId,
                    );
                    handleBuySubscription(subscription.productId)
                  })
                }
              }}
                disabled={loading}
                loading={loading}
              />}
            <ButtonComp btnText={Platform.OS === 'android' ? "Add Device" : 'Continue'} btnStyle={{ width: Platform.OS === 'android' ? '46%' : '70%', marginLeft: 10 }} action={showModal}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    subscription: state.subscription,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSubscriptionInfo: storeId => dispatch(fetchSubscriptionInfo(storeId)),
  };
};

const Subscription = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubscriptionComponent);

export default Subscription;
