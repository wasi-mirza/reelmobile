import React,{useState, useEffect, useRef} from 'react'
import { View, StatusBar, TouchableOpacity, Image, Text, FlatList, ScrollView,AsyncStorage,Modal } from 'react-native'
import {Header, CheckBox} from 'react-native-elements'
import * as Progress from 'react-native-progress'
// import Toast from 'react-native-toast-message'
import Toast from 'react-native-simple-toast';

import StepIndicator from 'react-native-step-indicator'
import HTML from 'react-native-render-html'
import moment from 'moment'

import colors from '../config/colors'
import gstyles from '../config/styles'
import { WIDTH, HEIGHT } from '../config/utils'
import BackButton from '../components/BackButton'
import FullButton from '../components/FullButton'
import Question from '../components/Question'
import {startQuizTaking, updateQuizByQuizId} from '../config/api'
import FlipCard from 'react-native-flip-card'
import {Picker} from '@react-native-picker/picker';

export default ({route, navigation}) => {
    const [timeSpent, setTimeSpent] = useState(0)
    const [questionIndex, setQuestionIndex] = useState(0)
    // const [questionCount, setQuestionCount] = useState(null)
    const [timeRemaining, setTimeRemaining] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isskipped, setIsskipped] = useState(false)
    const [ishowingskipped, setishowingskipped] = useState(false)
    const [skippedindex, setskippedindex] = useState(null)
    const quiz = route.params.item
    const quizData = route.params.quizData
    const [currentQuestion, setCurrentQuestion] = useState(null)
    const [confidenceLevel, setConfidenceLevel] = useState(null)
    const [sync, setSync] = useState([])
    const interval = useRef(null)
    const [modal, setModal] = useState(false);

    function toggleCloseModal(modal) {
        setModal(false)
        
        console.log('setCloseModal ', modal)
      }
    

    const loadingQuiz = async () => {
        setLoading(true)
        try {
            
            setTimeRemaining(quizData.timeRemaining)
            const quizResult = await startQuizTaking(quiz.id)
            if (quizResult.status != 200) {
                setLoading(false)
                // Toast.show({
                //     type: 'error',
                //     position: 'bottom',
                //     text1: 'loading error',
                //     text2: quizResult.message
                // })
                return
            }
            const firstQuestion = quizResult.firstQuestion
            const sync = quizResult.sync
            setSync(sync)
           

            setCurrentQuestion(firstQuestion)
            setLoading(false)
            // console.log('firstQuestion:', firstQuestion)
            setTimeSpent(0)
            setQuestionIndex(0)
            interval.current = setInterval(async()=>{
              
                if (timeRemaining == 0) {                   
                   
                    if (interval.current) {
                       
                        clearInterval(interval.current)
                        interval.current = null
                        setLoading(true)
                        
                    }
                }
                setTimeRemaining(timeRemaining=>timeRemaining-1)
              
                setTimeSpent(count=>{
                    // if (count >= 1) {
                        return count+1
                    // }
                    // return 0
                })
            }, 1000)
    
        } catch (error) {
            setLoading(false)
            // Toast.show({
            //     type: 'error',
            //     position: 'bottom',
            //     text1: 'loading error',
            //     text2: error.message
            // })
        }
    }
    useEffect(() => {
        loadingQuiz()
        return ()=>{
            if (interval.current) {
                clearInterval(interval.current)
            }
        }
    }, [])
    const [activeIndex, setActiveIndex] = useState(null)
    const setActive = index => {
        setActiveIndex(index)
    }
    const updateQuestion = async skip => {
        setLoading(true)
        const nextID = (questionIndex+1)<sync.length?sync[questionIndex+1].questionId:0
        let currentquestonid=sync[questionIndex].questionId.toString();
        let skippedindex=questionIndex+1;
        let answer=activeIndex+1;
        // console.log("Answer"+activeIndex);        
        try {
            // console.log("*******time spent",timeSpent)
            const response = await updateQuizByQuizId(skip?null:answer, skip?null:confidenceLevel, 'timeUpdate', '', skip?0:activeIndex, sync[questionIndex].questionId, quiz.id, '', timeSpent, nextID)
            console.log('updateQuestion result:', response.qaData.REELCourseId)
           
            setCurrentQuestion(response.qaData)
        } catch (error) {
            console.log('updateQuestion error:', error.message)
        }
        setLoading(false)
        if ((questionIndex+1)<sync.length) {
            setQuestionIndex(questionIndex+1)
            setActive(null)
            setTimeSpent(null)
            setConfidenceLevel(null)
        }
    }

    const updatePrevQuestion = async skip => {
        setLoading(true)
        const nextID = (questionIndex-1)<sync.length?sync[questionIndex-1].questionId:0
        let currentquestonid=sync[questionIndex].questionId.toString();
        let skippedindex=questionIndex-1;
        let answer=activeIndex-1;
        // console.log("Answer"+activeIndex);        
        try {
            // console.log("*******time spent",timeSpent)
            const response = await updateQuizByQuizId(skip?null:answer, skip?null:confidenceLevel, 'timeUpdate', '', skip?0:activeIndex, sync[questionIndex].questionId, quiz.id, '', timeSpent, nextID)
            console.log('updateQuestion result prev:', response.qaData.REELCourseId)
           
            setCurrentQuestion(response.qaData)
        } catch (error) {
            // console.log('updateQuestion error:', error.message)
        }
        setLoading(false)
        if ((questionIndex-1)<sync.length) {
            setQuestionIndex(questionIndex-1)
            setActive(null)
            setTimeSpent(null)
            setConfidenceLevel(null)
        }
    }
   
   
    const SubmitFinish = async skip => {
        setLoading(true)
        const nextID = sync[questionIndex].questionId;
        try {
            const response = await updateQuizByQuizId(null, skip?null:confidenceLevel, 'finish', 'finish', skip?0:activeIndex, sync[questionIndex].questionId, quiz.id, '', timeSpent, nextID)
            // console.log('updateQuestion result:', response.qaData)
            setCurrentQuestion(response.qaData)
        } catch (error) {
            console.log('updateQuestion error:', error.message)
        }
        await AsyncStorage.removeItem('@skippedqid:key');
        await AsyncStorage.removeItem('@nextID:key');  
        await AsyncStorage.removeItem('@skippedindex:key');  
        setLoading(false)
        //navigation.replace('main')
        console.log(quiz);
        setishowingskipped(false)
        navigation.push('QuizReview', {item:quiz})
    }

    const openFlashCard = async skip => {
        // setLoading(true)
        console.log("FlashCard");
        
    }

    const handleConfLevl = async(itemValue) => {
        
        //  console.log("****************",itemValue);
         setConfidenceLevel(itemValue)
        //  try {
        //   const cardId= currentQuestion[assignee].id
        //   const confResult = await updateCardConfidence(cardId,itemValue)
        //     } catch (error) {   
        //     }
        };
    return (
        
        <View style={gstyles.container}>
            <StatusBar backgroundColor={colors.primary}/>
            <Header
                backgroundColor={colors.primary}
                leftComponent={
                    <View style={{flexDirection:"row",alignItems: 'center',}}>
                         <BackButton
                        onPress={()=>navigation.pop()}
                    />
                        <Text style={{
                                color: 'white',
                                marginTop: HEIGHT(10),
                                fontSize: WIDTH(22)
                            }}>{ishowingskipped==true? skippedindex: questionIndex+1}/{sync.length}</Text>
                        </View>
                   
                }
                centerComponent={           
                        <Text style={{color:"white",fontSize: WIDTH(22), fontFamily: 'FuturaStd-Medium',marginLeft:10}}>{quiz.name}</Text>
                }
                rightComponent={
                    <View style={{alignItems: 'center',flexDirection:"row"}}>
                            <Text style={{
                                color: timeRemaining>30?'white':'red',
                                marginTop: HEIGHT(10),
                                fontSize: WIDTH(22)
                            }}>{moment.utc(moment.duration(timeRemaining, 'seconds').asMilliseconds()).format("HH:mm:ss")}  </Text>
                            {timeRemaining==1? navigation.replace('main'):null}
                           
                       
                    </View>
                }
                containerStyle={{borderBottomColor : 'black'}}
            />
            {
                loading ?
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
                    <Progress.Circle borderWidth={2} borderColor={colors.primary} size={30} indeterminate={true} />
                </View>:
                <ScrollView
                    style={{backgroundColor: 'white', margin: HEIGHT(10), paddingHorizontal: WIDTH(10), borderRadius: HEIGHT(10)}}
                    contentContainerStyle={{paddingBottom: HEIGHT(10),paddingTop:HEIGHT(10)}}
                >
                    {/* <Text style={{
                        backgroundColor: colors.primary,
                        marginTop: HEIGHT(10),
                        borderRadius: HEIGHT(10),
                        color: 'white',
                        fontSize: WIDTH(26), fontFamily: 'FuturaStd-Medium',
                        paddingHorizontal: WIDTH(24),
                        paddingVertical: HEIGHT(18)}}
                    >Question {ishowingskipped==true? skippedindex: questionIndex+1}/{sync.length}</Text> */}
                    {/* <Text
                        style={{
                            marginTop: HEIGHT(56),
                            marginHorizontal: WIDTH(34),
                            fontSize: WIDTH(25), fontFamily: 'FuturaStd-Medium',
                        }}>
                            {currentQuestion.questionText}</Text> */}
                            {
                                (currentQuestion !=null && currentQuestion!== undefined && currentQuestion.options !== undefined && currentQuestion.options.length>0) ?
                               <View>
                               <View style={{flexDirection:'row'}}>
                                <View style={{width:'4%'}}>
                                    <Text>{ishowingskipped==true? skippedindex: questionIndex+1}.</Text>
                                </View>
                                <View style={{width:'96%',marginTop:-12}}>
                                <HTML source={{html: currentQuestion.questionText}}/>
                                </View>
                               </View>
                               
                               <View style={{marginHorizontal: WIDTH(15), marginTop: HEIGHT(24)}}>
                                    {
                                        currentQuestion.options.map((option, index)=><Question option={option} key={index+''} active={activeIndex==index} onPress={()=>setActive(index)}/>)
                                    }
                                   
                                  </View>
                                 
                      <View
                        style={{
                            borderColor: colors.gray,
                            borderWidth: 1,
                            borderRadius: HEIGHT(10),
                            paddingHorizontal: WIDTH(18),
                            marginTop: HEIGHT(18),
                            marginHorizontal: WIDTH(30),
                            paddingVertical: HEIGHT(18),
                        }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            marginBottom: HEIGHT(18),
                        }}>
                            <View
                            style={{
                                borderRadius: HEIGHT(10),
                                backgroundColor: colors.primary,
                            }}
                            >                          
                                <Text style={{
                                    paddingVertical: HEIGHT(10),
                                    paddingHorizontal: WIDTH(30),
                                    fontFamily: 'FuturaStd-Medium',
                                    justifyContent: 'flex-start',
                                    textAlign: 'center',
                                    color: 'white'}}>Confidence Level</Text>
                            </View>
                        </View>
                        <StepIndicator
                            currentPosition={confidenceLevel}
                            customStyles={{
                                stepIndicatorSize: HEIGHT(20),
                                currentStepIndicatorSize: HEIGHT(20),
                                separatorStrokeWidth: 2,
                                currentStepStrokeWidth: 0,
                                stepStrokeCurrentColor: colors.primary,
                                stepStrokeFinishedColor: colors.primary,
                                stepStrokeUnFinishedColor: colors.gray,
                                separatorFinishedColor: colors.primary,
                                separatorUnFinishedColor: colors.gray,
                                stepIndicatorFinishedColor: colors.primary,
                                stepIndicatorUnFinishedColor: colors.gray,
                                stepIndicatorCurrentColor: colors.primary,
                                stepIndicatorLabelFontSize: 1,
                                currentStepIndicatorLabelFontSize: 1,
                                currentStepLabelColor: colors.primary
                            }}
                            labels={["None","No Idea","Unsure","Think So","I Know It"]}
                            renderLabel={({label})=>{
                                return <Text style={{
                                    fontSize: WIDTH(18), fontFamily: 'FuturaStd-Medium', color: colors.textGray
                                }}>{label}</Text>
                            }}
                            onPress={number=>setConfidenceLevel(number)}/>
                    </View>
                    <View style={{flexDirection:"row", marginTop: HEIGHT(24)}}> 
                            {
                                questionIndex == 0 ? (
                                  <View  style={{flexDirection: 'row',marginBottom: HEIGHT(18),}}>
                                      <View style={{width:WIDTH(120)}}></View>
                                  </View>
                                  ) :
                                  (
                                    <TouchableOpacity  style={{flexDirection: 'row',marginBottom: HEIGHT(18),}}
                                            onPress={()=>{  
                                                if (activeIndex !== null && confidenceLevel === null) {
                                                    Toast.showWithGravity('You must choose the confidence level!', Toast.SHORT, Toast.TOP);
                                                    return
                                                }
                                                updatePrevQuestion(false)
                                            }}
                                            >
                                                <View style={{borderRadius: HEIGHT(10),backgroundColor: colors.primary,width:WIDTH(120)}}>                           
                                                    <Text style={{paddingVertical: HEIGHT(10),paddingHorizontal: WIDTH(10),
                                                        fontFamily: 'FuturaStd-Medium',
                                                        justifyContent: 'flex-start',
                                                        textAlign: 'center',fontSize: WIDTH(24),
                                                        color: 'white'}}>Previous</Text>
                                                </View>
                                </TouchableOpacity>
                                  )
                            }
                           
                            <TouchableOpacity  style={{flexDirection: 'row',marginBottom: HEIGHT(18),marginLeft:'auto',}}
                                        // onPress={() => {handleNextClick()}}
                                        onPress={()=>{
                                            // if (activeIndex == null) {
                                            //     Toast.showWithGravity('You must choose a answer!', Toast.SHORT, Toast.TOP);
                                            // return
                                            // }
                                            if (activeIndex !== null && confidenceLevel === null) {
                                                Toast.showWithGravity('You must choose the confidence level!', Toast.SHORT, Toast.TOP);
                                                return
                                            }
                                            updateQuestion(false)
                                        }}
                                        >
                                        <View style={{borderRadius: HEIGHT(10),backgroundColor: colors.primary,width:WIDTH(120)}}>                           
                                            <Text style={{paddingVertical: HEIGHT(10),
                                            paddingHorizontal: WIDTH(10),
                                                fontFamily: 'FuturaStd-Medium',
                                                justifyContent: 'flex-start',
                                                textAlign: 'center',fontSize: WIDTH(24),
                                                color: 'white'}}>Next</Text>
                                        </View>
                            </TouchableOpacity>
                    </View>
                   
                   
                   
                               </View>
                               
                                :
                                <View style={{width: '100%', marginTop: HEIGHT(30)}}>
                                
                                <FullButton
                                    title='Finish'
                                    onPress={()=>{
                                    
                                        SubmitFinish(false)
                                    }}
                                />
                               
                            </View>
                            }
                   
                    
                
                  
                </ScrollView>
            }
        </View>
    )
}
