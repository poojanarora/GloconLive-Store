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
    body:{
        flex: 1,
        justifyContent: 'space-between'
    },
    listSectionWrapper: {
        //backgroundColor: 'orange',
        marginVertical: hp('4%'),
        marginHorizontal: wp('6%'),
        height: hp('75%')
    },
    //flatListColumnWrapper: {
        //flex: 1,
        //backgroundColor: 'red',
        //flexDirection: 'row',
        //justifyContent: 'space-evenly',
        //flexWrap: 'wrap',
    //},
    listItemWrapper: {
        height: hp('20%'),
        width: wp('40%'),
        marginVertical: hp('1%'),
        marginHorizontal: hp('1%'),
        borderRadius: wp('3%'),
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
        shadowRadius: wp('1%'),
    },
    listItemImage: {
        width: wp('10%'),
        height: hp('5%'),
        resizeMode: 'contain',
        marginBottom: hp('2%')
    },
    listItemTitle: {
        fontSize: wp('4%'),
        fontWeight: '800',
        color: COLORS.black,
        marginBottom: hp('0.50%')
    },
    listItemSubTitle: {
        fontSize: wp('3.5%'),
        fontWeight: '500',
        color: COLORS.secondaryTextColor
    },
    buttonSectionWrapper: {
        //backgroundColor: 'green',
        //paddingBottom: hp('4%'),
        height: hp('10%'),
        alignItems: 'center'
    }
});

export default styles;