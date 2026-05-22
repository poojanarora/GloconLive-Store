import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import styles from './locationVideoListingStyles';
import { images } from '../../constant';
import { connect } from 'react-redux';
import Spinner from '../../components/Spinner';
import { fetchLocations } from '../../actions/locationAction';
const LocationVideoListingComponent = ({
  profile,
  locations,
  fetchLocations: fetchLocationsAction,
  navigation,
  uploadStatus,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  // useEffect(() => {
  //   console.log('Location listing component mounted');
  //   //Function callings
  //   fetchLocations(profile.id);
  //   //Clean up function
  //   return () => {
  //     console.log('Location listing component unmounted');
  //   };
  // }, [fetchData]);

  useFocusEffect(
    useCallback(() => {
      console.log('Location listing component mounted');
      //Function callings
      fetchLocationsAction(profile.id, {
        showLoader: false,
        showErrorPopup: false,
      });
      //Clean up function
      return () => {
        console.log('Location listing component unmounted');
      };
    }, [fetchLocationsAction, profile.id]),
  );

  useEffect(() => {
    if (uploadStatus === 'success') {
      fetchLocationsAction(profile.id, {
        showLoader: false,
        showErrorPopup: false,
      });
    }
  }, [fetchLocationsAction, profile.id, uploadStatus]);

  //Function to handel location refresh
  const onRefresh = () => {
    setRefreshing(true);
    Promise.resolve(
      fetchLocationsAction(profile.id, {
        showLoader: false,
        showErrorPopup: false,
      }),
    ).finally(() => {
      setRefreshing(false);
    });
  };

  // Function to handel location selection
  const handelSelectLocation = selectedLocation => {
    navigation.navigate('LocationVideoAdd', {
      locationId: selectedLocation.id,
      locationName: selectedLocation.name,
      locationVideoTitle: selectedLocation.video_title,
      locationVideoUrl: selectedLocation.video_url
        ? selectedLocation.video_url
        : '',
    });
  };

  // Function to render location listing
  const renderLocationListing = () => {
    if (locations) {
      return locations.map(item => {
        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.listItemWrapper, styles.shadow]}
            onPress={() => handelSelectLocation(item)}
          >
            {/* <TouchableOpacity style={styles.editIconWrapper}>
              <Image style={styles.editIconStyle} source={images.edit} />
            </TouchableOpacity> */}
            <Image style={styles.listItemImage} source={images.upload_video} />
            <Text style={[styles.listItemTitle]}>{item.name}</Text>
          </TouchableOpacity>
        );
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <Spinner />
      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.listSectionWrapper}>
            {renderLocationListing()}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    locations: state.location.storeLocations,
    uploadStatus: state.location.locationVideoUpload.status,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchLocations: (storeId, options) =>
      dispatch(fetchLocations(storeId, options)),
  };
};

const LocationVideoListing = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocationVideoListingComponent);

export default LocationVideoListing;
