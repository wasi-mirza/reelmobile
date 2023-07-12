import {View, SafeAreaView, StatusBar, Image, Text, StyleSheet, TouchableOpacity}  from 'react-native'
import React, { useState, useEffect } from 'react'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {Input, CheckBox, Button } from 'react-native-elements'
import {useSelector, useDispatch} from 'react-redux'
import Toast from 'react-native-toast-message'
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../config/colors'
import gstyles from '../config/styles'
import FullButton from '../components/FullButton'
import Logo from '../components/Logo'
import {HEIGHT, WIDTH} from '../config/utils'
import {signIn} from '../redux/actions'

export default ({navigation}) => {
    const [rememberMe, setRememberMe] = useState(false)
    const [email, setEmail] = useState(useSelector(state => state.userReducer.email))
    const [password, setPassword] = useState(useSelector(state => state.userReducer.password))
    const [hidePass, setHidePass] = useState(true);
    const loading = useSelector(state => state.loginReducer.loading)
    const message = useSelector(state => state.loginReducer.message)
    const userInfo = useSelector(state=>state.userReducer.userInfo)
    const dispatch = useDispatch()
    const handleLogin = () => {
        // navigation.replace('main')
        dispatch(signIn({email, password, rememberMe}))
    }
    const goForgotPassScreen = () => {
        navigation.push('forgotpass')
    }
    useEffect(()=>{
        if (message) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'login error',
                text2: message
            })
        }
    }, [message])
    useEffect(()=>{
        if (userInfo) {
            navigation.replace('main')
        }
    }, [userInfo])
    return (
        <SafeAreaView style={gstyles.container}>
            <StatusBar backgroundColor={colors.primary}/>
            <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{flex: 1}} enableOnAndroid={true}>
                <Logo/>
                <Text style={gstyles.title}>Login</Text>
                <Text style={gstyles.subtitle}>Hi there! Nice to see you again.</Text>
                <Input placeholder='Email'
                    placeholderTextColor='white'
                    inputContainerStyle={{marginTop: HEIGHT(30), marginHorizontal: WIDTH(40)}}
                    inputStyle={gstyles.input}
                    autoCapitalize='none'
                    keyboardType='email-address'
                    value={email}
                    onChangeText={email=>setEmail(email)}
                />
                <View style={{flexDirection:'row'}}>
                <View style={{width:'99%'}}>
                <Input placeholder='Password'
                    placeholderTextColor='white'
                    secureTextEntry={hidePass ? true : false}
                    inputStyle={gstyles.input}
                    inputContainerStyle={{marginHorizontal: WIDTH(40)}}
                    value={password}
                    onChangeText={password=>setPassword(password)}
                />
                </View>
                <View style={{width:'1%'}}>
                <Icon
              name={hidePass ? 'eye-slash' : 'eye'}
              size={25}
              color="#fff"
              onPress={() => setHidePass(!hidePass)}
              style={{marginLeft:-50,marginTop:7}}
            />
                </View>
                </View>
                
               
                <CheckBox
                    title='Remember me'
                    uncheckedIcon={<Image source={require('../assets/checkbox-off.png')} style={{width: WIDTH(25), height: HEIGHT(25)}} resizeMode='contain'/>}
                    checkedIcon={<Image source={require('../assets/checkbox-on.png')} style={{width: WIDTH(25), height: HEIGHT(25)}} resizeMode='contain'/> }
                    containerStyle={{backgroundColor: colors.primary, borderWidth: 0, marginLeft: WIDTH(40)}}
                    titleProps={{style: {fontFamily: 'FuturaStd-Medium', fontSize: WIDTH(23), color: 'white', marginLeft: WIDTH(18)}}}
                    checked={rememberMe}
                    onPress={()=>{
                        setRememberMe(!rememberMe)
                    }}
                />
                <View style={{marginTop: HEIGHT(60)}}>
                    <FullButton
                        title='Sign In'
                        loading={loading}
                        onPress={handleLogin}
                    />
                </View>
                <TouchableOpacity
                    style={{marginTop: HEIGHT(30), paddingRight: WIDTH(40) }}
                    onPress={goForgotPassScreen}
                >
                    <Text style={{fontFamily: 'FuturaStd-Medium', textAlign: 'right', fontSize: WIDTH(23), lineHeight: HEIGHT(25), color: 'white'}}>Forgot  password?</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {

    }
})