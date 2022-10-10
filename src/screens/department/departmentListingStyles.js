import {
    StyleSheet,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { COLORS } from '../../constant';

const styles = StyleSheet.create({
    body:{
        flex: 1,
        justifyContent: 'space-between'
    },
    listSectionWrapper:{
        //backgroundColor: 'yellow',
        marginHorizontal: wp('2%'),
        flex: 1,
    },
    flatListColumnWrapper:{
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    listItemWrapper: {
        height: hp('18%'),
        width: wp('42%'),
        marginVertical: hp('1%'),
        marginHorizontal: hp('1%'),
        borderRadius: wp('2%'),
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
        width: wp('12%'),
        height: hp('6%'),
        resizeMode: 'contain',
        marginBottom: hp('1%')
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
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default styles;