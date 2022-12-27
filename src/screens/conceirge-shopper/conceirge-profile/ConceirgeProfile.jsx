import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { scale, moderateScale } from 'react-native-size-matters';
import styles from './style';
import { COLORS, images } from '../../../constant';
import IconInput from '../../../components/IconInput';
import ButtonComp from '../../../components/ButtonComp';
import PopupModal from '../../../components/PopupModal';
import IconInputWithoutLabel from '../../../components/IconInputWithoutLabel';
import { connect } from 'react-redux';
import Spinner from '../../../components/Spinner.jsx';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  fetchConceirgeShopperProfileInfo,
  storeProfile,
  changePassword,
  updateConceirgeShopperProfileInformation,
} from '../../../actions/profileActions';
import { setLoading } from '../../../actions/appAction';
import ImagePickerModel from '../../../components/ImagePickerModel';
import showAlertPopup from '../../../components/AlertComp';

const initialEditProfileErrors = {
  name: '',
  email: '',
};

const initialChangePasswordFormValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const initialChangePasswordErrors = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
  matchPassword: '',
};

const ConceirgeProfileComponent = ({
  isLoading,
  auth,
  profile,
  setLoading,
  fetchConceirgeShopperProfileInfo,
  updateConceirgeShopperProfileInformation,
  editProfileInfo,
  changePassword,
  navigation,
}) => {
  const [updatePasswordModalVisible, setUpdatePasswordModalVisible] =
    useState(false);
  const [imagePickerVisible, setImagePickerVisible] =
    useState(false);
  const [editProfileFormErrors, setEditProfileFormErrors] = useState(
    initialEditProfileErrors,
  );
  const [changePasswordFormValues, setChangePasswordFormValues] = useState(
    initialChangePasswordFormValues,
  );
  const [changePasswordFormErrors, setChangePasswordFormErrors] = useState(
    initialChangePasswordErrors,
  );
  const [showChangeProfilePicModel, setShowChangeProfilePicModel] =
    useState(false);

  const [choosenImage, setChoosenImage] = useState({});

  useEffect(() => {
    console.log('Profile component mounted');

    //Calling functions
    fetchConceirgeShopperProfileInfo(auth.email);

    //Cleanup function
    return () => {
      console.log('Profile component unmounted');
    };
  }, []);

  //Function to show change password modal
  const showUpdatePasswordModal = () => {
    setUpdatePasswordModalVisible(true);
  };
  //Function to show image picker modal
  const showImagePickerModal = () => {
    setImagePickerVisible(true);
  };

  //Function to hide change password modal
  const hideUpdatePasswordModal = () => {
    setUpdatePasswordModalVisible(false);
    setChangePasswordFormErrors(initialChangePasswordErrors);
  };

  //Function to show add store video modal
  const showAddStoreVideoModal = () => {
    navigation.navigate('AddStoreVideo');
  };

  //Function to render change password modal
  const renderUpdatePasswordModal = () => {
    return (
      <PopupModal
        show={updatePasswordModalVisible}
        closeAction={hideUpdatePasswordModal}
        submitAction={handelChangePassword}
        title="Change Password"
        subTitle="Create your new password"
        primaryButtonText="Submit"
        dangerButtonText="Cancel">
        <IconInputWithoutLabel
          placeholder="Old Password"
          name="oldPassword"
          value={changePasswordFormValues.oldPassword}
          showIcon={false}
          icon={images.tick}
          isSecure={true}
          error={changePasswordFormErrors.oldPassword}
          onChangeText={handelOldPassword}
        />
        <IconInputWithoutLabel
          placeholder="New Password"
          name="newPassword"
          value={changePasswordFormValues.newPassword}
          showIcon={false}
          icon={images.tick}
          isSecure={true}
          error={changePasswordFormErrors.newPassword}
          onChangeText={handelNewPassword}
        />
        <IconInputWithoutLabel
          placeholder="Confirm New Password"
          name="confirmPassword"
          value={changePasswordFormValues.confirmPassword}
          showIcon={false}
          icon={images.tick}
          isSecure={true}
          error={changePasswordFormErrors.confirmPassword}
          onChangeText={handelConfirmPassword}
        />
      </PopupModal>
    );
  };

  //Function to handel profile refresh
  const onRefresh = () => {
    fetchConceirgeShopperProfileInfo(auth.email);
  };

  //Function to launch gallery to select image
  // const pickImage = async () => {
  //   let result = await launchImageLibrary({
  //     mediaType: 'photo',
  //   });
  //   if (result.assets[0].fileSize > 1000000) {
  //     showAlertPopup('Oops', "Picture size should be less than 1 MB", 'Cancel');
  //   }
  //   else if (!result.didCancel) {
  //     setChoosenImage(result.assets[0]);
  //     editProfileInfo({ profilePic: result.assets[0].uri });
  //   }

  // };

  //Function to handel company name
  const handelCompanyName = e => {
    editProfileInfo({ name: e });
  };

  //Function to handel email
  const handelEmailId = e => {
    editProfileInfo({ email: e });
  };

  //Function to validate change password form
  const validateEditProfileForm = values => {
    let errors = {};
    if (!values.name) {
      errors.name = 'Please enter conceirge shopper name.';
    }
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

  //Function to update profile information
  const handelEditProfileChanges = async () => {
    try {
      let validateResponse = validateEditProfileForm(profile);
      if (Object.keys(validateResponse).length > 0) {
        setEditProfileFormErrors(validateResponse);
      } else {
        updateConceirgeShopperProfileInformation({
          conceirge_shopper_id: profile.id,
          profile_image: choosenImage,
          first_name: profile.firstName,
          last_name: profile.lastName,
          // name: profile.name,
          email: profile.email,
        });
      }
    } catch (error) {
      setLoading(false);
    }
  };

  //Function to handel old password
  const handelOldPassword = e => {
    setChangePasswordFormValues({
      ...changePasswordFormValues,
      oldPassword: e.replace(/\s/g, ''),
    });
    setChangePasswordFormErrors({ ...changePasswordFormErrors, oldPassword: '' });
  };

  //Function to handel new password
  const handelNewPassword = e => {
    setChangePasswordFormValues({
      ...changePasswordFormValues,
      newPassword: e.replace(/\s/g, ''),
    });
    setChangePasswordFormErrors({ ...changePasswordFormErrors, newPassword: '' });
  };

  //Function to handel confirm password
  const handelConfirmPassword = e => {
    setChangePasswordFormValues({
      ...changePasswordFormValues,
      confirmPassword: e.replace(/\s/g, ''),
    });
    setChangePasswordFormErrors({
      ...changePasswordFormErrors,
      confirmPassword: '',
    });
  };

  //Function to validate change password form
  const validateChangePasswordForm = values => {
    let errors = {};
    if (!values.oldPassword) {
      errors.oldPassword = 'Please enter old password.';
    }
    if (!values.newPassword) {
      errors.newPassword = 'Please enter new password.';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Please confirm password.';
    }
    if (values.newPassword != values.confirmPassword) {
      errors.matchPassword = showAlertPopup('Oops', "Confirm password should be match with new password", 'Cancel');

    }
    return errors;
  };

  //Funcion to update password
  const handelChangePassword = async (e) => {
    try {
      let validateResponse = validateChangePasswordForm(
        changePasswordFormValues,
      );
      if (Object.keys(validateResponse).length > 0) {
        setChangePasswordFormErrors(validateResponse);
      } else {
        await changePassword({
          email: auth.email,
          old_password: changePasswordFormValues.oldPassword,
          new_password: changePasswordFormValues.newPassword,
        });
        setChangePasswordFormValues(initialChangePasswordFormValues)
        hideUpdatePasswordModal();
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onProfilePicChange = () => {
    setShowChangeProfilePicModel(!showChangeProfilePicModel);
  };

  const renderImagePickerModel = () => {
    return (
      <ImagePickerModel
        show={imagePickerVisible}
        onImageSelection={image => {
          editProfileInfo({ profilePic: image.uri });
          setImagePickerVisible(false)
          setChoosenImage(image);
        }}
        onClose={() => setImagePickerVisible(false)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <Spinner />
      {renderUpdatePasswordModal()}
      {renderImagePickerModel()}
      <View style={styles.topSectionWrapper}>
        <View style={styles.profilePictureWrapper}>
          <Image style={styles.profileImage} source={{
            uri: profile.profilePic !== "" ? profile.profilePic : undefined
          }} />
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={showImagePickerModal}>
            <Image style={styles.cameraImage} source={images.camera} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomSectionWrapper}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }>
          <View style={styles.formSectionWrapper}>
            <View>
              <IconInput
                label="Shopper Name"
                placeholder="Conceirge Shopper Name"
                name="companyName"
                value={profile.name}
                icon={images.tick}
                isSecure={false}
                error={editProfileFormErrors.name}
                onChangeText={handelCompanyName}
              />
              <IconInput
                label="Email ID"
                placeholder="usermailid@gmail.com"
                name="email"
                value={profile.email}
                icon={images.tick}
                isSecure={false}
                error={editProfileFormErrors.email}
                onChangeText={handelEmailId}
              />
              <TouchableOpacity
                style={styles.updatePasswordlabelWrapper}
                onPress={showUpdatePasswordModal}>
                <Text style={styles.updatePasswordlabel}>Update Password</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonSectionWrapper}>
              <ButtonComp
                btnText="Upload Store Video"
                action={showAddStoreVideoModal}
                btnStyle={{
                  backgroundColor: COLORS.secondaryColor,
                  width: moderateScale(190),
                  shadowColor: COLORS.secondaryColor,
                }}
                btnTextStyle={{
                  fontSize: scale(12),
                  color: COLORS.black,
                }}
              />

              <ButtonComp
                btnText="SAVE"
                action={handelEditProfileChanges}
                btnStyle={{
                  width: moderateScale(100),
                }}
                btnTextStyle={{
                  fontSize: scale(12),
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.app.isLoading,
    auth: state.app.auth,
    profile: state.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoading: loading => dispatch(setLoading(loading)),
    fetchConceirgeShopperProfileInfo: email => dispatch(fetchConceirgeShopperProfileInfo(email)),
    editProfileInfo: obj => dispatch(storeProfile(obj)),
    updateConceirgeShopperProfileInformation: payload =>
      dispatch(updateConceirgeShopperProfileInformation(payload)),
    changePassword: payload => dispatch(changePassword(payload)),
  };
};

const ConceirgeProfile = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConceirgeProfileComponent);

export default ConceirgeProfile;
