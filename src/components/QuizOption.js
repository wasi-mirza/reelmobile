import React, { useState } from 'react'
import {View, Image, TouchableOpacity} from 'react-native'
import {CheckBox} from 'react-native-elements'
import Collapsible from 'react-native-collapsible';
import HTML from 'react-native-render-html'

import {HEIGHT, WIDTH} from '../config/utils'
import colors from '../config/colors'

export default ({option,selectedAnswer}) => {
    const [selected, setSelected] = useState(option.isCorrect==1?true:option.answerSequence==selectedAnswer?true:false)
   
    const handlePress = ()=>{
        setChecked(!checked)
    }
    return (
        <View
            style={{
                borderColor: colors.gray,
                borderWidth: 1,
                borderRadius: HEIGHT(10),
                paddingHorizontal: WIDTH(10),
                marginTop: HEIGHT(18),               
                paddingVertical: HEIGHT(10),
            }}
        >
            <View style={{
                flexDirection: 'row',               
                
                }}>
               <View style={{width:'90%',justifyContent:'center'}}>               
                {option.isCorrect!=1?
                    <CheckBox
                    checked={option.answerSequence==selectedAnswer?true:false}
                    checkedIcon={<Image source={option.answerSequence==selectedAnswer?require('../assets/checkbox-wrong.png'): require('../assets/checkbox-wrong.png')} style={{width: WIDTH(20), height: HEIGHT(20)}}/>}
                    containerStyle={{backgroundColor: 'transparent', padding: 0, margin: 0, borderWidth: 0}}
                    title={option.answer}
                    size={18}
                    titleProps={{
                        style: {marginLeft: WIDTH(18), fontSize: WIDTH(20), color: '#626262'}
                    }}
                />
               
                :
                <CheckBox
                    checked={option.isCorrect==1?true:false}
                    checkedIcon={<Image source={option.isCorrect?require('../assets/checkbox-correct.png'): require('../assets/checkbox-correct.png')} style={{width: WIDTH(20), height: HEIGHT(20)}}/>}
                    containerStyle={{backgroundColor: 'transparent', padding: 0, margin: 0, borderWidth: 0}}
                    title={option.answer}
                    size={18}
                    titleProps={{
                        style: {marginLeft: WIDTH(18), fontSize: WIDTH(20), color: '#626262'}
                    }}
                />
                }
               
                {/* <Icon
                    name='chevron-down'
                    color={colors.primary}
                    size={HEIGHT(30)}
                /> */}
                </View>
                <View style={{width: '10%',justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>setSelected(!selected)}>               
                <Image source={selected?require('../assets/down-arrow.png'):require('../assets/down-arrow.png')}
                        style={{width: 21, height: 15,alignSelf:'center'}}
                    />       
                </TouchableOpacity>
                </View>
            </View>
            <Collapsible collapsed={!selected}>
                {option.explanationText.length>0&&<HTML source={{html: option.explanationText}}/>}
            </Collapsible>
        </View>

    )
}