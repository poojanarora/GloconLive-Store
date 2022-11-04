import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import styles from './deviceListingStyles';
import { images } from '../../constant';
import ButtonComp from '../../components/ButtonComp';
import PopupModal from '../../components/PopupModal';
import IconInputWithoutLabel from '../../components/IconInputWithoutLabel';
import SelectInput from '../../components/SelectInput';
// import axiosPrivate from '../../config/privateApi';
import OverlaySpinnerHOC from '../../HOC/OverlaySpinnerHOC';
import {
  fetchDevices,
  addDevice,
  updateDevice
} from '../../actions/deviceAction';

import { connect } from 'react-redux';
import department from '../../reducers/department';
const OverlaySpinner = OverlaySpinnerHOC(View);
const initialFormValues = {
  id: '',
  department: {},
  deviceId: '',
  deviceName: '',
};
const initialFormErrors = {
  department: '',
  deviceId: '',
  deviceName: '',
};

const deviceListingComponent = ({
  locationId,
  fetchDevices,
  isLoading,
  addDevice,
  updateDevice,
  departments,
  devices,
}) => {

  const [fetchData, setFetchData] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [addDeviceModalVisible, setAddDeviceModalVisible] = useState(false);
  const [action, setAction] = useState('Add');


  useEffect(() => {
    console.log('Device component mounted');

    //Function to fetch devices

    fetchDevices(locationId)


    return () => {
      console.log('Device component unmounted');
    };
  }, [fetchData]);

  //Function to handel device refresh
  const onRefresh = () => {
    setFetchData(!fetchData);
  };

  //Function to show add device modal
  const showModal = () => {
    setAddDeviceModalVisible(true);
  };

  //Function to hide add device modal
  const hideModal = () => {
    setAddDeviceModalVisible(false);
    setFormValues(initialFormValues);
    setFormErrors(initialFormErrors);
  };

  //Function to handel device name
  const handelDeviceName = e => {
    setFormValues({ ...formValues, deviceName: e });
    setFormErrors({ ...formErrors, deviceName: '' });
  };

  //Function to handel department
  const handelDepartment = selectedDepartment => {
    setFormValues({ ...formValues, department: selectedDepartment });
    setFormErrors({ ...formErrors, department: '' });
  };

  //Function to handel device id
  const handelDeviceId = e => {
    setFormValues({ ...formValues, deviceId: e });
    setFormErrors({ ...formErrors, deviceId: '' });
  };

  //Function to validate add devvice form
  const validate = values => {
    let errors = {};
    if (Object.keys(values.department).length === 0) {
      errors.department = 'Please select department.';
    }
    if (!values.deviceId) {
      errors.deviceId = 'Please enter device id.';
    }
    if (!values.deviceName) {
      errors.deviceName = 'Please enter device name.';
    }
    return errors;
  };

  //Function to handel add device
  const handelAddDevice = () => {
    setAction('Add');
    showModal();
  };

  //Function to handel edit device
  const handelEditDevice = item => {
    setFormValues({
      ...formValues,
      id: item.id,
      deviceId: item.device_id,
      deviceName: item.name,
    });
    setAction('Update');
    showModal();
  };

  //Function to handle add and update device
  const handelSubmit = async () => {

    let validateResponse = validate(formValues);
    if (Object.keys(validateResponse).length > 0) {
      setFormErrors(validateResponse);
    } else {
      // setIsLoading(true);
      let payload = {
        department_id: formValues.department?.id,
        device_id: formValues.deviceId,
        name: formValues.deviceName,
        status: '1',
      };
      if (action === 'Add') {
        await addDevice(payload);
      } else {
        payload.device_id = formValues.deviceId;
        await updateDevice(payload);
      }
      hideModal();
    }
  }


  //Function to render device listing
  const renderDeviceListing = () => {

    if (devices) {
      return devices.map((item, key) => {
        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.listItemWrapper, styles.shadow]}>
            <TouchableOpacity
              style={styles.editIconWrapper}
              onPress={() => handelEditDevice(item)}>
              <Image style={styles.editIconStyle} source={images.edit} />
            </TouchableOpacity>
            <Image style={styles.listItemImage} source={images.ipad} />
            <Text style={[styles.listItemTitle]}>{item.name}</Text>
            {/* <Text style={[styles.listItemSubTitle]}>{item.sub_title}</Text> */}
          </TouchableOpacity>
        );
      });
    }
  };

  //Function to render add device modal
  const renderAddDeviceModal = () => {
    return (
      <PopupModal
        show={addDeviceModalVisible}
        closeAction={hideModal}
        submitAction={handelSubmit}
        title={`${action} Device`}
        subTitle={
          action === 'Add' ? 'Please add new device.' : 'Please update device.'
        }
        primaryButtonText={action}
        dangerButtonText="Cancel">
        <SelectInput
          selectLabel="Select Department"
          name="department"
          data={departments}
          error={formErrors.department}
          value={formValues.department}
          onSelect={handelDepartment}
        />
        <IconInputWithoutLabel
          placeholder="New Device Id"
          name="deviceId"
          showIcon={true}
          icon={images.tick}
          error={formErrors.deviceId}
          value={formValues.deviceId}
          onChangeText={handelDeviceId}
        />
        <IconInputWithoutLabel
          placeholder="New Device name"
          name="deviceName"
          showIcon={true}
          icon={images.tick}
          error={formErrors.deviceName}
          value={formValues.deviceName}
          onChangeText={handelDeviceName}
        />
      </PopupModal>
    );
  };

  return (
    <View style={styles.body}>
      <OverlaySpinner isLoading={isLoading} style={styles.body}>
        {renderAddDeviceModal()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }>
          <View style={styles.listSectionWrapper}>
            {renderDeviceListing()}
          </View>
        </ScrollView>
        <View style={styles.buttonSectionWrapper}>
          <ButtonComp btnText="Add Devices" action={handelAddDevice} />
        </View>
      </OverlaySpinner>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.app.isLoading,
    devices: state.device,
    departments: state.department,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDevices: locationId => dispatch(fetchDevices(locationId)),
    addDevice: (payload) => dispatch(addDevice(payload)),
    updateDevice: (payload) => dispatch(updateDevice(payload)),

  };
};

const DeviceListing = connect(
  mapStateToProps,
  mapDispatchToProps,
)(deviceListingComponent);


export default DeviceListing;
