import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { scale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { COLORS, images } from '../constant';
import useSetAuth from '../hooks/useSetAuth';
import { localStorageRemoveItem } from '../hooks/useAsyncStorage'; 

const CustomDrawerScreen = (props) => {

    const setAuth = useSetAuth();
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

    //Function to handel logout
    const handelLogout = async () => {
        let obj = {
            accessToken: '',
            isLoggedIn: false
        };
        await localStorageRemoveItem();
        setAuth(obj);
        props.navigation.replace("PublicStackScreen");
    };

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
                    <TouchableOpacity style={styles.drawerListItem} onPress={handelLogout}>
                        <Image style={styles.iconImage} source={images.logout} />
                        <Text style={styles.listLabel}>Log Out</Text>
                    </TouchableOpacity>
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
        //backgroundColor: 'blue'
    },
    drawerTopSection: {
        flex: 1,
        //backgroundColor: 'brown'
    },
    drawerBottomSection: {
        //backgroundColor: 'pink',
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateVerticalScale(10)
    },
    drawerHeaderWrapper: {
        height: moderateScale(100),
        justifyContent: 'center',
        paddingLeft: moderateScale(20),
        //backgroundColor: 'yellow'
    },
    logoLabel: {
        fontSize: scale(25),
        fontWeight: '500',
        color: COLORS.primaryTextColor
    },
    drawerListWrapper: {
        flex: 1,
        paddingHorizontal: moderateScale(15),
        //backgroundColor: 'orange'
    },
    drawerListItem: {
        flexDirection: 'row',
        height: moderateScale(35),
        //backgroundColor: 'green',
        marginBottom: moderateScale(8),
        alignItems: 'center',
        borderRadius: moderateScale(5)
    },
    iconImage: {
        width: moderateScale(20),
        height: moderateScale(20),
        resizeMode: 'contain',
        marginLeft: moderateScale(8),
        marginRight: moderateScale(8),
    },
    listLabel: {
        fontSize: scale(12),
        fontWeight: '400',
        color: COLORS.black
    },
    selectedList : {
        backgroundColor: COLORS.selectedListColor
    }
});

export default CustomDrawerScreen;