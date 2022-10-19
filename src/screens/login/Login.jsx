import React,{ useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import styles from './styles.js';
import { images } from '../../constant'
import IconInput from '../../components/IconInput.jsx';
import ButtonComp from '../../components/ButtonComp.jsx';
import OverlaySpinnerHOC from '../../HOC/OverlaySpinnerHOC.js';
import axiosPublic from '../../config/publicApi.js';
import showAlertPopup from "../../components/AlertComp";
import useSetAuth from "../../hooks/useSetAuth.js";
import { localStorageSetItem } from '../../hooks/useAsyncStorage.js';

const OverlaySpinner = OverlaySpinnerHOC(View);
const initialFormValues = {
    email: "",
    password: ""
};
const initialErrors = {
    email: "",
    password: "",
};

const Login = ({ navigation }) => {

    const setAuth = useSetAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialErrors);
    const [isHidden, setIsHidden] = useState(true);


    //Function to toggle password visibility
    const togglePassword = () => {
        setIsHidden(!isHidden);
    };

    //Function to handel email
    const handelEmail = (e) => {
        setFormValues({
            ...formValues,
            email: e
        });
    };

    //Function to handel password
    const handelPassword = (e) => {
        setFormValues({
            ...formValues,
            password: e
        });
    };

    //Function to validate data
    const validate = (values) => {
        let errors = {};
        if (!values.email) {
            errors.email = 'Please enter email.';
        } else {
            const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            const emailValidCheck = emailRegExp.test(values.email);
            if (emailValidCheck === false) {
                errors.email = 'Please enter a valid email address.';
            }
        }
        if (!values.password) {
            errors.password = 'Please enter password.';
        }
        return errors;
    };

    //Function to handel login
    const handelLogin = async () => {
        try {
            let validateResponse = validate(formValues);
            if (Object.keys(validateResponse).length > 0) {
                setFormErrors(validateResponse);
            }
            else {
                setIsLoading(true);
                let response = await axiosPublic.post("/store/login", formValues);
                if (response.data.success === true) {
                    let obj = {
                        accessToken: response.data?.token,
                        storeId: '',
                        email: formValues.email,
                        isLoggedIn: true
                    };
                    setAuth(obj);
                    localStorageSetItem(obj);
                    setIsLoading(false);
                    navigation.replace('PrivateStackScreen');
                } else {
                    setIsLoading(false);
                    showAlertPopup("Opps", response.data?.message, "Cancel");
                }
            }
        } catch (error) {
            console.log("In catch block");
            setIsLoading(false);
            if (error?.message === "Network Error") {
                showAlertPopup(error?.message, "Please check your internet connectivity.", 'Ok');
            } else {
                showAlertPopup("Opps", error?.message, 'Cancel');
            }
        }
    };

    //Function to navigate to signup
    const navigateToSignUp = () => {
        navigation.navigate('CheckApplicationStatus');  
    };

    return(
       <SafeAreaView style={styles.safeAreaViewStyle}>
        <OverlaySpinner isLoading={isLoading}>
            {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                <View style={styles.body}>
                    <View style={styles.mainSectionWrapper}>
                        <View style={styles.headerSectionWrapper}>
                            <Image style={styles.logoImage} source={images.logo_white} />
                        </View>
                        <View style={styles.formSectionWrapper}>
                            <IconInput
                                label="Email"
                                placeholder="mynamein@gmail.com"
                                name="email"
                                value={formValues.email}
                                icon={images.tick}
                                isSecure={false}
                                error={formErrors.email}
                                onChangeText={handelEmail}
                                onClick={null}
                            />
                            <IconInput
                                label="Password"
                                placeholder="********"
                                name="password"
                                value={formValues.password}
                                icon={isHidden? images.password_hidden_eye: images.eye}
                                isSecure={isHidden}
                                error={formErrors.password}
                                onChangeText={handelPassword}
                                onClick={togglePassword}


                            />
                            <Text></Text>
                            <View style={styles.signUpLabelWrapper}>
                                <Text style={styles.signUpLabel}>Dont have an account? <Text onPress={navigateToSignUp} style={styles.labelPrimary}>Sign Up</Text></Text>
                            </View>
                            <View style={styles.buttonSectionWrapper}>
                                <ButtonComp btnText="Sign In" action={handelLogin} />
                            </View>
                        </View>
                    </View>
                </View>
                {/* </ScrollView>  */}
            </OverlaySpinner>
        </SafeAreaView>
    )
};

export default Login;