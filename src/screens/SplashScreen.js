/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  Dimensions
} from 'react-native';
import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import 'react-native-gesture-handler'

export default ({navigation}) => {
    const userInfo = useSelector(state=>state.userReducer.userInfo)
    useEffect(() => {
        setTimeout(()=>{
            if (userInfo) {
                navigation.replace('main')    
                return
            }
            navigation.replace('signin')
        }, 2000)        
    }, [])
  return (
    <>
      <StatusBar hidden={true}/>
      <Image
        style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        }}
        source={require('../assets/splash.png')} resizeMode='stretch'/>
    </>
  );
};
