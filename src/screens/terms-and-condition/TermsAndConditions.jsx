import {View, Text, Linking, StyleSheet} from 'react-native';
import React from 'react';
import PopupModal from '../../components/PopupModal';
import Spinner from '../../components/Spinner';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {connect} from 'react-redux';
import {
  updateTermsAndConditionFlag,
  handleLogout,
} from '../../actions/authActions';

const TermsAndConditionsComponent = ({
  navigation,
  auth,
  updateTermsAndConditionFlag,
  handleLogout,
}) => {
  //Function to close terms modal
  const hideTermsModal = () => {
    let obj = {
      accessToken: '',
      email: '',
      isLoggedIn: false,
    };
    handleLogout(obj);
    navigation.replace('PublicStackScreen');
  };

  //Function to submit terms modal
  const handelTermsConditionSubmit = () => {
    const payload = {
      email: auth.email,
      status: '1',
    };
    updateTermsAndConditionFlag(payload, termsAndConditionCallback);
  };

  /**
   * Function to handle terms and condition sucess.
   */
  const termsAndConditionCallback = response => {
    if (response) {
      navigation.replace('PrivateStackScreen');
    } else {
      hideTermsModal();
    }
  };

  return (
    <PopupModal
      show={true}
      closeAction={hideTermsModal}
      submitAction={handelTermsConditionSubmit}
      title="Terms and Conditions"
      subTitle="Please Read and accept our terms and conditions"
      primaryButtonText="Accept"
      dangerButtonText="Decline">
      <View style={styles.popupTextContainer}>
        <Spinner />
        <Text>
            Please read our terms and conditions
        </Text>
        <Text
            style={styles.hyperlinkStyle}
            onPress={() => {
              Linking.openURL('https://gloconlive.com/wp-content/uploads/2023/02/Terms-Of-Service1-Copy-edited.pdf');
            }}>
            here
          </Text>
      </View>
    </PopupModal>
  );
};
const styles = StyleSheet.create({
  popupTextContainer: {
    height: moderateVerticalScale(100),
    marginHorizontal: moderateScale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  hyperlinkStyle: {
    color: 'blue',
  },
});

const mapStateToProps = state => {
  return {
    auth: state.app.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateTermsAndConditionFlag: (payload, termsAndConditionCallback) =>
      dispatch(updateTermsAndConditionFlag(payload, termsAndConditionCallback)),
    handleLogout: payload => dispatch(handleLogout(payload)),
  };
};
const TermsAndConditions = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TermsAndConditionsComponent);
export default TermsAndConditions;
