import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';
import styles from './locationListingStyles';
import { images } from '../../constant';
import PrimaryButton from '../../components/PrimaryButton';
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

    const Item = ({ item }) => {
        return(
            <TouchableOpacity style={[styles.listItemWrapper, styles.shadow, (selectedLocation.id === item.id) && styles.listItemSelected]} onPress={() => handelSelectLocation(item)}>
                <Image style={styles.listItemImage} source={images.location_pin_2} />
                <Text style={[styles.listItemTitle, (selectedLocation.id === item.id) && styles.selectedText]}>{item.address}</Text>
                <Text style={[styles.listItemSubTitle, (selectedLocation.id === item.id) && styles.selectedText]}>Select Any One</Text>
            </TouchableOpacity>
        );
    };

    const renderItem = ({ item }) => {
        return(
            <Item item={item} />
        );
    };

    const renderLocationListing = () => {
        return(
            <FlatList
                data={locations}
                //onRefresh={() => fetchRecipients()}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                numColumns={2} // set number of columns 
                //columnWrapperStyle={styles.flatListColumnWrapper}
                //refreshing={isRecipientListingLoading}
                // ItemSeparatorComponent={(props) => {
                //     return (
                //         <View style={{ marginHorizontal: wp('1%'), height: hp('0.10%'), backgroundColor: COLORS.imageBorderSecondary}} />
                //     );
                // }}
                //ListEmptyComponent={<FlatlistNoRecordFound />}
            />
            
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
            >
                <IconInputWithoutLabel placeholder="New Location Name here" name="newLocation" showIcon={true} icon={images.tick} error={false} errorMessage="Please enter new location name." />
            </PopupModal>
        )
    };

    return(
        <SafeAreaView style={styles.safeAreaViewStyle}>
            <View style={styles.body}>
                {renderAddLocationModal()}
                <View style={styles.listSectionWrapper}>
                    {renderLocationListing()}
                </View>
                <View style={styles.buttonSectionWrapper}>
                    <PrimaryButton text="Add Location" action={showModal} />
                </View>
            </View>
        </SafeAreaView>
    )
}



export default LocationListing;