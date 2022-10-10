import {
    StyleSheet
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { COLORS } from '../../constant';

const styles = StyleSheet.create({
    safeAreaViewStyle:{
        flex: 1,
        backgroundColor: '#194053'
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoLabel: {
        fontSize: wp('10%'),
        fontWeight: '500',
        color: COLORS.white
    }
});

export default styles;