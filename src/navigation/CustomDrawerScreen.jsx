import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { COLORS, images } from '../constant';

const CustomDrawerScreen = (props) => {

    const menus = [
        {
            id: 1,
            icon: images.phone,
            title: 'Incoming Calls',
            navigatTo: 'IncomingCall'
        },
        {
            id: 2,
            icon: images.location_pin,
            title: 'Locations',
            navigatTo: 'Locations'
        },
        {
            id: 3,
            icon: images.my_account,
            title: 'My Account',
            navigatTo: 'Profile'
        }
    ];
    const [selectedMenu, setSelectedMenu] = useState(1);

    //Function to handel menu click
    const handelMenuClick = (menu) => {
        setSelectedMenu(menu.id);
        props.navigation.navigate(menu.navigatTo);
    }

    return(
        <View style={styles.drawerWrapper}>
            <View style={styles.drawerContentWrapper}>
                <View style={styles.drawerTopSection}>
                    <View style={styles.drawerHeaderWrapper}>
                        <Text style={styles.logoLabel}>GLOCON Live</Text>
                    </View>
                    <View style={styles.drawerListWrapper}>
                        {
                            menus.map((value, key) => {
                                return(
                                    <TouchableOpacity style={[styles.drawerListItem, (selectedMenu === value.id) && styles.selectedList]} key={key} onPress={() => handelMenuClick(value)}>
                                        <Image style={styles.iconImage} source={value.icon} />
                                        <Text style={styles.listLabel}>{value.title}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
                <View style={styles.drawerBottomSection}>
                    <View style={styles.drawerListItem}>
                        <Image style={styles.iconImage} source={images.logout} />
                        <Text style={styles.listLabel}>Log Out</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    drawerWrapper: {
        flex: 1,
        //backgroundColor: 'red'
    },
    drawerContentWrapper: {
        flex: 1,
        marginVertical: hp('5%'),
        marginHorizontal: wp('5%'),
        //backgroundColor: 'blue'
    },
    drawerTopSection: {
        flex: 1,
        //backgroundColor: 'brown'
    },
    drawerBottomSection: {
        //backgroundColor: 'pink',
        paddingHorizontal: wp('2%'),
    },
    drawerHeaderWrapper: {
        height: hp('15%'),
        justifyContent: 'center',
        paddingLeft: wp('2%'),
        //backgroundColor: 'yellow'
    },
    logoLabel: {
        fontSize: wp('7%'),
        fontWeight: '500',
        color: COLORS.primaryTextColor
    },
    drawerListWrapper: {
        //height: hp('70%'),
        paddingHorizontal: wp('2%'),
        //backgroundColor: 'orange'
    },
    drawerListItem: {
        flexDirection: 'row',
        height: hp('5%'),
        //backgroundColor: 'green',
        marginBottom: hp('1%'),
        alignItems: 'center',
        borderRadius: wp('2%')
    },
    iconImage: {
        width: wp('5%'),
        resizeMode: 'contain',
        marginLeft: wp('2%'),
        marginRight: wp('3%'),
    },
    listLabel: {
        fontSize: wp('4%'),
        fontWeight: '400',
        color: COLORS.black
    },
    selectedList : {
        backgroundColor: COLORS.selectedListColor
    }
});

export default CustomDrawerScreen;