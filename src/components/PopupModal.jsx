import React from 'react';
import { Modal, StyleSheet } from 'react-native';
import { moderateVerticalScale } from 'react-native-size-matters';
import PopupContent from './PopupContent';

const PopupModal = ({
  show,
  closeAction,
  title,
  subTitle,
  children,
  dangerButtonText,
  primaryButtonText,
  submitAction,

}) => {
  return (
    <Modal animationType="slide" transparent={false} visible={show}>
      <PopupContent
        closeAction={closeAction}
        title={title}
        subTitle={subTitle}
        children={children}
        dangerButtonText={dangerButtonText}
        primaryButtonText={primaryButtonText}
        submitAction={submitAction}
        showFooter={true}
      />
    </Modal>
  );
};
export default PopupModal;
