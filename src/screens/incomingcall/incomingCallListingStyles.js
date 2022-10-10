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
    listSectionWrapper: {
        flex: 1,
        //backgroundColor: 'red',
        marginVertical: hp('4%'),
        marginHorizontal: wp('6%')
    },
    listItemWrapper: {
        height: hp('10%'),
        borderRadius: wp('1%'),
        elevation: 5,
        shadowColor: COLORS.primaryBackgroungDarkColor,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.10,
        shadowRadius: wp('1%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp('4%'),
        marginBottom: hp('1%'),
        backgroundColor: COLORS.white
    },
    listItemLeftSectionWrapper:{

    },
    listItemRightectionWrapper: {

    },
    listItemTitle: {
        fontSize: wp('5%'),
        fontWeight: '800',
        color: COLORS.black
    },
    listItemSubTitle: {
        fontSize: wp('3.5%'),
        fontWeight: '500',
        marginTop: hp('0.50%'),
        color: COLORS.secondaryTextColor
    },
    listItemActionButton: {
        height: hp('5%'),
        width: wp('10%'),
        borderRadius: wp('5%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: wp('1%'),
        borderColor: COLORS.primaryBackgroungDarkColor,
    },
    listItemActionButtonImage:{
        width: wp('8%'),
        resizeMode: 'contain',
    }
});

export default styles;