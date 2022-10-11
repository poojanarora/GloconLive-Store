import React, {useState} from 'react';
import {
    Image,
    TouchableOpacity
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { images } from "../constant";

const MenuIcon = (props) => {

    const handelMenuIconClick = () => {
        props.navigate.toggleDrawer();
    };

    return(
        <TouchableOpacity onPress={handelMenuIconClick}>
            <Image style={{width: moderateScale(30), height: moderateScale(30), resizeMode: 'contain'}} source={images.menu} />
        </TouchableOpacity>
    )
}

export default MenuIcon;