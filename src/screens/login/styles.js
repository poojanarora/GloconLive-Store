import {StyleSheet} from 'react-native';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import {COLORS} from '../../constant/index.js';

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.primaryBackgroungColor,
  },
  body: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'pink'
  },
  mainSectionWrapper: {
    height: moderateScale(350),
    marginHorizontal: moderateScale(10),
    //backgroundColor: 'green'
  },
  headerSectionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    //resizeMode: 'contain',
    height: moderateScale(65),
    width: moderateScale(280),
  },
  formSectionWrapper: {
    marginVertical: moderateVerticalScale(5),
  },
  signUpLabelWrapper: {
    marginTop: moderateVerticalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpLabel: {
    color: COLORS.secondaryTextColor,
    fontSize: scale(12),
  },
  labelPrimary: {
    color: COLORS.primaryTextColor,
    fontSize: scale(12),
    fontWeight: '700',
  },
  buttonSectionWrapper: {
    marginTop: moderateVerticalScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInAsDeviceWrapper: {
    marginTop: moderateVerticalScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
