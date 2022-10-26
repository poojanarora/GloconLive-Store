import React, {useState, useEffect} from 'react';
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
import {images} from '../../constant';
import ButtonComp from '../../components/ButtonComp';
import PopupModal from '../../components/PopupModal';
import IconInputWithoutLabel from '../../components/IconInputWithoutLabel';
import SelectInput from '../../components/SelectInput';
import axiosPrivate from '../../config/privateApi';
import OverlaySpinnerHOC from '../../HOC/OverlaySpinnerHOC';

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
const DeviceListing = ({locationId}) => {
  const device = [
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
  const FETCH_DEPARTMENTS_URL = '/store/get-departments';
  const FETCH_DEVICES_URL = '/store/get-device';
  const ADD_DEVICE_URL = '/store/add-device';
  const UPDATE_DEVICE_URL = '/store/update-device';
  const [isLoading, setIsLoading] = useState(false);
  const [fetchDevice, setFetchDevice] = useState(false);
  const [devices, setDevices] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [addDeviceModalVisible, setAddDeviceModalVisible] = useState(false);
  const [action, setAction] = useState('Add');

  useEffect(() => {
    console.log('Device component mounted');

    //Function to fetch devices
    const fetchDevices = async () => {
      try {
        setIsLoading(true);
        const response = await axiosPrivate.post(FETCH_DEVICES_URL, {
          department_id: 45,
        });
        setDevices(response.data?.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    //Function to fetch all departments
    const fetchDepartments = async () => {
      try {
        const response = await axiosPrivate.post(FETCH_DEPARTMENTS_URL, {
          location_id: locationId,
        });
        let departmentArr = [];
        response.data.data.forEach((element, key) => {
          departmentArr.push({id: element.id, value: element.name});
        });
        setDepartments(departmentArr);
      } catch (error) {
        console.log(error);
      }
    };

    //Calling functions
    fetchDevices();
    fetchDepartments();

    return () => {
      console.log('Device component unmounted');
    };
  }, [fetchDevice]);

  //Function to handel device refresh
  const onRefresh = () => {
    setFetchDevice(!fetchDevice);
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
    setFormValues({...formValues, deviceName: e});
    setFormErrors({...formErrors, deviceName: ''});
  };

  //Function to handel department
  const handelDepartment = selectedDepartment => {
    setFormValues({...formValues, department: selectedDepartment});
    setFormErrors({...formErrors, department: ''});
  };

  //Function to handel device id
  const handelDeviceId = e => {
    setFormValues({...formValues, deviceId: e});
    setFormErrors({...formErrors, deviceId: ''});
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
    try {
      let validateResponse = validate(formValues);
      if (Object.keys(validateResponse).length > 0) {
        setFormErrors(validateResponse);
      } else {
        setIsLoading(true);
        let url = ADD_DEVICE_URL;
        let payload = {
          department_id: formValues.department?.id,
          device_id: formValues.deviceId,
          name: formValues.deviceName,
          status: '1',
        };
        if (action === 'Update') {
          payload.id = formValues.id;
          url = UPDATE_DEVICE_URL;
        }
        const response = await axiosPrivate.post(url, payload);
        console.log(response.data);
        if (response.data.success === true) {
          if (action === 'Add') {
            setDevices(current => [...current, response.data?.data]);
          } else {
            setDevices(current => {
              const newState = current.map(obj => {
                //if id equals to updated loaction id then update
                if (obj.id === formValues.id) {
                  return response.data?.data;
                }
                //otherwise return object as is
                return obj;
              });
              return newState;
            });
          }
          setIsLoading(false);
          hideModal();
          showAlertPopup('Success', response.data?.message, 'Ok');
        } else {
          setIsLoading(false);
          showAlertPopup('Opps', response.data?.message, 'Cancel');
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  //Function to render device listing
  const renderDevicetListing = () => {
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
          contentContainerStyle={{flexGrow: 1}}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }>
          <View style={styles.listSectionWrapper}>
            {renderDevicetListing()}
          </View>
        </ScrollView>
        <View style={styles.buttonSectionWrapper}>
          <ButtonComp btnText="Add Devices" action={handelAddDevice} />
        </View>
      </OverlaySpinner>
    </View>
  );
};

export default DeviceListing;
