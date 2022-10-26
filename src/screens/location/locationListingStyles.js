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
  listSectionWrapper: {
    //backgroundColor: 'orange',
    marginVertical: moderateVerticalScale(20),
    marginHorizontal: moderateScale(15),
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  //flatListColumnWrapper: {
  //flex: 1,
  //backgroundColor: 'red',
  //flexDirection: 'row',
  //justifyContent: 'space-evenly',
  //flexWrap: 'wrap',
  //},
  listItemWrapper: {
    height: moderateScale(125),
    width: moderateScale(150),
    marginVertical: moderateVerticalScale(6),
    marginHorizontal: moderateScale(6),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  listItemSelected: {
    backgroundColor: COLORS.primary,
  },
  editIconWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    height: moderateScale(30),
    width: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: moderateScale(10),
  },
  editIconStyle: {
    height: moderateScale(18),
    width: moderateScale(18),
    resizeMode: 'contain',
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
    shadowOpacity: 0.1,
  },
  listItemImage: {
    height: moderateScale(30),
    width: moderateScale(30),
    resizeMode: 'contain',
    marginBottom: moderateVerticalScale(5),
  },
  listItemTitle: {
    fontSize: scale(10),
    fontWeight: '800',
    color: COLORS.black,
    marginBottom: moderateVerticalScale(4),
  },
  listItemSubTitle: {
    fontSize: scale(8),
    fontWeight: '500',
    color: COLORS.secondaryTextColor,
  },
  buttonSectionWrapper: {
    //backgroundColor: 'green',
    marginVertical: moderateVerticalScale(10),
    alignItems: 'center',
  },
});

export default styles;
