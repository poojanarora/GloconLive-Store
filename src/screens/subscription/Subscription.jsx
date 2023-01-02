import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import styles from './style.js';
import ButtonComp from '../../components/ButtonComp.jsx';
import IncrementDecrementInput from '../../components/IncermentDecrementInput.jsx';
import images from '../../constant/images.js';
import PopupModal from '../../components/PopupModal.jsx';

const Subscription = () => {
  const initialFormValues = {
    deviceCount: 1,
    subscriptionTotalAmount: 500,
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [subscriptionConfig, setSubscriptionConfig] = useState({
    perDeviceSubscriptionAmount: 500,
    perDeviceSubscriptionAmountBeyondBaseLimit: 450,
  });
  const [formValues, setFormValues] = useState(initialFormValues);

  // Function to handel submit
  const handelSubmit = async () => {};

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
    if (currentDeviceCount <= 4) {
      total = total + subscriptionConfig.perDeviceSubscriptionAmount;
    } else {
      total =
        total + subscriptionConfig.perDeviceSubscriptionAmountBeyondBaseLimit;
    }
    setFormValues({
      ...formValues,
      deviceCount: currentDeviceCount,
      subscriptionTotalAmount: total,
    });
  };

  const handelDecrement = () => {
    let currentDeviceCount = formValues.deviceCount;
    if (currentDeviceCount > 1) {
      let total = formValues.subscriptionTotalAmount;
      if (currentDeviceCount <= 4) {
        total = total - subscriptionConfig.perDeviceSubscriptionAmount;
      } else {
        total =
          total - subscriptionConfig.perDeviceSubscriptionAmountBeyondBaseLimit;
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
      <PopupModal
        show={modalVisible}
        closeAction={hideModal}
        submitAction={handelSubmit}
        title="Subscription"
        //subTitle="Add Subscription"
        primaryButtonText="Subscribe"
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
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
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
                  90 day free trial registration and $500.00 per device monthly
                  with a 4 device minimum.
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
                  Each additional device beyond 4 is $450.00 per device with
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

export default Subscription;
