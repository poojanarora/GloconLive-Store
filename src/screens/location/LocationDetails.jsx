import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import styles from './locationDetailStyles';
import DepartmentListing from '../department/DepartmentListing';
import DeviceListing from '../device/DeviceListing';
const LocationDetails = ({route, navigation}) => {
  const {locationId, locationName, locationAddress} = route.params;
  const [selectedOption, setSelectedOption] = useState('departments');

  const handelOptionChange = option => {
    setSelectedOption(option);
  };

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <View style={styles.headerSectionWrapper}>
        <Text style={styles.headerTitle}>{locationName}</Text>
        <Text style={styles.headerSubTitle}>{locationAddress}</Text>
        <View style={styles.optionWrapper}>
          <TouchableOpacity
            style={[
              styles.option,
              selectedOption === 'departments' && styles.selectedOption,
            ]}
            onPress={() => handelOptionChange('departments')}>
            <Text
              style={[
                styles.optionText,
                selectedOption === 'departments' && styles.selectedOptionText,
              ]}>
              Departments
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.option,
              selectedOption === 'devices' && styles.selectedOption,
            ]}
            onPress={() => handelOptionChange('devices')}>
            <Text
              style={[
                styles.optionText,
                selectedOption === 'devices' && styles.selectedOptionText,
              ]}>
              Devices
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {selectedOption === 'departments' ? (
        <DepartmentListing locationId={locationId} />
      ) : (
        <DeviceListing locationId={locationId} navigation={navigation} />
      )}
    </SafeAreaView>
  );
};

export default LocationDetails;
