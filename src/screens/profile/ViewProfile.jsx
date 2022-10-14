import React, { useState, useEffect, useCallback, Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    RefreshControl
} from 'react-native';
import { scale, moderateScale } from 'react-native-size-matters';
import styles from './viewProfileStyles';
import { COLORS, images } from '../../constant';
import IconInput from '../../components/IconInput';
import ButtonComp from '../../components/ButtonComp';
import PopupModal from '../../components/PopupModal';
import IconInputWithoutLabel from '../../components/IconInputWithoutLabel';
import useAuth from "../../hooks/useAuth.js";
import axiosPrivate from '../../config/privateApi';
import showAlertPopup from '../../components/AlertComp';
import OverlaySpinnerHOC from '../../HOC/OverlaySpinnerHOC';

const OverlaySpinner = OverlaySpinnerHOC(View);
const initialEditProfileFormValues = {
    companyName: "Demo Company",
    email: ""
};

const initialEditProfileErrors = {
    companyName: "",
    email: "",
};

const initialChangePasswordFormValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
};

const initialChangePasswordErrors = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
};

const ViewProfile = () => {

    const auth = useAuth();
    const [fetchProfile, setFetchProfile] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [updatePasswordModalVisible, setUpdatePasswordModalVisible] = useState(false);
    const [addStoreVideoModalVisible, setAddStoreVideoModalVisible] = useState(false);

    const [editProfileFormValues, setEditProfileFormValues] = useState(initialEditProfileFormValues);
    const [editProfileFormErrors, setEditProfileFormErrors] = useState(initialEditProfileErrors);

    const [changePasswordFormValues, setChangePasswordFormValues] = useState(initialChangePasswordFormValues);
    const [changePasswordFormErrors, setChangePasswordFormErrors] = useState(initialChangePasswordErrors);

    useEffect(() => {
        console.log("Profile component mounted");
        
        //Function to fetch profile information
        const getProfile = async () => {
            console.log("Fetching profile information");
            try {
                setIsLoading(true);
                const response = await axiosPrivate.post("/store/get-profile", {
                    email: 'spatel1@katalysttech.com',
                });
                if(response.data?.success === true) {
                    setEditProfileFormValues({
                        ...editProfileFormValues,
                        email: response.data?.data?.email,
                        companyName: response.data?.data?.company_name
                    });
                    setIsLoading(false);
                    setRefreshing(false);
                }
            } catch(error) {
                setIsLoading(false);
                setRefreshing(false);
            }
        };

        //Calling functions
        getProfile();

        //Cleanup function
        return () => {
            console.log("Profile component unmounted");
        }
    },[fetchProfile]);

    //Function to show change password modal
    const showUpdatePasswordModal = () => {
        setUpdatePasswordModalVisible(true);
    };

    //Function to hide change password modal
    const hideUpdatePasswordModal = () => {
        setUpdatePasswordModalVisible(false);
        setChangePasswordFormErrors(initialChangePasswordErrors);
    };

    //Function to show add store video modal
    const showAddStoreVideoModal = () => {
        setAddStoreVideoModalVisible(true);
    };

    //Function to hide add store video modal
    const hideAddStoreVideoModal = () => {
        setAddStoreVideoModalVisible(false);
    };

    //Function to render change password modal
    const renderUpdatePasswordModal = () => {
        return(
            <PopupModal
                show={updatePasswordModalVisible}
                closeAction={hideUpdatePasswordModal}
                submitAction={handelChangePassword}
                title="Change Password"
                subTitle="Create your new password"
                primaryButtonText="Submit"
                dangerButtonText="Cancel"
            >
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
        )
    };

    //Function to render add store video modal
    const renderAddStoreVideoModal = () => {
        return(
            <PopupModal
                show={addStoreVideoModalVisible}
                closeAction={hideAddStoreVideoModal}
                title="Add Store Video"
                subTitle="Add store video and title for same video"
                primaryButtonText="Upload"
                dangerButtonText="Preview Video"
            >
                <IconInputWithoutLabel placeholder="Video Title Here" name="videoTitle" showIcon={false} icon={images.tick} error={false} errorMessage="Please enter video title." />
            </PopupModal>
        )
    };

    //Function to handel profile refresh
    const onRefresh = () => {
        setRefreshing(true);
        setFetchProfile(!fetchProfile);
    };

    //Function to handel old password
    const handelOldPassword = (e) => {
        setChangePasswordFormValues({...changePasswordFormValues, oldPassword: e.replace(/\s/g, '')});
        setChangePasswordFormErrors({...changePasswordFormErrors, oldPassword: ""});
    };

    //Function to handel new password
    const handelNewPassword = (e) => {
        setChangePasswordFormValues({...changePasswordFormValues, newPassword: e.replace(/\s/g, '')});
        setChangePasswordFormErrors({...changePasswordFormErrors, newPassword: ""});
    };

    //Function to handel confirm password
    const handelConfirmPassword = (e) => {
        setChangePasswordFormValues({...changePasswordFormValues, confirmPassword: e.replace(/\s/g, '')});
        setChangePasswordFormErrors({...changePasswordFormErrors, confirmPassword: ""});
    };

    //Function to validate change password form
    const validateChangePasswordForm = (values) => {
        let errors = {};
        if(!values.oldPassword){
            errors.oldPassword = 'Please enter old password.';
        }
        if(!values.newPassword){
            errors.newPassword = 'Please enter new password.';
        }
        if(!values.confirmPassword){
            errors.confirmPassword = 'Please confirm password.';
        }
        return errors;
    };

    //Funcion to update password
    const handelChangePassword = async () => {
        try {
            let validateResponse = validateChangePasswordForm(changePasswordFormValues);
            if(Object.keys(validateResponse).length > 0) {
                setChangePasswordFormErrors(validateResponse);
            }
            else {
                setIsLoading(true);
                const response = await axiosPrivate.post("/store/update-password", {
                    email: 'spatel1@katalysttech.com',
                    old_password: changePasswordFormValues.oldPassword,
                    new_password: changePasswordFormValues.newPassword,
                });
                if(response.data.success === true) {
                    setIsLoading(false);
                    hideUpdatePasswordModal();
                    showAlertPopup("Success", response.data?.message, "Ok");
                } else {
                    setIsLoading(false);
                    showAlertPopup("Opps", response.data?.message, "Cancel");
                }
            }
        } catch(error) {
            setIsLoading(false);
        }
    };

    return(
        
        <SafeAreaView style={styles.safeAreaViewStyle}>
            <OverlaySpinner isLoading={isLoading} style={styles.safeAreaViewStyle}>
                {renderUpdatePasswordModal()}
                {renderAddStoreVideoModal()}
                <View style={styles.topSectionWrapper}>
                    <View style={styles.profilePictureWrapper}>
                        <Image style={styles.profileImage} source={images.user1} />
                        <TouchableOpacity style={styles.cameraButton}>
                            <Image style={styles.cameraImage} source={images.camera} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottomSectionWrapper}>
                    <ScrollView 
                        contentContainerStyle={{ flexGrow: 1 }} 
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        <View style={styles.formSectionWrapper}>
                            <View>
                                <IconInput 
                                    label="Company Name" 
                                    placeholder="User Company Name" 
                                    name="companyName" 
                                    value={editProfileFormValues.companyName}
                                    icon={images.tick} 
                                    isSecure={false} 
                                    error={editProfileFormErrors.companyName}
                                />
                                <IconInput 
                                    label="Email ID" 
                                    placeholder="usermailid@gmail.com" 
                                    name="email" 
                                    value={editProfileFormValues.email}
                                    icon={images.tick} 
                                    isSecure={false} 
                                    error={editProfileFormErrors.email}
                                />
                                <TouchableOpacity style={styles.updatePasswordlabelWrapper} onPress={showUpdatePasswordModal}>
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
            </OverlaySpinner>
        </SafeAreaView>
        
    )
}

export default ViewProfile;