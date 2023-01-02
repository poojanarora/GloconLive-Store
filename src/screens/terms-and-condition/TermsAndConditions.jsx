import {View, Text, ScrollView, StyleSheet} from 'react-native';
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </ScrollView>
      </View>
    </PopupModal>
  );
};
const styles = StyleSheet.create({
  popupTextContainer: {
    height: moderateVerticalScale(500),
    marginHorizontal: moderateScale(15),
    justifyContent: 'center',
    alignItems: 'center',
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
