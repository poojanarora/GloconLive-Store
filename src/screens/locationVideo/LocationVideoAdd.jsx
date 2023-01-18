import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import styles from './locationVideoAddStyles';
import { images } from '../../constant';
import ButtonComp from '../../components/ButtonComp';
import IconInputWithoutLabel from '../../components/IconInputWithoutLabel';
import PopupModal from '../../components/PopupModal';
import ChooseVideo from '../../components/ChooseVideo';
import { connect } from 'react-redux';
import Spinner from '../../components/Spinner';
<<<<<<< HEAD
import { addLocationVideo } from '../../actions/locationAction';
=======
import {addLocationVideo, fetchStoreVideo} from '../../actions/locationAction';
import PopupContent from '../../components/PopupContent';
import AlertComp from '../../components/AlertComp';
import { MESSAGE_CONST } from '../../utils/appConstants';
>>>>>>> main
const LocationVideoAddComponent = ({
  route,
  isLoading,
  profile,
  addLocationVideo,
  navigation,
}) => {
<<<<<<< HEAD
  const { locationId, locationName, locationVideoTitle, locationVideoUrl } =
=======
  const {locationId, locationName, locationVideoTitle, locationVideoUrl, onVideoAdd} =
>>>>>>> main
    route.params;
  const initialFormValue = {
    videoTitle: locationVideoTitle,
    video: {
      uri: locationVideoUrl
    },
  };
  // const [fetchData, setFetchData] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValue);
  const [formErrors, setFormErrors] = useState({});
  useEffect(() => {
    console.log('Location video add component mounted');

    // fetchLocationVideo(profile.id, locationId)

    //Clean up function
    return () => {
      console.log('Location video add component unmounted');
    };
  }, []);

  const handelClose = () => {
    setFormValues(initialFormValue);
    setFormErrors({});
<<<<<<< HEAD
    navigation.pop();
=======
    onVideoAdd();
    navigation.navigate('LocationVideoListing');
>>>>>>> main
  };

  const validate = values => {
    let errors = {};
    if (!values.videoTitle) {
      errors.videoTitle = 'Please enter video title';
    } else if (!values.video.uri) {
      errors.video = 'Please select a video';
    } else if (initialFormValue.video.uri === values.video.uri) {
      errors.video = 'Please select a different video';
    }
    return errors;
  };

  const handelSubmit = async () => {
    let validateResponse = validate(formValues);
    if (Object.keys(validateResponse).length > 0) {
      setFormErrors(validateResponse);
      if (validateResponse.video) {
        AlertComp(MESSAGE_CONST.OOPS, validateResponse.video, MESSAGE_CONST.OK)
      }
      return;
    } 
    let payload = {
      store_id: profile.id,
      location_id: locationId,
      video_title: formValues.videoTitle,
      video: formValues.video,
    };
    await addLocationVideo(payload);
    handelClose()
  };

  const handelVideoTitle = e => {
    setFormValues({ ...formValues, videoTitle: e });
    setFormErrors({ ...formErrors, videoTitle: '' });
  };

  const handelVideoSelection = selectedVideo => {
    setFormValues({ ...formValues, video: selectedVideo });
    setFormErrors({ ...formErrors, video: '' });
  };

  // Function to render location listing
  const renderLocationVideoAddModal = () => {
    return (
      <PopupContent
        closeAction={handelClose}
        submitAction={handelSubmit}
        title={locationName}
        subTitle="Location Video."
        primaryButtonText="Upload"
        showFooter={true}
        dangerButtonText="Cancel">
        <IconInputWithoutLabel
          placeholder="Video Title"
          name="videoTitle"
          value={formValues.videoTitle}
          showIcon={true}
          icon={images.tick}
          error={formErrors?.videoTitle}
          onChangeText={handelVideoTitle}
        />
        <ChooseVideo
          name="video"
          selectedVideo={formValues.video}
          onVideoSelection={handelVideoSelection}
        />
      </PopupContent>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <Spinner />
      <View style={styles.body}>{renderLocationVideoAddModal()}</View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.app.isLoading,
    profile: state.profile,
    // selectedLocationVideo: state.location.selectedLocationVideo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addLocationVideo: payload => dispatch(addLocationVideo(payload)),
    // fetchLocationVideo: (storeId, LocationId) => dispatch(fetchStoreVideo(storeId, LocationId))
  };
};

const LocationVideoAdd = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocationVideoAddComponent);

export default LocationVideoAdd;
