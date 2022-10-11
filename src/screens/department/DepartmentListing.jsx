import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import styles from './departmentListingStyles';
import { images } from '../../constant';
import ButtonComp from '../../components/ButtonComp';
import PopupModal from '../../components/PopupModal';
import IconInputWithoutLabel from '../../components/IconInputWithoutLabel';

const DepartmentListing = () => {

    const departments = [
        {'id': 1, 'title': 'Suits', 'sub_title': '2 Devices'},
        {'id': 2, 'title': 'Kitchen', 'sub_title': '2 Devices'},
        {'id': 3, 'title': 'Hardware', 'sub_title': '2 Devices'},
        {'id': 4, 'title': 'Shoes', 'sub_title': '2 Devices'},
        {'id': 5, 'title': 'Shirts', 'sub_title': '2 Devices'},
        {'id': 6, 'title': 'Tshirts', 'sub_title': '2 Devices'},
        {'id': 7, 'title': 'Accessories', 'sub_title': '2 Devices'},
        {'id': 8, 'title': 'Mobiles', 'sub_title': '2 Devices'},
        {'id': 9, 'title': 'Accessories', 'sub_title': '2 Devices'},
        {'id': 10, 'title': 'Mobiles', 'sub_title': '2 Devices'},
        {'id': 11, 'title': 'Accessories', 'sub_title': '2 Devices'},
        {'id': 12, 'title': 'Mobiles', 'sub_title': '2 Devices'},
    ];
    const [addDepartmentModalVisible, setAddDepartmentModalVisible] = useState(false);

    useEffect(() => {
        console.log("Department component mounted");
        return () => {
            console.log("Department component unmounted");
        }
    },[]);

    const showModal = () => {
        setAddDepartmentModalVisible(true);
    };

    const hideModal = () => {
        setAddDepartmentModalVisible(false);
    };


    const renderDepartmentListing = () => {
        return(
            departments.map((item, key) => {
                return(
                    <TouchableOpacity key={item.id} style={[styles.listItemWrapper, styles.shadow]}>
                        <Image style={styles.listItemImage} source={images.demo1} />
                        <Text style={[styles.listItemTitle]}>{item.title}</Text>
                        <Text style={[styles.listItemSubTitle]}>{item.sub_title}</Text>
                    </TouchableOpacity>
                )
            })
        )
    };

    const renderAddDepartmentModal = () => {
        return(
            <PopupModal
                show={addDepartmentModalVisible}
                closeAction={hideModal}
                title="Add Department"
                subTitle="Please add new department."
                primaryButtonText="Add"
                dangerButtonText="Cancel"
            >
                <IconInputWithoutLabel placeholder="New Department Name here" name="newDepartment" showIcon={true} icon={images.tick} error={false} errorMessage="Please enter new department name." />
            </PopupModal>
        )
    };

    return(
        <View style={styles.body}>
            {renderAddDepartmentModal()}
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.listSectionWrapper}>
                {renderDepartmentListing()}
            </View>
            </ScrollView>
            <View style={styles.buttonSectionWrapper}>
                <ButtonComp btnText="Add Department" action={showModal} />
            </View>
        </View>
    )
}




export default DepartmentListing;