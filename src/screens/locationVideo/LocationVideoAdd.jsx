import React, {useState, useRef, useEffect} from 'react';
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
import {images} from '../../constant';
import ButtonComp from '../../components/ButtonComp';
import IconInputWithoutLabel from '../../components/IconInputWithoutLabel';
import PopupModal from '../../components/PopupModal';
import ChooseVideo from '../../components/ChooseVideo';
import {connect} from 'react-redux';
import Spinner from '../../components/Spinner';
import {addLocationVideo} from '../../actions/locationAction';
const LocationVideoAddComponent = ({
  route,
  isLoading,
  profile,
  addLocationVideo,
  navigation,
}) => {
  const initialFormValue = {
    videoTitle: '',
    video: '',
  };
  const {locationId, locationName} = route.params;
  const [fetchData, setFetchData] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValue);
  const [formErrors, setFormErrors] = useState({});
  const videoPlayer = useRef(null);
  useEffect(() => {
    console.log('Location video add component mounted');

    //Clean up function
    return () => {
      console.log('Location video add component unmounted');
    };
  }, [fetchData]);

  //Function to handel location refresh
  const onRefresh = () => {
    setFetchData(!fetchData);
  };

  const handelClose = () => {
    setFormValues(initialFormValue);
    setFormErrors({});
    navigation.navigate('LocationVideoListing');
  };

  const handelSubmit = () => {
    let payload = {
      store_id: profile.id,
      location_id: locationId,
      video_title: formValues.videoTitle,
      video: formValues.video,
    };
    addLocationVideo(payload);
  };

  const handelVideoTitle = e => {
    setFormValues({...formValues, videoTitle: e});
    setFormErrors({...formErrors, videoTitle: ''});
  };

  const handelVideoSelection = selectedVideo => {
    console.log('Selected video ', selectedVideo);
    setFormValues({...formValues, video: selectedVideo});
    setFormErrors({...formErrors, video: ''});
  };

  // Function to render location listing
  const renderLocationVideoAddModal = () => {
    return (
      <PopupModal
        show={true}
        closeAction={handelClose}
        submitAction={handelSubmit}
        title={locationName}
        subTitle="Add video."
        primaryButtonText="Upload"
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
          selectedVideo={formValues.video}
          onVideoSelection={handelVideoSelection}
        />
      </PopupModal>
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addLocationVideo: payload => dispatch(addLocationVideo(payload)),
  };
};

const LocationVideoAdd = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocationVideoAddComponent);

export default LocationVideoAdd;
