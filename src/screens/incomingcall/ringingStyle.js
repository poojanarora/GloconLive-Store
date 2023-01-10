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
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: moderateVerticalScale(20),
  },
  callerDetailSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateVerticalScale(100),
  },
  callerImageStyle: {
    height: moderateScale(150),
    width: moderateScale(150),
    resizeMode: 'contain',
    borderRadius: scale(150 / 2),
    marginBottom: moderateVerticalScale(20),
  },
  callerNameStyle: {
    fontSize: scale(20),
    color: COLORS.black,
    fontWeight: '500',
    marginBottom: moderateVerticalScale(10),
  },
  incommingLabelStyle: {
    fontSize: scale(14),
    color: COLORS.black,
    fontWeight: '400',
  },
  callDurationSection: {
    marginTop: moderateVerticalScale(60),
    alignItems: 'center',
  },
  callerDurationStyle: {
    fontSize: scale(16),
    color: COLORS.black,
    fontWeight: '300',
  },
  callActionSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateVerticalScale(80),
    marginHorizontal: moderateScale(35),
  },
  callActionButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  callActionButtonText: {
    marginTop: moderateVerticalScale(35),
    color: COLORS.black,
  },
});

export default styles;
