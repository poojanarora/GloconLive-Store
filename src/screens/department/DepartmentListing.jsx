import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './departmentListingStyles';
import {images} from '../../constant';
import ButtonComp from '../../components/ButtonComp';
import PopupModal from '../../components/PopupModal';
import IconInputWithoutLabel from '../../components/IconInputWithoutLabel';
import Spinner from '../../components/Spinner';
import {
  fetchDepartments,
  addDepartment,
  updateDeparment,
} from '../../actions/departmentAction';

const initialFormValues = {
  departmentId: '',
  departmentName: '',
};
const initialFormErrors = {
  departmentName: '',
};

const DepartmentListingComponent = ({
  locationId,
  isLoading,
  departments,
  fetchDepartments,
  addDepartment,
  updateDeparment,
}) => {
  const [fetchData, setFetchData] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [addDepartmentModalVisible, setAddDepartmentModalVisible] =
    useState(false);
  const [action, setAction] = useState('Add');

  useEffect(() => {
    console.log('Department component mounted');

    //Function callings
    fetchDepartments(locationId);

    return () => {
      console.log('Department component unmounted');
    };
  }, [fetchData]);

  //Function to handel department refresh
  const onRefresh = () => {
    setFetchData(!fetchData);
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
    let validateResponse = validate(formValues);
    if (Object.keys(validateResponse).length > 0) {
      setFormErrors(validateResponse);
    } else {
      let payload = {
        location_id: locationId,
        name: formValues.departmentName,
        status: '1',
      };
      if (action === 'Add') {
        await addDepartment(payload);
      } else {
        payload.id = formValues.departmentId;
        await updateDeparment(payload);
      }
      hideModal();
    }
  };

  //Function to render department listing
  const renderDepartmentListing = () => {
    if (departments) {
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
    }
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
      <Spinner />
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
    </View>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.app.isLoading,
    departments: state.department,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDepartments: locationId => dispatch(fetchDepartments(locationId)),
    addDepartment: payload => dispatch(addDepartment(payload)),
    updateDeparment: payload => dispatch(updateDeparment(payload)),
  };
};

const DepartmentListing = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DepartmentListingComponent);

export default DepartmentListing;
