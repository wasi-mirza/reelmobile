import React, { useState } from 'react'
import { View, Text,Image, TouchableOpacity } from 'react-native'
import {Divider} from 'react-native-elements'
import moment from 'moment'
// import gstyles from './config/styles'
import gstyles from '../config/styles'
import colors from '../config/colors'
import {WIDTH, HEIGHT} from '../config/utils'


export default ({item, index, separators, onPress}) => {
  
    
    // console.log("item&&&&&&&&&7",item);
    if (item.shared == 1 )
      return (
          <View>
              <View style={{backgroundColor:"red",}}>
              <Image
                style={{
                    width: WIDTH(45), height: HEIGHT(45),                  
                    marginTop: HEIGHT(18),
                    borderRadius: HEIGHT(10),            
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,              
                    bottom: 0,
                }}
                source={require("../assets/frame1.png")}
                // resizeMode='contain' 
                />
              </View>
              
              <TouchableOpacity style={{
                borderColor: colors.gray,
                borderWidth: 1,
                borderRadius: HEIGHT(10),
                flex: 1,
                paddingVertical: HEIGHT(10),
                paddingHorizontal: WIDTH(18),
                marginTop: HEIGHT(18),alignItems:"center",justifyContent:"center"
            }}
                onPress={()=>onPress(item)}
            >
                <Text style={{fontSize: WIDTH(23), fontFamily: 'FuturaStd-Medium', marginBottom: HEIGHT(8)}}>{item.title}</Text>
                <View>
                    <Image resizeMode='contain' 
                            source={require('../assets/stack.png')} 
                            style={gstyles.tabBarIcon}/>

                </View>
                <Text style={{fontSize: WIDTH(23), fontFamily: 'FuturaStd-Medium', marginBottom: HEIGHT(10)}}>{item.count}</Text>
            
            </TouchableOpacity>
          </View>
        
      );
    return (
        <TouchableOpacity style={{
            borderColor: colors.gray,
            borderWidth: 1,
            borderRadius: HEIGHT(10),
            flex: 1,
            paddingVertical: HEIGHT(10),
            paddingHorizontal: WIDTH(18),
            marginTop: HEIGHT(18),alignItems:"center",justifyContent:"center"
        }}
            onPress={()=>onPress(item)}
        >
            <Text style={{fontSize: WIDTH(23), fontFamily: 'FuturaStd-Medium', marginBottom: HEIGHT(8)}}>{item.title}</Text>
            <View>
                <Image resizeMode='contain' 
                        source={require('../assets/stack.png')} 
                        style={gstyles.tabBarIcon}/>

            </View>
            <Text style={{fontSize: WIDTH(23), fontFamily: 'FuturaStd-Medium', marginBottom: HEIGHT(10)}}>{item.count}</Text>
        
        </TouchableOpacity>
    )
}