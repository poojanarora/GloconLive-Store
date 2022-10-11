import {
    StyleSheet
} from 'react-native';
import { scale } from 'react-native-size-matters';
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
        fontSize: scale(35),
        fontWeight: '500',
        color: COLORS.white
    }
});

export default styles;