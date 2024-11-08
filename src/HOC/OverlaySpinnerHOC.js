import React from 'react';
import {View, Modal, ActivityIndicator, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const OverlaySpinnerHOC = Component => (children, isLoading) =>
  (
    <>
      <Modal transparent={true} visible={isLoading}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ActivityIndicator size={50} color="#0000ff" />
          </View>
        </View>
      </Modal>
      <Component {...children} />
    </>
  );

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    height: moderateScale(65),
    width: moderateScale(65),
    borderRadius: moderateScale(10),
    shadowColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default OverlaySpinnerHOC;
