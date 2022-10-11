import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import { scale, moderateScale } from 'react-native-size-matters';
import styles from './viewProfileStyles';
import { COLORS, images } from '../../constant';
import IconInput from '../../components/IconInput';
import ButtonComp from '../../components/ButtonComp';
import PopupModal from '../../components/PopupModal';
import IconInputWithoutLabel from '../../components/IconInputWithoutLabel';

const ViewProfile = () => {

    const [updatePasswordModalVisible, setUpdatePasswordModalVisible] = useState(false);
    const [addStoreVideoModalVisible, setAddStoreVideoModalVisible] = useState(false);

    const showUpdatePasswordModal = () => {
        setUpdatePasswordModalVisible(true);
    };

    const hideUpdatePasswordModal = () => {
        setUpdatePasswordModalVisible(false);
    };

    const showAddStoreVideoModal = () => {
        setAddStoreVideoModalVisible(true);
    };

    const hideAddStoreVideoModal = () => {
        setAddStoreVideoModalVisible(false);
    };

    const renderUpdatePasswordModal = () => {
        return(
            <PopupModal
                show={updatePasswordModalVisible}
                closeAction={hideUpdatePasswordModal}
                title="Change Password"
                subTitle="Create your new password"
                primaryButtonText="Submit"
                dangerButtonText="Cancel"
            >
                <IconInputWithoutLabel placeholder="Old Password" name="oldPassword" showIcon={false} icon={images.tick} error={false} errorMessage="Please enter old password." />
                <IconInputWithoutLabel placeholder="New Password" name="newPassword" showIcon={false} icon={images.tick} error={false} errorMessage="Please enter new password." />
                <IconInputWithoutLabel placeholder="Confirm New Password" name="confirmNewPassword" showIcon={false} icon={images.tick} error={false} errorMessage="Please confirm new password." />
            </PopupModal>
        )
    };

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

    return(
        <SafeAreaView style={styles.safeAreaViewStyle}>
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
                <View style={styles.formSectionWrapper}>
                    <View>
                        <IconInput label="Company Name" placeholder="User Company Name" name="email" icon={images.tick} isSecure={false} error={false} errorMessage="Please enter email" />
                        <IconInput label="Email ID" placeholder="usermailid@gmail.com" name="email" icon={images.tick} isSecure={false} error={false} errorMessage="Please enter email" />
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
                                width: moderateScale(160),
                                shadowColor: COLORS.secondaryColor,
                            }}
                            btnTextStyle={{
                                fontSize: scale(14),
                                color: COLORS.black,
                            }}
                        />

                        <ButtonComp 
                            btnText="SAVE" 
                            btnStyle={{
                                width: moderateScale(100),
                            }}
                            btnTextStyle={{
                                fontSize: scale(14),
                            }}
                        />
                    </View>
                </View>
                
            </View>
        </SafeAreaView>
    )
}

export default ViewProfile;