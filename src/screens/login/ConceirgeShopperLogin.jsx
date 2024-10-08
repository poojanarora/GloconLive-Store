import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';
import styles from './styles.js';
import { images } from '../../constant';
import IconInput from '../../components/IconInput.jsx';
import ButtonComp from '../../components/ButtonComp.jsx';
import Spinner from '../../components/Spinner.jsx';
import { connect } from 'react-redux';
import { handleConceirgeLogin } from '../../actions/authActions.js';

const initialFormValues = {
  email: '',
  password: '',
};
const initialErrors = {
  email: '',
  password: '',
};

const ConceirgeShopperLoginComponent = ({ navigation, isLoading, onLogin }) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialErrors);
  const [isHidden, setIsHidden] = useState(true);

  /**
   * Function to handle password hide show.
   */
  const togglePassword = () => {
    setIsHidden(!isHidden);
  };

  /**
   * Function to handle email.
   */
  const handelEmail = e => {
    setFormValues({
      ...formValues,
      email: e,
    });
    setFormErrors({
      ...formErrors,
      email: '',
    });
  };

  /**
   * Function to handle passowrd.
   */
  const handelPassword = e => {
    setFormValues({
      ...formValues,
      password: e,
    });
    setFormErrors({
      ...formErrors,
      password: '',
    });
  };

  /**
   * Function to handle login form validation.
   */
  const validate = values => {
    let errors = {};
    if (!values.email) {
      errors.email = 'Please enter email.';
    } else {
      const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      const emailValidCheck = emailRegExp.test(values.email);
      if (emailValidCheck === false) {
        errors.email = 'Please enter a valid email address.';
      }
    }
    if (!values.password) {
      errors.password = 'Please enter password.';
    }
    return errors;
  };

  /**
   * Function to handle login form submit.
   */
  const onSubmit = () => {
    let validateResponse = validate(formValues);
    if (Object.keys(validateResponse).length > 0) {
      setFormErrors(validateResponse);
    } else {
      onLogin(formValues, loginCallback);
    }
  };

  /**
   * Function to handle login sucess.
   */
  const loginCallback = response => {
    if (response) {
      navigation.replace('ConceirgeShopperPrivateStackScreen');
    }
  };

  /**
   * Function to navigate to signup.
   */
  const navigateToSignUp = () => {
    navigation.navigate('CheckApplicationStatus');
  };

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <Spinner />
      <View style={styles.body}>
        <View style={styles.mainSectionWrapper}>
          <View style={styles.headerSectionWrapper}>
            <Image style={styles.logoImage} source={images.logo_color} />
          </View>
          <View style={styles.formSectionWrapper}>
            <IconInput
              label="Email"
              placeholder="mynamein@gmail.com"
              name="email"
              value={formValues.email}
              icon={images.tick}
              isSecure={false}
              error={formErrors.email}
              onChangeText={handelEmail}
              onClick={null}
            />
            <IconInput
              label="Password"
              placeholder="********"
              name="password"
              value={formValues.password}
              icon={isHidden ? images.eye : images.password_hidden_eye}
              isSecure={isHidden}
              error={formErrors.password}
              onChangeText={handelPassword}
              onClick={togglePassword}
            />
            <View style={styles.buttonSectionWrapper}>
              <ButtonComp btnText="Sign In" action={onSubmit} />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.app.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (formValues, loginCallback) =>
      dispatch(handleConceirgeLogin(formValues, loginCallback)),
  };
};

const ConceirgeShopperLogin = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConceirgeShopperLoginComponent);
export default ConceirgeShopperLogin;
