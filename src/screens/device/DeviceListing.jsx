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
import SelectInput from '../../components/SelectInput';
import axiosPrivate from '../../config/privateApi';
import OverlaySpinnerHOC from '../../HOC/OverlaySpinnerHOC';

const OverlaySpinner = OverlaySpinnerHOC(View);
const initialFormValues = {
  department: {},
  deviceName: '',
};
const initialFormErrors = {
  department: {},
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
  const [isLoading, setIsLoading] = useState(false);
  const [fetchDevice, setFetchDevice] = useState(false);
  const [devices, setDevices] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [addDeviceModalVisible, setAddDeviceModalVisible] = useState(false);

  useEffect(() => {
    console.log('Device component mounted');

    //Function to fetch devices
    const fetchDevices = async () => {
      // try {
      //   setIsLoading(true);
      //   const response = await axiosPrivate.post(FETCH_DEVICES_URL, {
      //     department_id: 34,
      //   });
      //   setDevices(response.data?.data);
      //   setIsLoading(false);
      // } catch (error) {
      //   console.log(error);
      //   setIsLoading(false);
      // }
      setIsLoading(true);
      setTimeout(() => {
        setDevices(device);
        setIsLoading(false);
      }, 2000);
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
    console.log(selectedDepartment);
    setFormValues({...formValues, department: selectedDepartment});
    setFormErrors({...formErrors, department: ''});
  };

  //Function to validate add devvice form
  const validate = values => {
    let errors = {};
    if (Object.keys(values.department).length === 0) {
      errors.department = 'Please select department.';
    }
    if (!values.deviceName) {
      errors.deviceName = 'Please enter device name.';
    }
    return errors;
  };

  //Function to handle add and update department
  const handelSubmit = async () => {
    try {
      let validateResponse = validate(formValues);
      if (Object.keys(validateResponse).length > 0) {
        setFormErrors(validateResponse);
      } else {
        setIsLoading(true);
        console.log(formValues);
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
          <Image style={styles.listItemImage} source={images.ipad} />
          <Text style={[styles.listItemTitle]}>{item.title}</Text>
          <Text style={[styles.listItemSubTitle]}>{item.sub_title}</Text>
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
        title="Add Devices"
        subTitle="Please add new device."
        primaryButtonText="Add"
        dangerButtonText="Cancel">
        <IconInputWithoutLabel
          placeholder="New Device"
          name="deviceName"
          showIcon={true}
          icon={images.tick}
          error={formErrors.deviceName}
          value={formValues.deviceName}
          onChangeText={handelDeviceName}
        />
        <SelectInput
          selectLabel="Select Department"
          name="department"
          data={departments}
          error={formErrors.department}
          value={formValues.department}
          onSelect={handelDepartment}
        />
      </PopupModal>
    );
  };

  return (
    <View style={styles.body}>
      <OverlaySpinner isLoading={isLoading} style={styles.body}>
        {renderAddDeviceModal()}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.listSectionWrapper}>
            {renderDevicetListing()}
          </View>
        </ScrollView>
        <View style={styles.buttonSectionWrapper}>
          <ButtonComp btnText="Add Devices" action={showModal} />
        </View>
      </OverlaySpinner>
    </View>
  );
};

export default DeviceListing;
