import {
    StyleSheet,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { COLORS } from '../../constant';

const styles = StyleSheet.create({
    safeAreaViewStyle:{
        flex: 1,
        backgroundColor:COLORS.primaryBackgroungColor,
        //backgroundColor: 'blue',
    },
    topSectionWrapper: {
        flex: 1,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomSectionWrapper: {
        flex: 1.5,
        backgroundColor: COLORS.primaryBackgroungColor,
    },
    profilePictureWrapper: {
        height: hp('26%'),
        width: wp('53%'),
        borderRadius: wp('3%'),
        backgroundColor: COLORS.secondaryColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileImage: {
        height: hp('24%'),
        width: wp('49%'),
        resizeMode: 'contain',
        borderRadius: wp('1%')
    },
    cameraButton: {
        height: hp('5%'),
        width: wp('10%'),
        backgroundColor: COLORS.secondaryColor,
        position: 'absolute',
        borderRadius: wp('6%'),
        bottom: hp('2.5%'),
        right: wp('5%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    cameraImage: {
        height: hp('3%'),
        width: wp('6%'),
        resizeMode: 'contain',
    },
    formSectionWrapper: {
        flex: 1,
        justifyContent: 'space-between',
        marginHorizontal: wp('3%'),
    },
    buttonSectionWrapper:{
        height: hp('10%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: wp('2%')
        //backgroundColor: 'yellow'
    },
    updatePasswordlabelWrapper: {
        height: hp('5%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('2%')
    },
    updatePasswordlabel:{
        fontSize: wp('4%'),
        fontWeight: '500',
        color: COLORS.highLightColor,
        textDecorationLine: 'underline'
    }
});

export default styles;