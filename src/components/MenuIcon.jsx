import React, {useState} from 'react';
import {
    Image,
    TouchableOpacity
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { images } from "../constant";

const MenuIcon = (props) => {

    const handelMenuIconClick = () => {
        props.navigate.toggleDrawer();
    };

    return(
        <TouchableOpacity onPress={handelMenuIconClick}>
            <Image style={{width: wp('9%'), height: hp('5%'), resizeMode: 'contain'}} source={images.menu} />
        </TouchableOpacity>
    )
}

export default MenuIcon;