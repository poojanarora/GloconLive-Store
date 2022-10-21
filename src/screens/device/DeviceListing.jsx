import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import styles from './deviceListingStyles';
import {images} from '../../constant';
import ButtonComp from '../../components/ButtonComp';
import PopupModal from '../../components/PopupModal';
import IconInputWithoutLabel from '../../components/IconInputWithoutLabel';

const DeviceListing = () => {
  const devices = [
    {id: 1, title: 'iPad 1', sub_title: 'Suits'},
    {id: 2, title: 'iPad 2', sub_title: 'Suits'},
    {id: 3, title: 'iPad 3', sub_title: 'Shoes'},
    {id: 4, title: 'iPad 4', sub_title: 'Shoes'},
    {id: 5, title: 'iPhone Pro', sub_title: 'Hardware'},
    {id: 6, title: 'iphone 13', sub_title: 'Mobile'},
    {id: 7, title: 'iPhone 12', sub_title: 'Mobile'},
    {id: 8, title: 'iPhone 11', sub_title: 'Mobile'},
    {id: 9, title: 'iphone 13', sub_title: 'Mobile'},
    {id: 10, title: 'iPhone 12', sub_title: 'Mobile'},
    {id: 11, title: 'iPhone 11', sub_title: 'Mobile'},
  ];
  const [addDeviceModalVisible, setAddDeviceModalVisible] = useState(false);

  useEffect(() => {
    console.log('Device component mounted');
    return () => {
      console.log('Device component unmounted');
    };
  }, []);

  const showModal = () => {
    setAddDeviceModalVisible(true);
  };

  const hideModal = () => {
    setAddDeviceModalVisible(false);
  };

  const renderDevicetListing = () => {
    return devices.map((item, key) => {
      return (
        <TouchableOpacity
          key={item.id}
          style={[styles.listItemWrapper, styles.shadow]}>
          <Image style={styles.listItemImage} source={images.ipad} />
          <Text style={[styles.listItemTitle]}>{item.title}</Text>
          <Text style={[styles.listItemSubTitle]}>{item.sub_title}</Text>
        </TouchableOpacity>
      );
    });
  };

  const renderAddDeviceModal = () => {
    return (
      <PopupModal
        show={addDeviceModalVisible}
        closeAction={hideModal}
        title="Add Devices"
        subTitle="Please add new device."
        primaryButtonText="Add"
        dangerButtonText="Cancel">
        <IconInputWithoutLabel
          placeholder="New Department dropdown"
          name="newDevice"
          showIcon={true}
          icon={images.tick}
          error={false}
          errorMessage="Please select new device."
        />
        <IconInputWithoutLabel
          placeholder="Assign Department"
          name="newDepartment"
          showIcon={true}
          icon={images.tick}
          error={false}
          errorMessage="Please assign department."
        />
      </PopupModal>
    );
  };

  return (
    <View style={styles.body}>
      {renderAddDeviceModal()}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.listSectionWrapper}>{renderDevicetListing()}</View>
      </ScrollView>
      <View style={styles.buttonSectionWrapper}>
        <ButtonComp btnText="Add Devices" action={showModal} />
      </View>
    </View>
  );
};

export default DeviceListing;
