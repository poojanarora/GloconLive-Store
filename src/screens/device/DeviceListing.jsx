import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';
import styles from './deviceListingStyles';
import { images } from '../../constant';
import PrimaryButton from '../../components/PrimaryButton';
import PopupModal from '../../components/PopupModal';
import IconInputWithoutLabel from '../../components/IconInputWithoutLabel';

const DeviceListing = () => {

    const devices = [
        {'id': 1, 'title': 'iPad 1', 'sub_title': 'Suits'},
        {'id': 2, 'title': 'iPad 2', 'sub_title': 'Suits'},
        {'id': 3, 'title': 'iPad 3', 'sub_title': 'Shoes'},
        {'id': 4, 'title': 'iPad 4', 'sub_title': 'Shoes'},
        {'id': 5, 'title': 'iPhone Pro', 'sub_title': 'Hardware'},
        {'id': 6, 'title': 'iphone 13', 'sub_title': 'Mobile'},
        {'id': 7, 'title': 'iPhone 12', 'sub_title': 'Mobile'},
        {'id': 7, 'title': 'iPhone 11', 'sub_title': 'Mobile'},
    ];
    const [addDeviceModalVisible, setAddDeviceModalVisible] = useState(false);

    useEffect(() => {
        console.log("Device component mounted");
        return () => {
            console.log("Device component unmounted");
        }
    },[]);

    const showModal = () => {
        setAddDeviceModalVisible(true);
    };

    const hideModal = () => {
        setAddDeviceModalVisible(false);
    };


    const Item = ({ item }) => {
        return(
            <TouchableOpacity style={[styles.listItemWrapper, styles.shadow]}>
                <Image style={styles.listItemImage} source={images.ipad} />
                <Text style={[styles.listItemTitle]}>{item.title}</Text>
                <Text style={[styles.listItemSubTitle]}>{item.sub_title}</Text>
            </TouchableOpacity>
        );
    };

    const renderItem = ({ item }) => {
        return(
            <Item item={item} />
        );
    };

    const renderAddDeviceModal = () => {
        return(
            <PopupModal
                show={addDeviceModalVisible}
                closeAction={hideModal}
                title="Add Devices"
                subTitle="Please add new device."
                primaryButtonText="Add"
            >
                <IconInputWithoutLabel placeholder="New Department dropdown" name="newDevice" showIcon={true} icon={images.tick} error={false} errorMessage="Please select new device." />
                <IconInputWithoutLabel placeholder="Assign Department" name="newDepartment" showIcon={true} icon={images.tick} error={false} errorMessage="Please assign department." />
            </PopupModal>
        )
    };

    return(
        <View style={styles.body}>
            {renderAddDeviceModal()}
            <View style={styles.listSectionWrapper}>
                <FlatList
                    data={devices}
                    //onRefresh={() => fetchRecipients()}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    numColumns={4} // set number of columns 
                    columnWrapperStyle={styles.flatListColumnWrapper}
                    //refreshing={isRecipientListingLoading}
                    // ItemSeparatorComponent={(props) => {
                    //     return (
                    //         <View style={{ marginHorizontal: wp('1%'), height: hp('0.10%'), backgroundColor: COLORS.imageBorderSecondary}} />
                    //     );
                    // }}
                    //ListEmptyComponent={<FlatlistNoRecordFound />}
                />
            </View>
            <View style={styles.buttonSectionWrapper}>
                <PrimaryButton text="Add Devices" action={showModal}/>
            </View>
        </View>
    )
}




export default DeviceListing;