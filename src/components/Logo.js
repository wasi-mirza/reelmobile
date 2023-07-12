import {View, Image} from 'react-native'
import React from 'react'

import {HEIGHT, WIDTH} from '../config/utils'

export default () => {
    return (
        <View style={{paddingHorizontal: 30, width: '100%', margin: HEIGHT(60), alignSelf: 'center'}}>
            <Image source={require('../assets/logo.png')} resizeMode='contain' style={{height: HEIGHT(185), width: '100%' }}/>
        </View>

    )
}