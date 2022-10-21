import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import styles from './departmentListingStyles';
import {images} from '../../constant';
import ButtonComp from '../../components/ButtonComp';
import PopupModal from '../../components/PopupModal';
import IconInputWithoutLabel from '../../components/IconInputWithoutLabel';
import axiosPrivate from '../../config/privateApi';
import OverlaySpinnerHOC from '../../HOC/OverlaySpinnerHOC';
import useAuth from '../../hooks/useAuth';

const OverlaySpinner = OverlaySpinnerHOC(View);
const initialFormValues = {
  departmentName: '',
};
const initialFormErrors = {
  departmentName: '',
};

const DepartmentListing = ({locationId}) => {
  const auth = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [fetchDepartment, setFetchDepartment] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [addDepartmentModalVisible, setAddDepartmentModalVisible] =
    useState(false);

  useEffect(() => {
    console.log('Department component mounted');

    //Function to fetch department
    const fetchDepartments = async () => {
      try {
        setIsLoading(true);
        const response = await axiosPrivate.post('/store/get-department', {
          location_id: locationId,
        });
        setDepartments(response.data?.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    //Function callings
    fetchDepartments();

    return () => {
      console.log('Department component unmounted');
    };
  }, [fetchDepartment]);

  //Function to handel department refresh
  const onRefresh = () => {
    setFetchDepartment(!fetchDepartment);
  };

  //Function to show add department modal
  const showModal = () => {
    setAddDepartmentModalVisible(true);
  };

  //Function to hide add department modal
  const hideModal = () => {
    setAddDepartmentModalVisible(false);
    setFormValues(initialFormValues);
    setFormErrors(initialFormErrors);
  };

  //Function to handle department name

  const handelDepartmentName = e => {
    setFormValues({...formValues, departmentName: e});
    setFormErrors({...formErrors, departmentName: ''});
    // console.log(formValues.departmentName)
  };

  //Function to validate add location form
  const validate = values => {
    let errors = {};
    if (!values.departmentName) {
      errors.departmentName = 'Please enter department name.';
    }
    return errors;
  };

  //Function to handle add department

  const handelAddDepartment = async () => {
    try {
      let validateResponse = validate(formValues);
      if (Object.keys(validateResponse).length > 0) {
        setFormErrors(validateResponse);
      } else {
        setIsLoading(true);
        const response = await axiosPrivate.post('/store/add-department', {
          location_id: locationId,
          name: formValues.departmentName,
          status: '1',
        });
        console.log(response.data);
        if (response.data.success === true) {
          setDepartments(current => [...current, response.data?.data]);
          setIsLoading(false);
          hideModal();
          showAlertPopup('Success', response.data?.message, 'Ok');
        } else {
          setIsLoading(false);
          showAlertPopup('Opps', response.data?.message, 'Cancel');
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  //Function to render department listing
  const renderDepartmentListing = () => {
    return departments.map((item, key) => {
      return (
        <TouchableOpacity
          key={item.id}
          style={[styles.listItemWrapper, styles.shadow]}>
          <Image style={styles.listItemImage} source={images.demo1} />
          <Text style={[styles.listItemTitle]}>{item.name}</Text>
          {/* <Text style={[styles.listItemSubTitle]}>{item.sub_title}</Text> */}
        </TouchableOpacity>
      );
    });
  };

  //Function to render add deparment modal
  const renderAddDepartmentModal = () => {
    return (
      <PopupModal
        show={addDepartmentModalVisible}
        closeAction={hideModal}
        submitAction={handelAddDepartment}
        title="Add Department"
        subTitle="Please add new department."
        primaryButtonText="Add"
        dangerButtonText="Cancel">
        <IconInputWithoutLabel
          placeholder="New Department Name here"
          name="DepartmentName"
          value={formValues.departmentName}
          showIcon={true}
          icon={images.tick}
          error={formErrors.departmentName}
          onChangeText={handelDepartmentName}
        />
      </PopupModal>
    );
  };

  return (
    <View style={styles.body}>
      <OverlaySpinner isLoading={isLoading} style={styles.body}>
        {renderAddDepartmentModal()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }>
          <View style={styles.listSectionWrapper}>
            {renderDepartmentListing()}
          </View>
        </ScrollView>
        <View style={styles.buttonSectionWrapper}>
          <ButtonComp btnText="Add Department" action={showModal} />
        </View>
      </OverlaySpinner>
    </View>
  );
};

export default DepartmentListing;
