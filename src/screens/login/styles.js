import {
    StyleSheet
} from 'react-native';
import { scale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { COLORS } from "../../constant/index.js";

const styles = StyleSheet.create({
    safeAreaViewStyle:{
        display: 'flex',
        flex: 1,
        backgroundColor:COLORS.primaryBackgroungColor
    },
    body:{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'pink'
    },
    mainSectionWrapper: {
        height: moderateScale(350),
        marginHorizontal: moderateScale(10),
        //backgroundColor: 'green'
    },
    headerSectionWrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoLabel: {
        fontSize: scale(35),
        fontWeight: '500',
        color: COLORS.primaryTextColor
    },
    formSectionWrapper: {
        marginVertical: moderateVerticalScale(5),
    },
    signUpLabelWrapper:{
        marginTop: moderateVerticalScale(30),
        justifyContent: 'center',
        alignItems: 'center'
    },
    signUpLabel: {
        color: COLORS.secondaryTextColor,
        fontSize: scale(15)
    },
    labelPrimary: {
        color: COLORS.primaryTextColor,
        fontSize: scale(15),
        fontWeight: '700'
    },
    buttonSectionWrapper:{
        marginTop: moderateVerticalScale(20),
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;