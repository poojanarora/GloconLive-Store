import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { COLORS, images } from '../constant';
import PrimaryButton from './PrimaryButton';
import DangerButton from './DangerButton';

const PopupModal = (props) => {
    return(
        // <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={props.show}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalContentWrapper}>
                            <TouchableOpacity style={styles.modalCloseButtonWrapper} onPress={props.closeAction}>
                                <Image style={styles.modalCloseImage} source={images.close} />
                            </TouchableOpacity>
                            <View style={styles.modalHeaderWrapper}>
                                <Text style={styles.modalTitle}>{props.title}</Text>
                                <Text style={styles.modalSubTitle}>{props.subTitle}</Text>
                            </View>
                            <View style={styles.modalBodyWrapper}>
                                {props.children}
                            </View>
                            <View style={styles.modalFooterWrapper}>
                                <DangerButton text={props.dangerButtonText} height="6%" width="35%" action={props.closeAction} />
                                <PrimaryButton text={props.primaryButtonText} height="6%" width="25%" />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        // </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.modalBackgroundColor,
    },
    modalView: {
        backgroundColor: "white",
        paddingBottom: hp('4%'),
        //height: hp('40%'),
        width: wp('85%'),
        borderRadius: wp('3%'),
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalContentWrapper:{},
    modalHeaderWrapper: {
        marginTop: hp('5%'),
        alignItems: 'center'
    },
    modalTitle: {
        fontSize: wp('5%'),
        color: COLORS.black,
        fontWeight: '400'
    },
    modalSubTitle: {
        fontSize: wp('3.5%'),
        fontWeight: '500',
        color: COLORS.secondaryTextColor,
        marginTop: hp('1%')
    },
    modalBodyWrapper: {
        marginTop: hp('1%'),
    },
    modalFooterWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wp('4%'),
        marginTop: wp('10%'),
    },
    modalCloseButtonWrapper: {
        height: hp('8%'),
        width: wp('16%'),
        position: 'absolute',
        right: wp('0%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCloseImage: {
        width: wp('8%'),
        height: hp('4%'),
        resizeMode: 'contain',
    }
});

export default PopupModal;