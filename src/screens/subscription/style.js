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
  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: COLORS.primaryBackgroungColor,
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
  },
  image: {
    width: imageWidth,
    height: imageHeight,
    resizeMode: 'contain',
    borderRadius: 20,
    //borderColor: COLORS.black,
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
  bottomText: {
    textAlign: 'center',
    color: COLORS.black,
    fontSize: scale(25),
    fontWeight: 'bold',
    marginBottom: 10
  },
  textContainer: {
    marginTop: moderateVerticalScale(20),
  },
  contentWrapper: {
    //backgroundColor: 'red',
    marginVertical: moderateVerticalScale(15),
    marginHorizontal: moderateScale(20),
  },
  contentRowWrapper: {
    flexDirection: 'row',
    marginBottom: moderateVerticalScale(15),
  },
  contentLeftSectionWrapper: {
    paddingHorizontal: moderateScale(5),
    //backgroundColor: 'green',
  },
  contentRightSectionWrapper: {
    justifyContent: 'center',
    marginLeft: moderateScale(5),
    flex: 1,
  },
  contentText: {
    color: COLORS.black,
    fontSize: Platform.OS === 'android' ? scale(14) : scale(13),
    fontWeight: 'bold',
  },
  formSectionWrapper: {
    marginVertical: moderateVerticalScale(5),
  },
  totalAmountWrapper: {
    marginTop: moderateVerticalScale(15),
    alignItems: 'flex-end',
    marginRight: moderateScale(20),
  },
  totalAmountLabel: {
    fontSize: scale(15),
    fontWeight: '800',
    color: COLORS.black,
  },
  buttonSectionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonSectionNonWrapper:
  {
    //backgroundColor: 'green', 
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerWrapper: {
    marginHorizontal: 20,
    //backgroundColor: 'green',
    marginVertical: moderateVerticalScale(5),
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: scale(15),
    marginBottom: 10,
    fontWeight: '700',
    color: COLORS.black,
  }
});

export default styles;
