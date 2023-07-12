import React, { useEffect, useState } from 'react'
import { ScrollView, View, StatusBar, Text, Image, FlatList, RefreshControl } from 'react-native'
import {Header} from 'react-native-elements'
import StepIndicator from 'react-native-step-indicator'
import * as Progress from 'react-native-progress'
import Toast from 'react-native-toast-message'
import moment from 'moment'

import colors from '../config/colors'
import gstyles from '../config/styles'
import { WIDTH, HEIGHT } from '../config/utils'
// import {activities} from '../config/dummy'
import HTML from 'react-native-render-html'

import BackButton from '../components/BackButton'
import ActivityCell from '../components/ActivityCell'
import QuizOption from '../components/QuizOption'
import {displayScoreCard} from '../config/api'

const FinishedQuiz = ({quiz,index}) => {
    // console.log('quiz:', Object.keys(quiz))
    return (
        <View style={{
            borderColor: colors.gray,
            borderWidth: 1,
            borderRadius: HEIGHT(10),
            paddingTop: HEIGHT(10),
            marginTop: HEIGHT(18),
            paddingBottom: HEIGHT(30),
            paddingHorizontal: WIDTH(10)
        }}>
            {quiz.questionText.length>0 && <View style={{flexDirection:'row'}}><View style={{width:'4%'}}><Text>{index+1}.</Text></View><View style={{width:'96%',marginTop:-12}}><HTML source={{html: quiz.questionText}}/></View></View>}
            {quiz.brief.length>0 && <HTML source={{html: quiz.brief}}/>}
          
            {/* <Text
                textBreakStrategy='simple'
                style={{lineHeight: HEIGHT(25), fontSize: WIDTH(18), fontFamily: 'FuturaStd-Medium', color: colors.textGray}}>1. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting. Remaining essentially unchanged. It was popularised in the 1960s simply dummy text printing standard dummy text.
            </Text>
            <Text
                textBreakStrategy='simple'
                style={{lineHeight: HEIGHT(25), marginVertical: HEIGHT(22), fontSize: WIDTH(18), fontFamily: 'FuturaStd-Medium', color: 'black'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Text> */}
            {                
                quiz.options.map((option, index)=>(
                    <View key={index}>
                    {
                    option.isCorrect==1?
                   <QuizOption option={option} selectedAnswer={quiz.selectedAnswer} />
                   :
                   null
                    }       
                    </View>                               
                ))
            }
            {                
                quiz.options.map((option, index)=>(
                    <View key={index}>
                    {
                    (option.isCorrect!=1 && option.answerSequence==quiz.selectedAnswer)?
                   <QuizOption option={option} selectedAnswer={quiz.selectedAnswer} />
                   :
                   null
                    }       
                    </View>                               
                ))
            }
            {                
                quiz.options.map((option, index)=>(
                    <View key={index}>
                    {
                    (option.isCorrect!=1 && option.answerSequence!=quiz.selectedAnswer)?
                   <QuizOption option={option} selectedAnswer={quiz.selectedAnswer} />
                   :
                   null
                    }       
                    </View>                               
                ))
            }
        </View>
    )
}
export default ({route, navigation}) => {
    const [loading, setLoading] = useState(true)
    const quiz = route.params?route.params.item:null;
    const [timeSpent, setTimeSpent] = useState(null)
    const [totalScore, setTotalScore] = useState(null)
    const [name, setName] = useState('')
    const [questionCount, setQuestionCount] = useState(0)
    const [finalArray, setFinalArray] = useState([])
    const loadQuiz = async quiz => {
        setLoading(true)
        const response = await displayScoreCard(quiz.id)
        if (response.status == 200) {
            console.log('response:', response)
            setTimeSpent(moment.duration(response.quizLevelProperties.timeSpent, 'seconds'))
            setTotalScore(response.quizLevelProperties.totalScore)
            setName(response.quizLevelProperties.name)
            setQuestionCount(response.quizLevelProperties.questionCount)
            setFinalArray(response.finalArray)
            setLoading(false)
        } else {
            setLoading(false)
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'loading error',
                text2: response.message
            })
            return

        }
    }
    useEffect(()=>{
        loadQuiz(quiz)
    }, [])
    return (
        <View style={gstyles.container}>
            <StatusBar backgroundColor={colors.primary}/>
            <Header
                backgroundColor={colors.primary}
                leftComponent={
                    <View style={{flexDirection: 'row', width: 150, alignItems: 'center'}}>
                        <BackButton
                            onPress={()=>navigation.goBack()}
                        />
                    </View>
                }
                centerComponent={
                    <Text style={{color:"white",fontSize: WIDTH(26), fontFamily: 'FuturaStd-Medium'}}>{quiz.name}</Text>
                }
                rightComponent={
                    <View style={{}}>
                    {totalScore!=null &&<Text style={gstyles.headerRightLabel}>Score <Text style={{color: 'white'}}> {totalScore}%</Text></Text>}

                    </View>
                }
                // rightComponent={
                //     <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end', width: 150}}>
                //         <View style={{marginRight: WIDTH(7)}}>
                //             <Image
                //                 source={require('../assets/clock.png')}
                //                 style={{
                //                     width: WIDTH(28),
                //                     height: HEIGHT(27)
                //                 }}
                //             />
                //         </View>
                //         {timeSpent != null && <Text style={gstyles.headerRightLabel} numberOfLines={1}>{timeSpent.humanize({precision: 3})}</Text>}
                //     </View>
                // }
                containerStyle={{borderBottomColor : 'black'}}
            />
            <FlatList
                style={{flex: 1, backgroundColor: 'white', marginTop: HEIGHT(10), marginBottom:HEIGHT(10) ,paddingHorizontal: WIDTH(10), borderRadius: HEIGHT(10)}}
                data={finalArray}
                // ListHeaderComponent={
                //     <View
                //         style={{
                //             backgroundColor: colors.primary,
                //             borderRadius: HEIGHT(10),
                //             marginTop: HEIGHT(10),
                //         }}>
                //         {
                //             loading ||
                //             <Text
                //                 style={{
                //                     color: 'white',
                //                     fontSize: WIDTH(26),
                //                     fontFamily: 'FuturaStd-Medium',
                //                     paddingHorizontal: WIDTH(24),
                //                     paddingVertical: HEIGHT(18)
                //                 }}>
                //                 {name}# {questionCount}
                //             </Text>
                //         }
                //     </View>
                // }
                refreshControl={<RefreshControl refreshing={loading} colors={[colors.primary]} onRefresh={()=>loadQuiz(quiz)}/>}
                refreshing={loading}
                contentContainerStyle={{paddingBottom: HEIGHT(30)}}
                keyExtractor={(item, index) => ''+index}
                renderItem={({item,index})=><FinishedQuiz quiz={item} index={index}/>}
            />

            {/* {
                loading ?
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
                    <Progress.Circle borderWidth={2} borderColor={colors.primary} size={30} indeterminate={true} />
                </View>:

            <ScrollView
                style={{flex: 1, backgroundColor: 'white', margin: HEIGHT(10), paddingHorizontal: WIDTH(10), borderRadius: HEIGHT(10)}}
                contentContainerStyle={{paddingBottom: HEIGHT(10)}}
            >
                <View
                style={{
                    backgroundColor: colors.primary,
                    borderRadius: HEIGHT(10),
                    marginTop: HEIGHT(10),
                }}
                >
                {
                    name &&
                    <Text
                    style={{
                        color: 'white',
                        fontSize: WIDTH(26),
                        fontFamily: 'FuturaStd-Medium',
                        paddingHorizontal: WIDTH(24),
                        paddingVertical: HEIGHT(18)  
                    }}>{name}# {questionCount}</Text>
                }
                </View>
                <View style={{
                    borderColor: colors.gray,
                    borderWidth: 1,
                    borderRadius: HEIGHT(10),
                    paddingTop: HEIGHT(10),
                    paddingHorizontal: WIDTH(18),
                    marginTop: HEIGHT(18),
                    paddingBottom: HEIGHT(30)
                }}>
                    <Text
                        textBreakStrategy='simple'
                        style={{lineHeight: HEIGHT(25), fontSize: WIDTH(18), fontFamily: 'FuturaStd-Medium', color: colors.textGray}}>1. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting. Remaining essentially unchanged. It was popularised in the 1960s simply dummy text printing standard dummy text.
                    </Text>
                    <Text
                        textBreakStrategy='simple'
                        style={{lineHeight: HEIGHT(25), marginVertical: HEIGHT(22), fontSize: WIDTH(18), fontFamily: 'FuturaStd-Medium', color: 'black'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </Text>
                    <QuizOption/>
                    <QuizOption/>
                    <QuizOption/>
                    <QuizOption/>
                    <View
                        style={{
                            borderColor: colors.gray,
                            borderWidth: 1,
                            borderRadius: HEIGHT(10),
                            paddingHorizontal: WIDTH(18),
                            marginTop: HEIGHT(18),
                            marginHorizontal: WIDTH(12),
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
                            currentPosition={2}
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
                                stepIndicatorCurrentColor: colors.gray,
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
                        />
                    </View>
                </View>
                <View style={{
                    borderColor: colors.gray,
                    borderWidth: 1,
                    borderRadius: HEIGHT(10),
                    paddingVertical: HEIGHT(10),
                    paddingHorizontal: WIDTH(18),
                    marginTop: HEIGHT(18)
                }}>
                    <Text
                        textBreakStrategy='simple'
                        style={{lineHeight: HEIGHT(25), fontSize: WIDTH(18), fontFamily: 'FuturaStd-Medium', color: colors.textGray}}>2. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting. Remaining essentially unchanged. It was popularised in the 1960s simply dummy text printing standard dummy text.</Text>
                </View>
            </ScrollView> 
            }*/}
        </View>
    )
}