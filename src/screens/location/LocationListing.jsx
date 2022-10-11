import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import styles from './locationListingStyles';
import { images } from '../../constant';
import ButtonComp from '../../components/ButtonComp';
import IconInputWithoutLabel from '../../components/IconInputWithoutLabel';
import PopupModal from '../../components/PopupModal';

const LocationListing = ({ navigation }) => {

    const locations = [
        {'id': 1, 'address': 'Los Angeles, CA'},
        {'id': 2, 'address': 'Raleigh, NC' },
        {'id': 3, 'address': 'Seattle, WA'},
        {'id': 4, 'address': 'Kondwa, IN'},
        {'id': 5, 'address': 'Nanapeth, PU'},
        {'id': 6, 'address': 'Los Angeles, CA'},
        {'id': 7, 'address': 'Raleigh, NC' },
        {'id': 8, 'address': 'Seattle, WA'},
        {'id': 9, 'address': 'Kondwa, IN'},
        {'id': 10, 'address': 'Nanapeth, PU'},
        {'id': 11, 'address': 'Kondwa, IN'},
        {'id': 12, 'address': 'Nanapeth, PU'},
    ];
    const [selectedLocation, setSelectedLocation] = useState(locations[0]);
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    const handelSelectLocation = (selectedLocation) => {
        setSelectedLocation(selectedLocation);
        navigation.navigate('LocationDetails');
    };

    const renderLocationListing = () => {
        return(
            locations.map((item, key) => {
                return(
                    <TouchableOpacity key={item.id} style={[styles.listItemWrapper, styles.shadow, (selectedLocation.id === item.id) && styles.listItemSelected]} onPress={() => handelSelectLocation(item)}>
                        <Image style={styles.listItemImage} source={images.location_pin_2} />
                        <Text style={[styles.listItemTitle, (selectedLocation.id === item.id) && styles.selectedText]}>{item.address}</Text>
                        <Text style={[styles.listItemSubTitle, (selectedLocation.id === item.id) && styles.selectedText]}>Select Any One</Text>
                    </TouchableOpacity>
                )
            })
        )
    };

    const renderAddLocationModal = () => {
        return(
            <PopupModal
                show={modalVisible}
                closeAction={hideModal}
                title="Add Location"
                subTitle="Please add new locations."
                primaryButtonText="Add"
                dangerButtonText="Cancel"
            >
                <IconInputWithoutLabel placeholder="New Location Name here" name="newLocation" showIcon={true} icon={images.tick} error={false} errorMessage="Please enter new location name." />
            </PopupModal>
        )
    };

    return(
        <SafeAreaView style={styles.safeAreaViewStyle}>
            <View style={styles.body}>
                {renderAddLocationModal()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.listSectionWrapper}>
                        {renderLocationListing()}
                    </View>
                </ScrollView>
                <View style={styles.buttonSectionWrapper}>
                    <ButtonComp btnText="Add Location" action={showModal} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LocationListing;