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
  departmentId: '',
  departmentName: '',
};
const initialFormErrors = {
  departmentName: '',
};

const DepartmentListing = ({locationId}) => {
  const FETCH_DEPARTMENTS_URL = '/store/get-departments';
  const ADD_DEPARTMENT_URL = '/store/add-department';
  const UPDATE_DEPARTMENT_URL = '/store/update-department';
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchDepartment, setFetchDepartment] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [addDepartmentModalVisible, setAddDepartmentModalVisible] =
    useState(false);
  const [action, setAction] = useState('Add');

  useEffect(() => {
    console.log('Department component mounted');
    //Function to fetch department
    const fetchDepartments = async () => {
      try {
        setIsLoading(true);
        const response = await axiosPrivate.post(FETCH_DEPARTMENTS_URL, {
          location_id: locationId,
        });
        setDepartments(response.data?.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
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

  //Function to handel add department
  const handelAddDepartment = () => {
    setAction('Add');
    showModal();
  };

  //Function to handel edit department
  const handelEditDepartment = item => {
    setFormValues({
      ...formValues,
      departmentId: item.id,
      departmentName: item.name,
    });
    setAction('Update');
    showModal();
  };

  //Function to validate add location form
  const validate = values => {
    let errors = {};
    if (!values.departmentName) {
      errors.departmentName = 'Please enter department name.';
    }
    return errors;
  };

  //Function to handle add and update department
  const handelSubmit = async () => {
    try {
      let validateResponse = validate(formValues);
      if (Object.keys(validateResponse).length > 0) {
        setFormErrors(validateResponse);
      } else {
        setIsLoading(true);
        let url = ADD_DEPARTMENT_URL;
        let payload = {
          location_id: locationId,
          name: formValues.departmentName,
          status: '1',
        };
        if (action === 'Update') {
          payload.id = formValues.departmentId;
          url = UPDATE_DEPARTMENT_URL;
        }
        const response = await axiosPrivate.post(url, payload);
        if (response.data.success === true) {
          if (action === 'Add') {
            setDepartments(current => [...current, response.data?.data]);
          } else {
            setDepartments(current => {
              const newState = current.map(obj => {
                //if id equals to updated loaction id then update
                if (obj.id === formValues.departmentId) {
                  return response.data?.data;
                }
                //otherwise return object as is
                return obj;
              });
              return newState;
            });
          }
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
          <TouchableOpacity
            style={styles.editIconWrapper}
            onPress={() => handelEditDepartment(item)}>
            <Image style={styles.editIconStyle} source={images.edit} />
          </TouchableOpacity>
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
        submitAction={handelSubmit}
        title={`${action} Department`}
        subTitle={
          action === 'Add'
            ? 'Please add new department.'
            : 'Please update department.'
        }
        primaryButtonText={action}
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
          <ButtonComp btnText="Add Department" action={handelAddDepartment} />
        </View>
      </OverlaySpinner>
    </View>
  );
};

export default DepartmentListing;
