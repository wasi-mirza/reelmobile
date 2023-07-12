import {Dimensions} from 'react-native'

export const HEIGHT = pixel => {
    return (pixel/1047)*Dimensions.get('window').height
}

export const WIDTH = pixel => {
    return (pixel/590)*Dimensions.get('window').width
}