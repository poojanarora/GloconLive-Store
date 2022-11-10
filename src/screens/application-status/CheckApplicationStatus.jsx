import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from './styles.js';
import {images} from '../../constant';
import IconInput from '../../components/IconInput.jsx';
import ButtonComp from '../../components/ButtonComp.jsx';
import OverlaySpinnerHOC from '../../HOC/OverlaySpinnerHOC.js';
import axiosPublic from '../../config/publicApi.js';
import showAlertPopup from '../../components/AlertComp';

const OverlaySpinner = OverlaySpinnerHOC(View);
const initialFormValues = {
  email: '',
};
const initialErrors = {
  email: '',
};

const CheckApplicationStatus = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialErrors);

  //Function to handel email
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

  //Function to validate data
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
    return errors;
  };

  //Function to handel login
  const handelCheckApplicationStatus = async () => {
    try {
      let validateResponse = validate(formValues);
      if (Object.keys(validateResponse).length > 0) {
        setFormErrors(validateResponse);
      } else {
        setIsLoading(true);
        let response = await axiosPublic.post(
          '/check-application-status',
          formValues,
        );
        setTimeout(() => {
          setIsLoading(false);
          if (response.data.message !== 'No data found.') {
            navigation.navigate('ApplicationStatus', {
              status: response.data?.message,
            });
          } else {
            showAlertPopup('Opps', response.data?.message, 'Cancel');
          }
        }, 2000);
      }
    } catch (error) {
      console.log('In catch block');
      setIsLoading(false);
      if (error?.message === 'Network Error') {
        showAlertPopup(
          error?.message,
          'Please check your internet connectivity.',
          'Ok',
        );
      } else {
        showAlertPopup('Opps', error?.message, 'Cancel');
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <OverlaySpinner isLoading={isLoading}>
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
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
              />
              <View style={styles.buttonSectionWrapper}>
                <ButtonComp
                  btnText="Check Application Status"
                  action={handelCheckApplicationStatus}
                />
              </View>
            </View>
          </View>
        </View>
        {/* </ScrollView>  */}
      </OverlaySpinner>
    </SafeAreaView>
  );
};

export default CheckApplicationStatus;
