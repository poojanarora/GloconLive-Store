import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import { COLORS, images } from '../constant';
import ButtonComp from './ButtonComp';

const PopupContent = props => {
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.modalContentWrapper}>
          <TouchableOpacity
            style={styles.modalCloseButtonWrapper}
            disabled={props.submitDisabled}
            onPress={props.cancelAction || props.closeAction}>
            <Image style={styles.modalCloseImage} source={images.close} />
          </TouchableOpacity>
          <View style={styles.modalHeaderWrapper}>
            <Text style={styles.modalTitle}>{props.title}</Text>
            {props.subTitle && (
              <Text style={styles.modalSubTitle}>{props.subTitle}</Text>
            )}
          </View>
          <ScrollView>
            <View style={styles.modalBodyWrapper}>{props.children}</View>
            {props.showFooter && (
              <View style={styles.modalFooterWrapper}>
                <ButtonComp
                  btnStyle={{
                    width: moderateScale(100),
                    backgroundColor: COLORS.dangerButtonColor,
                    shadowColor: COLORS.dangerButtonColor,
                  }}
                  btnTextStyle={{
                    fontSize: scale(14),
                  }}
                  btnText={props.dangerButtonText}
                  action={props.closeAction}
                  disabled={props.submitDisabled}
                />
                <ButtonComp
                  btnStyle={{
                    width: moderateScale(100),
                  }}
                  btnTextStyle={{
                    fontSize: scale(14),
                  }}
                  btnText={props.primaryButtonText}
                  action={props.submitAction}
                  disabled={props.submitDisabled}
                />
              </View>

            )}
          </ScrollView>
        </View>

      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.modalBackgroundColor,
  },
  modalView: {
    backgroundColor: 'white',
    paddingBottom: moderateVerticalScale(15),
    //height: moderateScale(400),
    //width: moderateScale(400),
    width: '85%',
    borderRadius: moderateScale(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContentWrapper: {},
  modalHeaderWrapper: {
    marginTop: moderateVerticalScale(15),
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: scale(15),
    color: COLORS.black,
    fontWeight: '600',
  },
  modalSubTitle: {
    fontSize: scale(11),
    fontWeight: '500',
    color: COLORS.secondaryTextColor,
    marginTop: moderateVerticalScale(6),
  },
  modalBodyWrapper: {
    marginTop: moderateVerticalScale(10),
  },
  modalFooterWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(15),
    marginTop: moderateVerticalScale(40),
  },
  modalCloseButtonWrapper: {
    height: moderateScale(45),
    width: moderateScale(45),
    position: 'absolute',
    right: moderateScale(2),
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'red'
    zIndex: 1000
  },
  modalCloseImage: {
    width: moderateScale(30),
    height: moderateScale(30),
    resizeMode: 'contain',
  },
});

export default PopupContent;
