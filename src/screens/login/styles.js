import {
    StyleSheet
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { COLORS } from "../../constant/index.js";

const styles = StyleSheet.create({
    safeAreaViewStyle:{
        display: 'flex',
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor:COLORS.primaryBackgroungColor
    },
    body:{
        height: hp('100%'),
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'pink'
    },
    mainSectionWrapper: {
        height: hp('65%'),
        width: wp('90%'),
        //backgroundColor: 'green'
    },
    headerSectionWrapper: {
        //backgroundColor: 'orange',
        height: hp('10%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoLabel: {
        fontSize: wp('10%'),
        fontWeight: '500',
        color: COLORS.primaryTextColor
    },
    formSectionWrapper: {
        marginVertical: hp('3%'),
        //alignItems: 'center',
    },
    signUpLabelWrapper:{
        marginTop: hp('4%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    signUpLabel: {
        color: COLORS.secondaryTextColor,
        fontSize: wp('4.5%')
    },
    labelPrimary: {
        color: COLORS.primaryTextColor,
        fontSize: wp('5%'),
        fontWeight: '700'
    },
    buttonSectionWrapper:{
        marginTop: hp('4%'),
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;