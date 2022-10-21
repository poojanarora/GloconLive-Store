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
  topSectionWrapper: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSectionWrapper: {
    flex: 1.5,
    backgroundColor: COLORS.primaryBackgroungColor,
  },
  profilePictureWrapper: {
    height: moderateScale(180),
    width: moderateScale(180),
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    height: moderateScale(170),
    width: moderateScale(170),
    borderRadius: moderateScale(5),
    resizeMode: 'contain',
  },
  cameraButton: {
    height: moderateScale(35),
    width: moderateScale(35),
    borderRadius: moderateScale(35 / 2),
    backgroundColor: COLORS.secondaryColor,
    position: 'absolute',
    bottom: moderateVerticalScale(15),
    right: moderateScale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraImage: {
    height: moderateScale(20),
    width: moderateScale(20),
    resizeMode: 'contain',
  },
  formSectionWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(15),
    //backgroundColor: 'brown'
  },
  buttonSectionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: moderateVerticalScale(10),
    //backgroundColor: 'yellow'
  },
  updatePasswordlabelWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateVerticalScale(35),
    //backgroundColor: 'pink'
  },
  updatePasswordlabel: {
    fontSize: scale(12),
    fontWeight: '500',
    color: COLORS.highLightColor,
    textDecorationLine: 'underline',
  },
});

export default styles;
