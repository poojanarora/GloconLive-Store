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
  listSectionWrapper: {
    flex: 1,
    //backgroundColor: 'red',
    marginVertical: moderateVerticalScale(20),
    marginHorizontal: moderateScale(18),
  },
  listItemWrapper: {
    height: moderateScale(75),
    borderRadius: moderateScale(5),
    elevation: 5,
    shadowColor: COLORS.primaryBackgroungDarkColor,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(12),
    marginBottom: moderateVerticalScale(8),
    backgroundColor: COLORS.white,
  },
  listItemLeftSectionWrapper: {},
  listItemRightectionWrapper: {},
  listItemTitle: {
    fontSize: scale(14),
    fontWeight: '800',
    color: COLORS.black,
  },
  listItemSubTitle: {
    fontSize: scale(10),
    fontWeight: '500',
    marginTop: moderateVerticalScale(5),
    color: COLORS.secondaryTextColor,
  },
  listItemActionButton: {
    height: moderateScale(35),
    width: moderateScale(35),
    borderRadius: moderateScale(35 / 2),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: moderateScale(2),
    borderColor: COLORS.primaryBackgroungDarkColor,
  },
  listItemActionButtonImage: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
  },
});

export default styles;
