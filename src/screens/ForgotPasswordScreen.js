import React, { useState } from 'react'
import {View, StatusBar, Image, Text, StyleSheet, TouchableOpacity}  from 'react-native'
import {Header, Input} from 'react-native-elements'
import {useSelector, useDispatch} from 'react-redux'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-toast-message'
import {forgetPassword} from '../config/api'
import colors from '../config/colors'
import gstyles from '../config/styles'
import FullButton from '../components/FullButton'
import Logo from '../components/Logo'
import BackButton from '../components/BackButton'
import { WIDTH, HEIGHT } from '../config/utils'

export default ({navigation}) => {
    const [email, setEmail] = useState(null)
    const handleForgotPass = async() => {   
        const response = await forgetPassword(email);
        Toast.show({
            type: 'info',
            position: 'bottom',
            text1: 'Forgot Password',
            text2: response.message
        })
    }
    return (
        <KeyboardAwareScrollView
            keyboardShouldPersistTaps='handled'
            contentContainerStyle={gstyles.container}
            enableOnAndroid={true}
            >
            <StatusBar backgroundColor={colors.primary}/>
            <Header
                backgroundColor={colors.primary}
                leftComponent={
                    <BackButton
                        onPress={()=>navigation.pop()}
                    />
                }
                centerComponent={
                    <View style={{alignItems: 'center'}}>
                    <Text style={gstyles.headerlabel}>Forgot password</Text>
                    </View>
                }
                containerStyle={{borderBottomColor : 'black'}}
            />
            <Logo/>
            <Text style={gstyles.title}>Forgot password</Text>
            <Text style={gstyles.subtitle}>To reset your password, enter the email address</Text>
            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginHorizontal: 40, marginTop: 90}}>
                <Image source={require('../assets/email.png')} style={{width: WIDTH(29), height: HEIGHT(23)}}/>
                <Input placeholder='Email'
                    placeholderTextColor='white'
                    inputContainerStyle={{marginTop: HEIGHT(30), marginHorizontal: WIDTH(40)}}
                    inputStyle={gstyles.input}
                    autoCapitalize='none'
                    keyboardType='email-address'
                    value={email}
                    onChangeText={email=>setEmail(email)}
                />
            </View>
            <View style={{marginTop: HEIGHT(60), width: '100%'}}>
                <FullButton
                    title='Submit'
                    onPress={()=>{
                                if (email == null) {
                                    Toast.show({
                                        type: 'error',
                                        position: 'bottom',
                                        text1: 'Email',
                                        text2: 'You must enter a email!'
                                    })
                                    return
                                }
                                
                                handleForgotPass()
                            }}
                />
            </View>
        </KeyboardAwareScrollView>
    )
}