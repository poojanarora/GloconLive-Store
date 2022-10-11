import {
    StyleSheet
} from 'react-native';
import { scale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { COLORS } from '../../constant';

const styles = StyleSheet.create({
    body:{
        flex: 1,
        justifyContent: 'space-between'
    },
    listSectionWrapper:{
        //backgroundColor: 'yellow',
        marginHorizontal: moderateScale(15),
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    flatListColumnWrapper:{
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    listItemWrapper: {
        // height: hp('18%'),
        // width: wp('42%'),
        height: moderateScale(100),
        width: moderateScale(125),
        //marginVertical: hp('1%'),
        //marginHorizontal: hp('1%'),
        //borderRadius: wp('2%'),
        marginVertical: moderateVerticalScale(4),
        marginHorizontal: moderateScale(5),
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white    
    },
    listItemSelected: {
        backgroundColor: COLORS.primary,
    },
    selectedText: {
        color: COLORS.white,
    },
    shadow: {
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.10,
    },
    listItemImage: {
        height: moderateScale(40),
        width: moderateScale(40),
        resizeMode: 'contain',
        marginBottom: moderateVerticalScale(4)
    },
    listItemTitle: {
        fontSize: scale(12),
        fontWeight: '800',
        color: COLORS.black,
        marginBottom: moderateVerticalScale(2)
    },
    listItemSubTitle: {
        fontSize: scale(10),
        fontWeight: '500',
        color: COLORS.secondaryTextColor
    },
    buttonSectionWrapper: {
        //backgroundColor: 'green',
        marginVertical: moderateVerticalScale(10),
        alignItems: 'center'
    }
});

export default styles;