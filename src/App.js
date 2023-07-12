/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import {
    Platform,
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
import { useEffect } from 'react'
import Toast from 'react-native-toast-message'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs'
import LinearGradient from 'react-native-linear-gradient'
import { persistStore } from 'redux-persist'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import SplashScreen from './screens/SplashScreen'
import SigninScreen from './screens/SigninScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import QuizzedScreen from './screens/QuizzedScreen'
import QuizReviewScreen from './screens/QuizReviewScreen'
import QuizTimerScreen from './screens/QuizTimerScreen'
import CoursesScreen from './screens/CoursesScreen'
import colors from './config/colors'
import gstyles from './config/styles'
import {HEIGHT, WIDTH} from './config/utils'
import store, {sagaMiddleware} from './redux/store'
import rootSaga from './redux/saga'
import DeckScreen from './screens/DeckScreen'
import CheckDeckScreen from './screens/CheckDeckScreen'

sagaMiddleware.run(rootSaga)

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const SigninStack = ()=>{
    return (
        <>
            {/* <SafeAreaView style={{ flex: 0, backgroundColor: colors.primary }} /> */}
            {/* <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}> */}
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <Stack.Screen name='signin' component={SigninScreen} />
                    <Stack.Screen name='forgotpass' component={ForgotPasswordScreen} />
                </Stack.Navigator>
            {/* </SafeAreaView> */}
        </>
    )
}

const DashboardStack = ()=>{
    return (
        <>
            {/* <SafeAreaView style={{ flex: 0, backgroundColor: colors.primary }} /> */}
            {/* <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}> */}
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <Stack.Screen name='Quizzes' component={QuizzedScreen} />
                    <Stack.Screen name='QuizTimer' component={QuizTimerScreen} />
                    <Stack.Screen name="QuizReview" component={QuizReviewScreen} />
                </Stack.Navigator>
            {/* </SafeAreaView> */}
        </>
    )
}
const DeckStack = ()=>{
    return (
        <>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <Stack.Screen name='Decks' component={DeckScreen} />
                    <Stack.Screen name='CheckDeck' component={CheckDeckScreen} />
                    {/* <Stack.Screen name="QuizReview" component={QuizReviewScreen} /> */}
                </Stack.Navigator>
        </>
    )
}
const Main = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    switch (route.name) {
                        case 'Quizzes':
                        default:
                            return (
                                <Image resizeMode='contain' source={require('./assets/Dashboard.png')} style={gstyles.tabBarIcon} />
                            )
                        case ' ':
                            return (
                                <View style={gstyles.tabBarIcon}/>
                            )
                        case 'Courses':
                            return (
                                <Image resizeMode='contain' source={require('./assets/Courses.png')} style={gstyles.tabBarIcon}/>
                            )
                        case 'FlashCards':
                            return (
                                <Image resizeMode='contain' source={require('./assets/stackwhite_new.png')} style={gstyles.tabBarIcon}/>
                            )
                    }
                },
                tabBarLabel: ({ focused, color }) => {
                    return <Text style={[gstyles.tablabel, {color: focused?'black':'white'}]}>{route.name}</Text>
                },
            })}
            tabBarOptions={{
                style: {
                    height: Platform.OS == 'ios'?HEIGHT(120):HEIGHT(90),
                    backgroundColor: colors.tabbar,
                },
                tabStyle: {
                    borderRightWidth: 1,
                    borderColor: 'gray'
                },
                activeTintColor: 'red'
            }}
           
        >
            <Tab.Screen name="Quizzes" component={DashboardStack} />
          
            {/* <Tab.Screen name="Courses" component={CoursesScreen} /> */}
            <Tab.Screen name="FlashCards" component={DeckStack} />
        </Tab.Navigator>
    )
}

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistStore(store)}>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false
                        }}
                    >
                        <Stack.Screen name='splash' component={SplashScreen} />
                        <Stack.Screen name='signin' component={SigninStack} />
                        <Stack.Screen name='main' component={Main} />
                    </Stack.Navigator>
                    <Toast ref={(ref) => Toast.setRef(ref)} visibilityTime={7000}/>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
};

export default App;
