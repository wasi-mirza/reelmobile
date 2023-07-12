import React, { useState } from 'react'
import { View, Text, TouchableOpacity,Image } from 'react-native'
import {Divider} from 'react-native-elements'
import moment from 'moment'

import colors from '../config/colors'
import {WIDTH, HEIGHT} from '../config/utils'

export default ({item, index, separators, onPress}) => {
    const status = statusId => {
        // console.log("statusId",statusId);
        if (statusId == 1) {
            return<Text style={{fontFamily: 'FuturaStd-Medium',color: colors.primary}}> Not Started </Text> 
        }
        if (statusId == 2) {
            return<Text style={{fontFamily: 'FuturaStd-Medium',color: "#faad14"}}> In Progress </Text> 
        }
        if (statusId == 3) {
            return<Text style={{fontFamily: 'FuturaStd-Medium',color: "#52c41a"}}> Finished </Text>
        }
        if (statusId == 4) {
            return<Text style={{fontFamily: 'FuturaStd-Medium',color: "#d9d9d9"}}> Auto-submitted </Text> 
        }
        return ''
    }
    const secondsToHms =  (d) =>{

    d = Number(d);
    // console.log("d",d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hr, " : " hrs, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " min, " : " mins, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " sec" : " secs") : "";
    return <Text style={{fontFamily: 'FuturaStd-Medium',}}> {" "+ hDisplay + mDisplay + sDisplay} </Text>  
    }

    const returnCap =(item)=>{
        let colorID;

        if (item.statusId == 1) {
            colorID= colors.primary
        }
        if (item.statusId == 2) {
            colorID= "#faad14"
        }
        if (item.statusId == 3) {
            colorID= "#52c41a"
        }
        if (item.statusId == 4) {
            colorID= "#d9d9d9"
        }
      
        return <View style={{position: "absolute",marginTop: HEIGHT(18),borderTopLeftRadius: HEIGHT(10),
                top: 0,left: 0,right: 0,bottom: 0,}}>
                    <View style={{width:WIDTH(40),
                    height:HEIGHT(30),borderTopLeftRadius: HEIGHT(10),
                    backgroundColor:colorID,
                    alignItems:'center',justifyContent:'center' }}>

                    <View style={{backgroundColor:'white',marginTop:HEIGHT(5),
                        marginLeft:HEIGHT(5),width:WIDTH(40),height:HEIGHT(30), 
                        alignSelf:'center' ,borderTopLeftRadius:30}}/>

                    </View>
                </View>


        
        
       
    }
    return (
        <View>
            {returnCap(item)}  
            {/* {status(item.statusId)} */}

            <TouchableOpacity style={{
                borderColor: colors.gray,
                borderWidth: 1,
                borderRadius: HEIGHT(10),
                flex: 1,
                paddingVertical: HEIGHT(10),
                paddingHorizontal: WIDTH(18),
                marginTop: HEIGHT(18)
            }}
                onPress={()=>onPress(item)}
            >
            <Text style={{fontSize: WIDTH(23), fontFamily: 'FuturaStd-Medium', marginBottom: HEIGHT(10)}}>{item.name}</Text>
            <Divider/>
            <View>
                {item.statusId === 3 || item.statusId === 4?
                        <View>
                             <View style={{flexDirection: 'row', alignItems: 'center', marginTop: HEIGHT(15)}}>
                                <View style={{flex: 3,flexDirection:"row"}}>
                                    {status(item.statusId)}
                                    <Text style={{fontFamily: 'FuturaStd-Medium', color: colors.textGray,}}>{" " + item.totalScore+'%'}
                                    </Text>
                                </View>
                                <Text style={{flex: 3, textAlign: 'right', color: colors.textGray, fontFamily: 'FuturaStd-Medium', fontSize: WIDTH(16)}}>{moment(item.createdAt).format('DD/MM/YYYY, hh:mm a')}</Text>
                            </View>
                            <View style={{marginTop: HEIGHT(10),flexDirection: 'row',}}>
                            <Text style={{fontFamily: 'FuturaStd-Medium', color: colors.textGray,}}>{item.questionCount+' Qs'+'  '}Time Spent:{item.timeSpent ? secondsToHms(item.timeSpent) :" 0 Sec"}
                            </Text>
                                   
                            </View>
                        </View>
                        : 
                        <View>
                             <View style={{flexDirection: 'row', alignItems: 'center', marginTop: HEIGHT(15)}}>
                                <View style={{flex: 3}}>
                                    <Text style={{fontFamily: 'FuturaStd-Medium', color: colors.textGray,}}>{item.questionCount+' Qs'}
                                    {status(item.statusId)}
                                    </Text>
                                </View>
                                <Text style={{flex: 3, textAlign: 'right', color: colors.textGray, fontFamily: 'FuturaStd-Medium', fontSize: WIDTH(16)}}>{moment(item.createdAt).format('DD/MM/YYYY, hh:mm a')}</Text>
                            </View>
                            <Text style={{marginTop: HEIGHT(10),fontFamily: 'FuturaStd-Medium', color: colors.textGray,}}>Time Spent:{item.timeSpent ? secondsToHms(item.timeSpent) :" 0 Sec"}
                            </Text>
                           
                        </View> 
                }
               
            </View>
            
        </TouchableOpacity>

        </View>
    )
}