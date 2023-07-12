import React, { useState } from 'react'
import { View, Text, Image } from 'react-native'
import {Divider} from 'react-native-elements'
import moment from 'moment'

import colors from '../config/colors'
import {WIDTH, HEIGHT} from '../config/utils'

export default ({item, index, separators}) => {
    return (
        <View style={{
            backgroundColor: 'white',
            borderColor: colors.gray,
            borderWidth: 1,
            borderRadius: HEIGHT(10),
            flex: 1,
            paddingVertical: HEIGHT(10),
            paddingHorizontal: WIDTH(10),
            marginTop: HEIGHT(15)
        }}>
            <View style={{
                backgroundColor: item.colorCd,
                borderRadius: HEIGHT(10),
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: HEIGHT(18),
                paddingLeft: WIDTH(24),
                justifyContent: 'space-between',
                paddingRight: WIDTH(12)
                }}>
                <Text style={{color: 'white', fontSize: WIDTH(26), fontFamily: 'FuturaStd-Medium'}}>{item.coursename}</Text>
                <Image source={require('../assets/checkbox.png')} style={{width: WIDTH(38), height: HEIGHT(38)}}/>
            </View>
            <View style={{flexDirection: 'row'}}>
                <View style={{marginLeft: WIDTH(30)}}>
                    <Text style={{fontSize: WIDTH(25), marginTop: HEIGHT(16), marginLeft: WIDTH(60), fontFamily: 'FuturaStd-Medium'}}>{item.masteryQuestions}</Text>
                    <Text style={{fontSize: WIDTH(20), color: colors.textGray, fontFamily: 'FuturaStd-Medium'}}>mastered</Text>
                </View>
                <View style={{marginLeft: WIDTH(30)}}>
                    <Text style={{fontSize: WIDTH(25), marginTop: HEIGHT(16), marginLeft: WIDTH(60), fontFamily: 'FuturaStd-Medium'}}>{item.pendingQuizzes}</Text>
                    <Text style={{fontSize: WIDTH(20), color: colors.textGray, fontFamily: 'FuturaStd-Medium'}}>in progress</Text>
                </View>
            </View>
            <Divider style={{marginTop: HEIGHT(10), marginBottom: HEIGHT(45)}}/>
            <View style={{flexDirection: 'row', flex: 1}}>
                <View style={{marginLeft: WIDTH(30), flex: 1}}>
                    <Text style={{fontSize: WIDTH(25), marginTop: HEIGHT(16), fontFamily: 'FuturaStd-Medium'}}>{moment(item.coursestartdate).format('MMM d')}</Text>
                    <Text style={{fontSize: WIDTH(20), color: colors.textGray, fontFamily: 'FuturaStd-Medium'}}>Start</Text>
                </View>
                <View style={{marginLeft: WIDTH(30), flex: 1}}>
                    <Text style={{fontSize: WIDTH(25), marginTop: HEIGHT(16), fontFamily: 'FuturaStd-Medium'}}>{moment(item.courseenddate).format('MMM d')}</Text>
                    <Text style={{fontSize: WIDTH(20), color: colors.textGray, fontFamily: 'FuturaStd-Medium'}}>End</Text>
                </View>
            </View>
        </View>
    )
}