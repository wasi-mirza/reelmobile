import {StyleSheet} from 'react-native'

import colors from './colors'
import {HEIGHT, WIDTH} from './utils'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    title: {
        fontFamily: 'FuturaStd-Medium', fontSize: WIDTH(45), textAlign: 'center', color: colors.black, width: '100%', paddingHorizontal: 40, lineHeight: HEIGHT(50)
    },
    subtitle: {
        fontFamily: 'FuturaStd-Medium', fontSize: WIDTH(20), textAlign: 'center', color: colors.gray, marginTop: HEIGHT(30), width: '100%', paddingHorizontal: 30, lineHeight: HEIGHT(25)
    },
    tablabel: {
        fontFamily: 'FuturaStd-Medium', fontSize: WIDTH(20), fontWeight: '100', marginBottom: HEIGHT(15)
    },
    input: {
        fontFamily: 'FuturaStd-Medium', fontSize: WIDTH(28), color: 'white'
    },
    headerlabel: {
        fontFamily: 'FuturaStd-Medium', fontSize: WIDTH(26), color: 'white'
    },
    headerRightLabel: {
        fontFamily: 'FuturaStd-Medium', fontSize: WIDTH(22), color: 'white'
    },
    inputlabel: {
        fontFamily: 'FuturaStd-Medium', fontSize: WIDTH(25), color: 'white', fontWeight: 'normal'
    },
    tabBarIcon: {
        width: WIDTH(50), height: HEIGHT(45), marginTop: HEIGHT(15)
    },
    notification: {
        width: WIDTH(27), height: HEIGHT(35)
    },
    avatar: {
        width: WIDTH(55), height: HEIGHT(50)
    },
    listTitle: {
        fontFamily: 'FuturaStd-Medium', fontSize: WIDTH(26), color: colors.primary, marginTop: HEIGHT(30)
    },
    ViewStyle:{
        backgroundColor:"pink"
    }
})