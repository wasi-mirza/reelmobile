import React from 'react'
import {Button} from 'react-native-elements'

import colors from '../config/colors'
import {HEIGHT, WIDTH} from '../config/utils'

export default ({title, onPress, loading}) => {
    return (
        <Button
            title={title}
            loading={loading}
            containerStyle={{width: '100%', paddingHorizontal: WIDTH(40)}}
            buttonStyle={{backgroundColor: colors.black, height: HEIGHT(70), borderRadius: HEIGHT(10)}}
            titleStyle={{fontFamily: 'FuturaStd-Medium', fontSize: WIDTH(29), color: 'white'}}
            onPress={onPress}
        />

    )
}