import React, { useState, useEffect} from 'react'
import { View, RefreshControl, StatusBar, TouchableOpacity, Image, Text, FlatList, Alert } from 'react-native'
import {Header, Badge} from 'react-native-elements'
import Toast from 'react-native-toast-message'
import {useSelector, useDispatch} from 'react-redux'
import AwesomeAlert from 'react-native-awesome-alerts';
import moment from 'moment'
import colors from '../config/colors'
import gstyles from '../config/styles'
import { WIDTH, HEIGHT } from '../config/utils'
import ActivityCell from '../components/ActivityCell'
import {studentDashboardStats} from '../config/api'
import {getAllQuizesStatus} from '../config/api'
import {resetLogin, signOut} from '../redux/actions'
import {initiateQuiz} from '../config/api'

export default ({navigation}) => {
    const [activities, setActivities] = useState([])
    const [refresh,setRefresh]= useState(false)
    const [page,setPage]= useState(0)

    const [email] = useState(useSelector(state => state.userReducer.email))
    const [password] = useState(useSelector(state => state.userReducer.password))

    const[array,setArray]= useState([
        {id: 1, value: "a string",},
        {id: 2, value: "another string", },
        {id: 3, value: "a string", },
    ])
    const dispatch = useDispatch()
    const [showAlert, setShowAlert] = useState({
        show: false,
        progress: false,
        message: '',
        item: null,
        quizData: null
    })

    const handleNotification = () => {

    }
    const startQuiz = async item => {
        
        setShowAlert({
            show: true,
            progress: true
        })
        const quizData = await initiateQuiz(item.id)
        console.log("quizdata in Quizzed screen",quizData)
        if (quizData.status != 200) {
            setLoading(false)
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'loading error',
                text2: quizData.message
            })
            return
        }
       console.log('quizData:', quizData)
        setShowAlert({
            show: true,
            progress: false,
            item,
            quizData,
            // message: `This quiz has ${quizData.questionCount} questions and you will have ${quizData.timeRemaining} mins to complete the quiz.`
            message:`This quiz has ${quizData.questionCount} questions and you will have ${quizData.timeRemaining > 0
                ? timerCount(quizData.timeRemaining)
                : timerCount(quizData.questionCount * 84)
                } to complete the quiz.`
        })
        // navigation.push('QuizTimer', {item})
         // ${moment.duration(quizData.questionCount*84, 'seconds').minutes()} : 
            // ${moment.duration(quizData.questionCount*84, 'seconds').seconds()} 
    }

    const timerCount = d => {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor((d % 3600) / 60);
        var s = Math.floor((d % 3600) % 60);
    
        var hDisplay = h > 0 ? h + (h === 1 ? ' hr ' : ' hrs ') : '';
        var mDisplay = m > 0 ? m + (m === 1 ? ' min ' : ' mins ') : '';
        var sDisplay = s > 0 ? s + (s === 1 ? ' sec' : ' secs ') : '';
        let hoursMin = hDisplay.length > 0 && mDisplay.length > 0;
        let hoursSec = hDisplay.length > 0 && sDisplay.length > 0;
        let minutes = mDisplay.length > 0 && sDisplay.length > 0;
        return (
          hDisplay +
          (hoursMin ? 'and ' : hoursSec ? 'and ' : '') +
          mDisplay +
          (minutes ? 'and ' : '') +
          sDisplay
        );
      };

    const handleActivity = async(item) => {
        if (item.statusId == 1 || item.statusId == 2) {
            if(item.quizTypeId ==1){
                startQuiz(item)
            }
            else if(item.quizTypeId == 2) {
                const quizData = await initiateQuiz(item.id)
                navigation.push('QuizTimer', {item, quizData})
            }
        } 
        else if (item.statusId == 3) {
            navigation.push('QuizReview', {item})
        }
    }
    const userInfo = useSelector(state=>state.userReducer.userInfo)
    useEffect(() => {
        loadActivities()
    }, [])
    useEffect(()=>{
        if (userInfo == null) {
            navigation.replace('signin')
        }
    }, [userInfo])
    const loadActivities = async () => {
        setActivities([])
        setRefresh(true)
        setPage(0)
        const response = await studentDashboardStats(userInfo.id)
        // console.log("re########",response.activity);
        if (response.status != 200) {
            dispatch(resetLogin())
            return
        }
        const activity = response.activity
        if (activity) {
            // setActivities({
            //     activities: activity,
            //     // refreshing: false
            // })
            setRefresh(false)
            setActivities(activity)

        } else {
            setActivities([])
            setRefresh(false)

        }

    }
    const logoutUser = () => {
        Alert.alert('Logout', 'Do you really want to logout?', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => dispatch(signOut({email, password}))},
          ]);

    }
    const handleRefresh = () => {
        if (userInfo) {
            loadActivities()
        }
    }
    const handleNextClick = async() => {
        console.log("page",page);
        
        // let startFrom = page === 1 ? 0 : page * 10 - 10
        setPage(page+10)
        // page=page+10
        console.log("page***",page);

        // setPage(startFrom)
        // console.log("startFrom",startFrom);


        const response = await getAllQuizesStatus(userInfo.id,page)
        
        const act = response.results

        setActivities([...activities, ...act]);
            
        // console.log("re########",activities);


    }
    return (
        <View style={gstyles.container}>
            <StatusBar backgroundColor={colors.primary}/>
            <Header
                backgroundColor={colors.primary}
              
                leftContainerStyle={{marginLeft: WIDTH(10)}}
                rightComponent={
                    <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end', width: 150}}>
                        <Text style={gstyles.headerRightLabel} numberOfLines={1} onPress= {()=>logoutUser()}>User</Text>
                        <View style={{marginLeft: WIDTH(17)}}>
                            <Image
                                source={require('../assets/photo-pic.png')}
                                style={gstyles.avatar}
                                resizeMode='contain'
                            />
                        </View>
                    </View>
                }
                containerStyle={{borderBottomColor : 'black', height: HEIGHT(150), alignItems: 'flex-end', paddingBottom: HEIGHT(5)}}
            />
            <FlatList
                style={{flex: 1, backgroundColor: 'white', margin: HEIGHT(10), paddingHorizontal: WIDTH(20), borderRadius: HEIGHT(10)}}
                data={activities}
                ListHeaderComponent={
                    <Text style={gstyles.listTitle}>Activity</Text>
                }
                // ListFooterComponent={
                //     <TouchableOpacity  style={{flexDirection: 'row',marginTop: HEIGHT(18),marginLeft:'auto',}}
                //     onPress={() => {
                //       handleNextClick()
                // }}>
                //     <View style={{borderRadius: HEIGHT(10),backgroundColor: colors.primary,width:WIDTH(120)}}>                           
                //         <Text style={{paddingVertical: HEIGHT(10),paddingHorizontal: WIDTH(10),
                //             fontFamily: 'FuturaStd-Medium',
                //             justifyContent: 'flex-start',
                //             textAlign: 'center',fontSize: WIDTH(25),
                //             color: 'white'}}>More</Text>
                //     </View>
                // </TouchableOpacity>
                // }
                refreshControl={<RefreshControl refreshing={refresh} colors={[colors.primary]} onRefresh={handleRefresh}/>}
                refreshing={refresh}
                contentContainerStyle={{paddingBottom: HEIGHT(30)}}
                keyExtractor={(item, index) => ''+index}
                renderItem={props=><ActivityCell {...props} onPress={handleActivity}/>
                
            }
            />
           
            <AwesomeAlert
                show={showAlert.show}
                showProgress={showAlert.progress}
                progressColor={colors.primary}
                message={showAlert.message}
                showCancelButton={true}
                showConfirmButton={showAlert.progress?false:true}
                confirmButtonColor={colors.primary}
                confirmText='Start Quiz Now'
                confirmButtonStyle={{borderRadius: 16}}
                cancelButtonStyle={{borderRadius: 16}}
                cancelButtonColor={colors.gray}
                onCancelPressed={()=>{
                    setShowAlert(false)
                }}
                onConfirmPressed={()=>{
                    const {item, quizData} = showAlert
                    setShowAlert(false)
                    navigation.push('QuizTimer', {item, quizData})
                }}
            />
        </View>
    )
}