import React, { useState } from 'react'
import {View, Image, TouchableOpacity} from 'react-native'
import {CheckBox} from 'react-native-elements'

import {HEIGHT, WIDTH} from '../config/utils'
import colors from '../config/colors'

export default ({active, onPress, option, index}) => {
    return (
        <CheckBox
            checked={active}
            onPress={onPress}
            uncheckedIcon={<Image source={require('../assets/off.png')}/>}
            checkedIcon={<Image source={require('../assets/on.png')}/>}
            title={option.answer}
            containerStyle={{backgroundColor: active?colors.textGray:'transparent', borderRadius: HEIGHT(15)}}
            titleProps={{style: {fontFamily: 'FuturaStd-Medium', fontSize: WIDTH(20), color: active?'white':colors.textGray, marginLeft: 18}}}
        />
    )
}