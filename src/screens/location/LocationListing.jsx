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
import styles from './locationListingStyles';
import {images} from '../../constant';
import ButtonComp from '../../components/ButtonComp';
import IconInputWithoutLabel from '../../components/IconInputWithoutLabel';
import PopupModal from '../../components/PopupModal';
import useAuth from '../../hooks/useAuth';
import OverlaySpinnerHOC from '../../HOC/OverlaySpinnerHOC';
import axiosPrivate from '../../config/privateApi';

const OverlaySpinner = OverlaySpinnerHOC(View);
const initialFormValues = {
  locationId: '',
  locationName: '',
  locationAddress: '',
};
const initialFormErrors = {
  locationName: '',
  locationAddress: '',
};
const LocationListing = ({navigation}) => {
  const ADD_LOCATION_URL = '/store/add-location';
  const UPDATE_LOCATION_URL = '/store/update-location';
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchLocations, setFetchLocations] = useState(false);
  const [locations, setLocations] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [modalVisible, setModalVisible] = useState(false);
  const [action, setAction] = useState('Add');

  useEffect(() => {
    console.log('Location listing component mounted');

    //Function to fetch locations
    const fetchLocations = async () => {
      try {
        setIsLoading(true);
        const response = await axiosPrivate.post('/store/get-locations', {
          store_id: auth.storeId,
        });
        setLocations(response.data?.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    //Function callings
    fetchLocations();

    //Clean up function
    return () => {
      console.log('Location listing component unmounted');
    };
  }, [fetchLocations]);

  //Function to handel location refresh
  const onRefresh = () => {
    setFetchLocations(!fetchLocations);
  };

  // Function to show add location modal
  const showModal = () => {
    setModalVisible(true);
  };

  // Function to hide add location modal
  const hideModal = () => {
    setModalVisible(false);
    setFormValues(initialFormValues);
    setFormErrors(initialFormErrors);
  };

  // Function to handel location selection
  const handelSelectLocation = selectedLocation => {
    navigation.navigate('LocationDetails', {
      locationId: selectedLocation.id,
      locationName: selectedLocation.name,
      locationAddress: selectedLocation.address,
    });
  };

  // Function to handel location name
  const handelLocationName = e => {
    setFormValues({...formValues, locationName: e});
    setFormErrors({...formErrors, locationName: ''});
  };

  // Function to handel location address
  const handelLocationAddress = e => {
    setFormValues({...formValues, locationAddress: e});
    setFormErrors({...formErrors, locationAddress: ''});
  };

  //Function to handel add location
  const handelAddLocation = () => {
    setAction('Add');
    showModal();
  };

  //Function to handel edit location
  const handelEditLocation = item => {
    setFormValues({
      ...formValues,
      locationId: item.id,
      locationName: item.name,
      locationAddress: item.address,
    });
    setAction('Update');
    showModal();
  };

  //Function to validate add location form
  const validate = values => {
    let errors = {};
    if (!values.locationName) {
      errors.locationName = 'Please enter location name.';
    }
    if (!values.locationAddress) {
      errors.locationAddress = 'Please enter location address.';
    }
    return errors;
  };

  // Function to handel add and update location
  const handelSubmit = async () => {
    try {
      let validateResponse = validate(formValues);
      if (Object.keys(validateResponse).length > 0) {
        setFormErrors(validateResponse);
      } else {
        setIsLoading(true);
        let url = ADD_LOCATION_URL;
        let payload = {
          store_id: auth.storeId,
          name: formValues.locationName,
          address: formValues.locationAddress,
          status: '1',
        };
        if (action === 'Update') {
          payload.location_id = formValues.locationId;
          url = UPDATE_LOCATION_URL;
        }
        const response = await axiosPrivate.post(url, payload);
        if (response.data.success === true) {
          if (action === 'Add') {
            setLocations(current => [...current, response.data?.data]);
          } else {
            setLocations(current => {
              const newState = current.map(obj => {
                //if id equals to updated loaction id then update
                if (obj.id === formValues.locationId) {
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
      setIsLoading(false);
    }
  };

  // Function to render location listing
  const renderLocationListing = () => {
    return locations.map((item, key) => {
      return (
        <TouchableOpacity
          key={item.id}
          style={[styles.listItemWrapper, styles.shadow]}
          onPress={() => handelSelectLocation(item)}>
          <TouchableOpacity
            style={styles.editIconWrapper}
            onPress={() => handelEditLocation(item)}>
            <Image style={styles.editIconStyle} source={images.edit} />
          </TouchableOpacity>
          <Image style={styles.listItemImage} source={images.location_pin_2} />
          <Text style={[styles.listItemTitle]}>{item.name}</Text>
          <Text style={[styles.listItemSubTitle]}>Select Any One</Text>
        </TouchableOpacity>
      );
    });
  };

  // Function to render add location modal
  const renderAddLocationModal = () => {
    return (
      <PopupModal
        show={modalVisible}
        closeAction={hideModal}
        submitAction={handelSubmit}
        title={`${action} Location`}
        subTitle={
          action === 'Add'
            ? 'Please add new location.'
            : 'Please update location.'
        }
        primaryButtonText={action}
        dangerButtonText="Cancel">
        <IconInputWithoutLabel
          placeholder="New Location Name here"
          name="locationName"
          value={formValues.locationName}
          showIcon={true}
          icon={images.tick}
          error={formErrors.locationName}
          onChangeText={handelLocationName}
        />
        <IconInputWithoutLabel
          placeholder="New Location Address here"
          name="locationAddress"
          value={formValues.locationAddress}
          showIcon={true}
          icon={images.tick}
          error={formErrors.locationAddress}
          onChangeText={handelLocationAddress}
        />
      </PopupModal>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <OverlaySpinner isLoading={isLoading} style={styles.safeAreaViewStyle}>
        <View style={styles.body}>
          {renderAddLocationModal()}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
            }>
            <View style={styles.listSectionWrapper}>
              {renderLocationListing()}
            </View>
          </ScrollView>
          <View style={styles.buttonSectionWrapper}>
            <ButtonComp btnText="Add Location" action={handelAddLocation} />
          </View>
        </View>
      </OverlaySpinner>
    </SafeAreaView>
  );
};

export default LocationListing;
