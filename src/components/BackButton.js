import React from 'react'
import {TouchableOpacity, Image} from 'react-native'

import {WIDTH, HEIGHT} from '../config/utils'


export default ({onPress}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <Image
                source={require('../assets/arrow.png')}
                style={{width: WIDTH(14), height: HEIGHT(24), marginLeft: WIDTH(10), marginRight: WIDTH(20)}}
            />
        </TouchableOpacity>

    )
}