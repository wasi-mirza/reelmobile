import React, { useState, useEffect} from 'react'
import { View, RefreshControl, StatusBar, TouchableOpacity, Image, Text, FlatList } from 'react-native'
import {Header, Badge} from 'react-native-elements'
// import Toast from 'react-native-toast-message'
import Toast from 'react-native-simple-toast';

import {useSelector, useDispatch} from 'react-redux'
import AwesomeAlert from 'react-native-awesome-alerts';
import moment from 'moment'
import colors from '../config/colors'
import gstyles from '../config/styles'
import { WIDTH, HEIGHT } from '../config/utils'
import DeckCell from '../components/DeckCell'
import {getAllDeckStatus} from '../config/api'
import {resetLogin} from '../redux/actions'
import {initiateQuiz} from '../config/api'
import {practiseDeck} from '../config/api'

export default ({navigation}) => {
    const [activities, setActivities] = useState({activities:[], refreshing: false})
    const dispatch = useDispatch()
    const userInfo = useSelector(state=>state.userReducer.userInfo)

    const [showAlert, setShowAlert] = useState({
        show: false,
       
    })
    
    
    const handleActivity = async(item) => {
      
        // console.log("item",item);

        if(item.count===0){
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'No cards found',
            })
        }
        else{
            const quizResult = await practiseDeck(userInfo.id,item.id,item.shared)
            // console.log("response for quiz in deck screen",quizResult);
            if(quizResult.activity.length==0)
            {
                // setShowAlert({
                //     show: true,
                // })
                Toast.showWithGravity('No flashcards available for practice today according to Spaced Learning model!', Toast.SHORT, Toast.TOP);

            }
            else{
                navigation.push('CheckDeck', {item})

            }
            
        }
        
    }
    useEffect(() => {
        loadActivities()
    }, [])
   
    const loadActivities = async () => {
        setActivities({
            activities: [],
            refreshing: true
        })
        const response = await getAllDeckStatus(userInfo.id)
        const result = response.activity.filter((item) => {
            return item.count !==0
          })  
        // console.log("temp########",result);
        const activity = result
        if (activity) {
            setActivities({
                activities: activity,
                refreshing: false
            })
        } else {
            setActivities({
                activities: [],
                refreshing: false
            })
        }

    }
    const handleRefresh = () => {
        if (userInfo) {
            loadActivities()
        }
    }
    return (
        <View style={gstyles.container}>
            <StatusBar backgroundColor={colors.primary}/>
            <Header
                backgroundColor={colors.primary}
               
                centerComponent={
                    <View style={{alignItems: 'center'}}>
                        <Text style={gstyles.headerlabel}>FlashCards</Text>
                    </View>
                }
                containerStyle={{borderBottomColor : 'black'}}
            />
            <FlatList
                style={{flex: 1, backgroundColor: 'white', margin: HEIGHT(10), paddingHorizontal: WIDTH(20), borderRadius: HEIGHT(10)}}
                data={activities.activities}
                
                refreshControl={<RefreshControl refreshing={activities.refreshing} colors={[colors.primary]} onRefresh={handleRefresh}/>}
                refreshing={activities.refreshing}
                contentContainerStyle={{paddingBottom: HEIGHT(30)}}
                keyExtractor={(item, index) => ''+index}
                renderItem={props=><DeckCell {...props} onPress={handleActivity}/>}
            />
             <AwesomeAlert
                show={showAlert.show}
                // title="Alert"
                message="No flashcards available for practice today according to Spaced Learning model!"
                // showProgress={showAlert.progress}
                progressColor={colors.primary}
                // message={showAlert.message}
                showCancelButton={true}
                // showConfirmButton={showAlert.progress?false:true}
               
                cancelButtonStyle={{borderRadius: 16}}
                cancelButtonColor={colors.primary}
                onCancelPressed={()=>{
                    setShowAlert(false)
                }}
                
            />
          
        </View>
    )
}