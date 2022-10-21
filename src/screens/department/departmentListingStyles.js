import {StyleSheet} from 'react-native';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import {COLORS} from '../../constant';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'space-between',
  },
  listSectionWrapper: {
    //backgroundColor: 'yellow',
    marginHorizontal: moderateScale(15),
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  flatListColumnWrapper: {
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
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
    height: moderateScale(40),
    width: moderateScale(40),
    resizeMode: 'contain',
    marginBottom: moderateVerticalScale(4),
  },
  listItemTitle: {
    fontSize: scale(10),
    fontWeight: '800',
    color: COLORS.black,
    marginBottom: moderateVerticalScale(2),
  },
  listItemSubTitle: {
    fontSize: scale(9),
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
