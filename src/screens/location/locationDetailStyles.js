import {
    StyleSheet,
} from 'react-native';
import { scale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { COLORS } from '../../constant'

const styles = StyleSheet.create({
    safeAreaViewStyle:{
        flex: 1,
        backgroundColor:COLORS.primaryBackgroungColor,
        //backgroundColor: 'blue',
    },
    headerSectionWrapper: {
        alignItems: 'center',
        paddingTop: moderateVerticalScale(25),
        //backgroundColor: 'orange'
    },
    headerTitle: {
        fontSize: scale(18),
        fontWeight: '800',
        color: COLORS.black,
        marginBottom: moderateScale(5)
    },
    headerSubTitle: {
        fontSize: scale(12),
        fontWeight: '400',
        color: COLORS.black,
        marginBottom: moderateScale(20)
    },
    optionWrapper: {
        flexDirection: 'row',
        height: moderateScale(40),
        width: moderateScale(280),
        borderRadius: moderateScale(5),
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity:  0.22,
        shadowRadius: 9.22,
        elevation: 12,
        backgroundColor: COLORS.white,
        marginBottom: moderateScale(15),
    },
    option: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(5),
    },
    optionText: {
        fontSize: scale(14),
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