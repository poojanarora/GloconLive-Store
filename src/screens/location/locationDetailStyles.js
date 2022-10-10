import {
    StyleSheet,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { COLORS } from '../../constant'

const styles = StyleSheet.create({
    safeAreaViewStyle:{
        flex: 1,
        backgroundColor:COLORS.primaryBackgroungColor,
        //backgroundColor: 'blue',
    },
    headerSectionWrapper: {
        height: hp('22%'),
        alignItems: 'center',
        paddingTop: hp('4%'),
        //backgroundColor: 'orange'
    },
    headerTitle: {
        fontSize: wp('6%'),
        fontWeight: '700',
        color: COLORS.black,
        marginBottom: hp('1%')
    },
    headerSubTitle: {
        fontSize: wp('4%'),
        fontWeight: '400',
        color: COLORS.black,
        marginBottom: hp('3%')
    },
    optionWrapper: {
        flexDirection: 'row',
        height: hp('5%'),
        width: wp('65%'),
        borderRadius: wp('2%'),
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity:  0.22,
        shadowRadius: 9.22,
        elevation: 12,
        backgroundColor: COLORS.white
    },
    option: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp('2%'),
    },
    optionText: {
        fontSize: wp('4%'),
        color: COLORS.black
    },
    selectedOption: {
        backgroundColor: COLORS.primary
    },
    selectedOptionText: {
        color: COLORS.white
    },
});

export default styles;