import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal
} from 'react-native';
import { scale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { COLORS, images } from '../constant';
import ButtonComp from './ButtonComp';

const PopupModal = (props) => {
    return(
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
                            <ButtonComp 
                                btnStyle={{
                                    width: moderateScale(100),
                                    backgroundColor: COLORS.dangerButtonColor,
                                    shadowColor: COLORS.dangerButtonColor,
                                }}
                                btnTextStyle={{
                                    fontSize: scale(14),
                                }}
                                btnText={props.dangerButtonText}
                                action={props.closeAction}
                            />
                            <ButtonComp 
                                btnStyle={{
                                    width: moderateScale(100),
                                }}
                                btnTextStyle={{
                                    fontSize: scale(14),
                                }}
                                btnText={props.primaryButtonText}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
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
        paddingBottom: moderateVerticalScale(15),
        width: moderateScale(300),
        borderRadius:moderateScale(10),
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
        marginTop: moderateVerticalScale(15),
        alignItems: 'center'
    },
    modalTitle: {
        fontSize: scale(18),
        color: COLORS.black,
        fontWeight: '400'
    },
    modalSubTitle: {
        fontSize: scale(12),
        fontWeight: '500',
        color: COLORS.secondaryTextColor,
        marginTop: moderateVerticalScale(6)
    },
    modalBodyWrapper: {
        marginTop: moderateVerticalScale(6)
    },
    modalFooterWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: moderateScale(15),
        marginTop: moderateVerticalScale(25)
    },
    modalCloseButtonWrapper: {
        height: moderateScale(40),
        width: moderateScale(40),
        position: 'absolute',
        right: moderateScale(2),
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'red'
    },
    modalCloseImage: {
        width:moderateScale(25),
        height: moderateScale(25),
        resizeMode: 'contain',
    }
});

export default PopupModal;