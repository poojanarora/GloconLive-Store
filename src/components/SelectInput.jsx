import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import {COLORS, images} from '../constant';

const SelectInput = props => {
  const [optionDropdownVisibility, setOptionDropdownVisibility] =
    useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});

  useEffect(() => {
    setOptions(props.data);
    setSelectedOption(props.value);
  }, [props.data, props.value]);

  //Function to toggle options dropdown
  const toggleOptionDropdown = () => {
    setOptionDropdownVisibility(!optionDropdownVisibility);
  };

  //Function to handel select click
  const handelSelectClick = () => {
    toggleOptionDropdown();
  };

  //Function to handel option click
  const handelOptionClick = item => {
    toggleOptionDropdown();
    props.onSelect(item);
  };

  return (
    <>
      <TouchableOpacity
        onPress={handelSelectClick}
        activeOpacity={0.8}
        style={[
          styles.inputSectionWrapper,
          props.error.length > 0 === true && styles.error,
        ]}>
        <View style={styles.inputLeftSectionWrapper}>
          <View style={styles.inputWrapper}>
            <Text style={styles.selectLabel}>
              {selectedOption.value ? selectedOption.value : props.selectLabel}
            </Text>
          </View>
        </View>
        <View style={styles.inputRightSectionWrapper}>
          <Image
            style={styles.iconImage}
            source={
              optionDropdownVisibility === true
                ? images.up_arrow
                : images.down_arrow
            }
          />
        </View>
      </TouchableOpacity>
      {optionDropdownVisibility === true && (
        <View style={styles.optionWrapper}>
          <ScrollView>
            {options.length > 0 ? (
              options.map((item, key) => {
                return (
                  <TouchableOpacity
                    key={key}
                    style={[
                      styles.option,
                      selectedOption.id === item.id && styles.optionSelected,
                    ]}
                    onPress={() => handelOptionClick(item)}>
                    <Text
                      style={[
                        styles.optionLabel,
                        selectedOption.id === item.id &&
                          styles.selectedOptionLabel,
                      ]}>
                      {item.value}
                    </Text>
                  </TouchableOpacity>
                );
              })
            ) : (
              <View style={styles.option}>
                <Text style={styles.optionLabel}>No Options Found.</Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}
      {props.error.length > 0 && (
        <View style={styles.errorMessageWrapper}>
          <Text style={styles.errorMessage}>{props.error}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  inputSectionWrapper: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    marginHorizontal: moderateScale(15),
    marginTop: moderateScale(20),
    borderRadius: moderateScale(5),
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  error: {
    borderWidth: 1,
    borderColor: 'red',
  },
  errorMessageWrapper: {
    //backgroundColor: 'yellow',
    marginHorizontal: moderateScale(15),
    marginTop: moderateVerticalScale(2),
  },
  errorMessage: {
    color: 'red',
    fontSize: scale(12),
  },
  inputLeftSectionWrapper: {
    flex: 5,
    justifyContent: 'center',
  },
  inputWrapper: {
    paddingLeft: moderateScale(12),
    paddingVertical: moderateVerticalScale(20),
    //backgroundColor: 'yellow',
  },
  selectLabel: {
    fontSize: scale(12),
    fontWeight: '500',
    color: COLORS.black,
  },
  input: {
    paddingVertical: moderateVerticalScale(20),
    fontSize: scale(12),
    fontWeight: '500',
    color: COLORS.black,
    //backgroundColor: 'orange',
  },
  inputRightSectionWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'blue'
  },
  iconImage: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
  },
  optionWrapper: {
    marginHorizontal: moderateScale(15),
    position: 'absolute',
    top: 165,
    //bottom: -55,
    left: 0,
    right: 0,
    maxHeight: moderateScale(100),
    backgroundColor: COLORS.white,
    zIndex: 1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
    //borderWidth: 1,
  },
  option: {
    //backgroundColor: 'green',
    paddingVertical: moderateVerticalScale(8),
    paddingHorizontal: moderateScale(10),
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  optionLabel: {
    color: COLORS.black,
    fontWeight: '400',
  },
  optionSelected: {
    backgroundColor: COLORS.primary,
  },
  selectedOptionLabel: {
    color: COLORS.white,
  },
});

export default SelectInput;
