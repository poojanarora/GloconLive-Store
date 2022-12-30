import {StyleSheet} from 'react-native';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import {COLORS} from '../../constant';

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: COLORS.primaryBackgroungColor,
    //backgroundColor: 'blue',
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default styles;
