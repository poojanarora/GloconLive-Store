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
import {connect} from 'react-redux';
import {
  fetchLocations,
  addLocation,
  updateLocation,
} from '../../actions/locationAction';
import Spinner from '../../components/Spinner';
const initialFormValues = {
  locationId: '',
  locationName: '',
  locationAddress: '',
};
const initialFormErrors = {
  locationName: '',
  locationAddress: '',
};
const LocationListingComponent = ({
  isLoading,
  profile,
  locations,
  fetchLocations,
  addLocation,
  updateLocation,
  navigation,
}) => {
  const [fetchData, setFetchData] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [modalVisible, setModalVisible] = useState(false);
  const [action, setAction] = useState('Add');

  useEffect(() => {
    console.log('Location listing component mounted');

    //Function callings
    fetchLocations(profile.id);

    //Clean up function
    return () => {
      console.log('Location listing component unmounted');
    };
  }, [fetchData]);

  //Function to handel location refresh
  const onRefresh = () => {
    setFetchData(!fetchData);
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
    let validateResponse = validate(formValues);
    if (Object.keys(validateResponse).length > 0) {
      setFormErrors(validateResponse);
    } else {
      let payload = {
        store_id: profile.id,
        name: formValues.locationName,
        address: formValues.locationAddress,
        status: '1',
      };
      if (action === 'Add') {
        await addLocation(payload);
      } else {
        payload.location_id = formValues.locationId;
        await updateLocation(payload);
      }
      hideModal();
    }
  };

  // Function to render location listing
  const renderLocationListing = () => {
    if (locations) {
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
            <Image
              style={styles.listItemImage}
              source={images.location_pin_2}
            />
            <Text style={[styles.listItemTitle]}>{item.name}</Text>
            <Text style={[styles.listItemSubTitle]}>Select Any One</Text>
          </TouchableOpacity>
        );
      });
    }
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
      <Spinner />
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
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.app.isLoading,
    profile: state.profile,
    locations: state.location,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchLocations: storeId => dispatch(fetchLocations(storeId)),
    addLocation: payload => dispatch(addLocation(payload)),
    updateLocation: payload => dispatch(updateLocation(payload)),
  };
};

const LocationListing = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocationListingComponent);

export default LocationListing;
