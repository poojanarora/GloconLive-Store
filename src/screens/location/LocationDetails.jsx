import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import styles from './locationDetailStyles';
import DepartmentListing from '../department/DepartmentListing';
import DeviceListing from '../device/DeviceListing';
const LocationDetails = () => {
    

    const [selectedOption, setSelectedOption] = useState("departments");

    const handelOptionChange = (option) => {
        setSelectedOption(option);
    }

    return(
        <SafeAreaView style={styles.safeAreaViewStyle}>
            <View style={styles.headerSectionWrapper}>
                <Text style={styles.headerTitle}>Seattle, WA</Text>
                <Text style={styles.headerSubTitle}>100 Address Ln. Seattle, WA 98101</Text>
                <View style={styles.optionWrapper}>
                    <TouchableOpacity style={[styles.option, (selectedOption === "departments") && styles.selectedOption]} onPress={() => handelOptionChange("departments")}>
                        <Text style={[styles.optionText, (selectedOption === "departments") && styles.selectedOptionText]}>Departments</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.option, (selectedOption === "devices") && styles.selectedOption]} onPress={() => handelOptionChange("devices")}>
                        <Text style={[styles.optionText, (selectedOption === "devices") && styles.selectedOptionText]}>Devices</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {
                (selectedOption === "departments") ? (
                        <DepartmentListing />
                    ) : (
                        <DeviceListing />
                    )
            }
        </SafeAreaView>
    )
}



export default LocationDetails;