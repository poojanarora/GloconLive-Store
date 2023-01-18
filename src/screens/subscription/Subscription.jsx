import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import styles from './style.js';
import ButtonComp from '../../components/ButtonComp.jsx';
import IncrementDecrementInput from '../../components/IncermentDecrementInput.jsx';
import images from '../../constant/images.js';
import PopupModal from '../../components/PopupModal.jsx';
import Spinner from '../../components/Spinner.jsx';
import {connect} from 'react-redux';
import {fetchSubscriptionInfo} from '../../actions/subscriptionAction.js';
import Payment from './Payment.jsx';
import { useCheckoutScreen } from './Checkout.jsx';
import AlertComp from '../../components/AlertComp.jsx';

const SubscriptionComponent = ({
  profile,
  subscription,
  fetchSubscriptionInfo,
}) => {
  const initialFormValues = {
    deviceCount: 0,
    subscriptionTotalAmount: 0,
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [subDisabled, setSubDisabled] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);
  const initializePaymentSheet = useCheckoutScreen(profile);

  useEffect(() => {
    console.log('Subscription component mounted');

    //Calling function
    fetchSubscriptionInfo(profile.id);

    //Clean up function
    return () => {
      console.log('Subscription component unmounted');
    };
  }, []);

  // Function to handel submit
  const handelSubmit = async () => {
    if (formValues.deviceCount > 0) {
      setSubDisabled(true);
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
  }

  // Function to show modal
  const showModal = () => {
    setModalVisible(true);
  };

  // Function to hide modal
  const hideModal = () => {
    setModalVisible(false);
  };

  const handelIncrement = () => {
    let currentDeviceCount = formValues.deviceCount + 1;
    let total = formValues.subscriptionTotalAmount;
    if (
      currentDeviceCount + subscription.alreadyAddedDeviceCount <=
      subscription.deviceBaseLimit
    ) {
      total = total + subscription.perDeviceFee;
    } else {
      total = total + subscription.perDeviceFeeAboveBaseLimit;
    }
    setFormValues({
      ...formValues,
      deviceCount: currentDeviceCount,
      subscriptionTotalAmount: total,
    });
  };

  const handelDecrement = () => {
    let currentDeviceCount = formValues.deviceCount;
    if (currentDeviceCount >= 1) {
      let total = formValues.subscriptionTotalAmount;
      if (
        currentDeviceCount + subscription.alreadyAddedDeviceCount <=
        subscription.deviceBaseLimit
      ) {
        total = total - subscription.perDeviceFee;
      } else {
        total = total - subscription.perDeviceFeeAboveBaseLimit;
      }
      setFormValues({
        ...formValues,
        deviceCount: currentDeviceCount - 1,
        subscriptionTotalAmount: total,
      });
    }
  };

  const renderAddSubscriptionModal = () => {
    return (
      <Payment>
        <PopupModal
          show={modalVisible}
          closeAction={hideModal}
          submitAction={handelSubmit}
          title="Subscription"
          //subTitle="Add Subscription"
          primaryButtonText="Subscribe"
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
            <View style={styles.totalAmountWrapper}>
              <Text style={styles.totalAmountLabel}>
                Total Subscription Amount : {formValues.subscriptionTotalAmount}
              </Text>
            </View>
          </View>
        </PopupModal>
      </Payment>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <Spinner />
      <View style={styles.body}>
        {renderAddSubscriptionModal()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>Unlock Unlimited Access</Text>
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
                  90 day free trial registration and $
                  {subscription.perDeviceFee} per device monthly with a{' '}
                  {subscription.deviceBaseLimit} device minimum.
                </Text>
              </View>
            </View>
            <View style={styles.contentRowWrapper}>
              <View style={styles.contentLeftSectionWrapper}>
                <Text style={styles.contentText}>2.</Text>
              </View>
              <View style={styles.contentRightSectionWrapper}>
                <Text style={styles.contentText}>
                  10% incremental increases through year 5.
                </Text>
              </View>
            </View>
            <View style={styles.contentRowWrapper}>
              <View style={styles.contentLeftSectionWrapper}>
                <Text style={styles.contentText}>3.</Text>
              </View>
              <View style={styles.contentRightSectionWrapper}>
                <Text style={styles.contentText}>
                  Each additional device beyond {subscription.deviceBaseLimit}{' '}
                  is ${subscription.perDeviceFeeAboveBaseLimit} per device with
                  same incremental 10% increase through year 5
                </Text>
              </View>
            </View>
            <View style={styles.contentRowWrapper}>
              <View style={styles.contentLeftSectionWrapper}>
                <Text style={styles.contentText}>4.</Text>
              </View>
              <View style={styles.contentRightSectionWrapper}>
                <Text style={styles.contentText}>
                  Membership is open-ended and can be canceled upon request with
                  30-day notice.
                </Text>
              </View>
            </View>
            <View style={styles.contentRowWrapper}>
              <View style={styles.contentLeftSectionWrapper}>
                <Text style={styles.contentText}>5.</Text>
              </View>
              <View style={styles.contentRightSectionWrapper}>
                <Text style={styles.contentText}>
                  GLOCONLIVE reserves the rights to change membership parameters
                  with 30-day notice.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonSectionWrapper}>
          <ButtonComp btnText="Continue" action={showModal} />
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
