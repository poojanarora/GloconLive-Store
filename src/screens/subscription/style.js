import { Dimensions, StyleSheet } from 'react-native';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import { COLORS } from '../../constant';
const windowWidth = Dimensions.get('window').width;
const windowHight = Dimensions.get('window').height;
const imageWidth = (windowWidth * 80) / 100;
const imageHeight = (windowHight * 20) / 100;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    marginTop: moderateScale(30),
    marginHorizontal: moderateScale(30)

  },
  buttonContainer: {
    marginTop: moderateScale(30),
    marginHorizontal: moderateScale(20)
  },
  image: {
    width: imageWidth,
    height: imageHeight,
    resizeMode: 'contain',
    borderRadius: 20,
    borderColor: COLORS.black,
    borderWidth: 1,
  },
  imageContainer: {
    // marginTop: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    textAlign: 'center',
    color: COLORS.black,
    fontSize: scale(25),
    fontWeight: 'bold',
  },
  textContainer: {
    marginTop: moderateScale(30),
    padding: moderateScale(30)
  },
  inputSectionWrapper: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    marginTop: moderateVerticalScale(25),
    borderRadius: moderateScale(5),
    elevation: 5,
  },
  selectedInputSectionWrapper: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    marginTop: moderateVerticalScale(25),
    borderRadius: moderateScale(5),
    elevation: 5,
  },
  inputLeftSectionWrapper: {
    flex: 1,
    marginHorizontal: moderateScale(20),
    flexDirection: 'row',
  },
  inputWrapper: {
    paddingLeft: moderateScale(10),
  },
  inputLabel1: {
    marginHorizontal: moderateScale(30),
    marginTop: moderateVerticalScale(10),
    fontSize: scale(18),
    fontWeight: '800',
    color: COLORS.black,
  },
  selectedInputLabel: {
    marginHorizontal: moderateScale(10),
    marginTop: moderateVerticalScale(10),
    fontSize: scale(18),
    fontWeight: '800',
    color: COLORS.white,
  },
  inputLabel2: {
    marginHorizontal: moderateScale(30),
    margin: moderateVerticalScale(5),
    fontSize: scale(15),
    color: COLORS.secondaryTextColor,
  },
  selectedInputLabel2: {
    marginHorizontal: moderateScale(10),
    margin: moderateVerticalScale(5),
    fontSize: scale(15),
    color: COLORS.white,
  },
  inputImageSectionWrapper: {
    display: 'none',
  },
  selectedInputImageSectionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    height: moderateScale(20),
    width: moderateScale(20),

  }
});

export default styles;
