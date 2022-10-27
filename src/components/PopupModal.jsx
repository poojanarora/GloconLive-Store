import React from 'react';
import {Modal} from 'react-native';
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
      />
    </Modal>
  );
};

export default PopupModal;
