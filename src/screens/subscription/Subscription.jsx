import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import React, { useState } from 'react';
import styles from './style.js';
import ButtonComp from '../../components/ButtonComp.jsx';
import IconInput from '../../components/IconInput.jsx';
import IconInputWithoutLabel from '../../components/IconInputWithoutLabel.jsx';
import { TouchableHighlight } from 'react-native-gesture-handler';
import images from '../../constant/images.js';


const Subscription = () => {
  const [id, setId] = useState(null)
  const setColorSelect = (itemId) => {
    setId((prev) => {
      if (itemId === prev) {
        return null
      } else {
        return itemId
      }
    })
  }
  const arr = [
    {
      id: 1,
      title: "$119 per Year",
      subtitle: "$9.99/Month billed"
    },
    {
      id: 2,
      title: "$60 per 6 Months",
      subtitle: "$10/Month billed"
    },
    {
      id: 3,
      title: "$33 per 3 Months",
      subtitle: "$11/Month billed"
    },

  ]
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>
              Unlock Unlimited Access
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={images.shop} />

          </View>
          <View style={styles.formContainer}>
            {
              arr.map((item) => {
                return (
                  <TouchableOpacity style={[styles.inputSectionWrapper, id === item.id && styles.selectedInputSectionWrapper]} onPress={() => setColorSelect(item.id)} key={item.id}>
                    <View style={styles.inputLeftSectionWrapper}>
                      <View
                        style={id === item.id ? styles.selectedInputImageSectionWrapper : styles.inputImageSectionWrapper}>
                        <Image style={styles.iconImage} source={images.tick} />
                      </View>
                      <View style={styles.inputWrapper}>
                        <Text style={[styles.inputLabel1, id === item.id && styles.selectedInputLabel]}>{item.title}</Text>
                        <Text style={[styles.inputLabel2, id === item.id && styles.selectedInputLabel2]}>{item.subtitle}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
            <View style={styles.buttonContainer}>
              <ButtonComp btnText="CONTINUE" />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
};

export default Subscription;
