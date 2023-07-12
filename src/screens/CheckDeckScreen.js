import React,{useState, useEffect, useRef} from 'react'
import { View, StatusBar,TextInput, TouchableOpacity, Image, Text, FlatList, ScrollView,AsyncStorage,Modal } from 'react-native'
import {Header, CheckBox} from 'react-native-elements'
import * as Progress from 'react-native-progress'
// import Toast,{BaseToast } from 'react-native-toast-message'
import Toast from 'react-native-simple-toast';

import StepIndicator from 'react-native-step-indicator'
import HTML from 'react-native-render-html'
import moment from 'moment'
import {  StyleSheet, Animated, KeyboardAvoidingView } from "react-native";
import { Button } from "react-native-paper";
import { Card, Title } from "react-native-paper";

import colors from '../config/colors'
import gstyles from '../config/styles'
import { WIDTH, HEIGHT } from '../config/utils'
import BackButton from '../components/BackButton'
import FullButton from '../components/FullButton'
import Question from '../components/Question'
import {practiseDeck} from '../config/api'
import {updateCardConfidence} from '../config/api'
import {updateCardAccuracy} from '../config/api'
import {useSelector, useDispatch} from 'react-redux'
import {Picker} from '@react-native-picker/picker';

import FlipCard from 'react-native-flip-card'

export default ({route, navigation}) => {
   
    const [loading, setLoading] = useState(true)
    const deckData = route.params.item
    const [currentQuestion, setCurrentQuestion] = useState(null)
    const [confidenceLevel, setConfidenceLevel] = useState(null)
    const [accuracyLevel, setAccuracyLevel] = useState(null)
    const [assignee, setAssignee] = useState(0);
    const userInfo = useSelector(state=>state.userReducer.userInfo)
    const [isFlipped, setIsFlipped] = useState(false);
  
   
    

    const loadingQuiz = async () => {
        setLoading(true)
        try {
           
            // console.log("item from passing data************",deckData);
            const quizResult = await practiseDeck(userInfo.id,deckData.id,deckData.shared)
            console.log("response for in checkdeck",quizResult);
            if (quizResult.status != 200) {
                setLoading(false)
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'loading error',
                    text2: quizResult.message
                })
                return
            }
            const firstQuestion = quizResult.activity 
            // console.log("********",firstQuestion)
            
           
            setCurrentQuestion(firstQuestion)
            setLoading(false)
            
    
        } catch (error) {
            setLoading(false)
           
        }
    }
    useEffect(() => {
        loadingQuiz()
        
    }, [])
    
    const handleNextClick = () => {

      
      if(isFlipped== true)
        {
          if(accuracyLevel=== null || accuracyLevel==="0")
          {
          //   Toast.show({
          //     type: 'error',
          //     position: 'top',
          //     text1: 'Please Select Accuracy level',
          // })
          
          Toast.showWithGravity('Select Accuracy level', Toast.SHORT, Toast.TOP);

          }
          else{
            setAssignee(prev => (prev + 1) % currentQuestion.length);
            setIsFlipped(false)
            setAccuracyLevel(null)
            setConfidenceLevel(null)
          }
        }
        else{
          setAssignee(prev => (prev + 1) % currentQuestion.length);
          setIsFlipped(false)
          setAccuracyLevel(null)
          setConfidenceLevel(null)

        }
        // console.log("assignee value handleAssigneeOnClick",assignee);


      };

      const handlePrevClick = () => { 
        if(isFlipped== true)
          {
            if(accuracyLevel=== null || accuracyLevel==="0")
            {
            Toast.showWithGravity('Select Accuracy level', Toast.SHORT, Toast.TOP);
            }
            else{
              setAssignee(prev => (prev - 1) % currentQuestion.length);
              setIsFlipped(false)
              setAccuracyLevel(null)
              setConfidenceLevel(null)
            }
          }
          else{
            setAssignee(prev => (prev - 1) % currentQuestion.length);
            setIsFlipped(false)
            setAccuracyLevel(null)
            setConfidenceLevel(null)
  
          }
          // console.log("assignee value handleAssigneeOnClick",assignee);
        };
  
    const handleExitDeck = () => {
      if(isFlipped== true)
      {
        if(accuracyLevel=== null || accuracyLevel==="0")
        {
          Toast.showWithGravity('Select Accuracy level', Toast.SHORT, Toast.TOP);  
        }
        else{
          navigation.pop()
        }
        
       }
       else{
        navigation.pop()
      }
     
      };
    
    
    const handleFlip = () => {
        // console.log("confidenceLevel click",confidenceLevel);
        if(confidenceLevel===null || confidenceLevel==="0"){
          // Toast.show('please select confidence level', Toast.SHORT);
          Toast.showWithGravity('Select confidence level', Toast.SHORT, Toast.TOP);
         
        }
        else{
          setIsFlipped(!isFlipped)

        }
      };
      const handleConfLevl = async(itemValue) => {
        
      //  console.log("****************",itemValue);
       setConfidenceLevel(itemValue)
       try {
        const cardId= currentQuestion[assignee].id
        const confResult = await updateCardConfidence(cardId,itemValue)
       
      

    } catch (error) {
     
    }

      //  console.log("confidenceLevel handleConfLevl",confidenceLevel);
      };

      const handleAccLevel = async(itemValue) => {
        
         setAccuracyLevel(itemValue)
         try {
          const cardId= currentQuestion[assignee].id
          const accResult = await updateCardAccuracy(cardId,itemValue)
       
        
  
      } catch (error) {
        
      }
  
        //  console.log("confidenceLevel handleConfLevl",confidenceLevel);
        };
     
   
    return (
        <View style={gstyles.container}>
            <StatusBar backgroundColor={colors.primary}/> 
            {
                loading ?
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
                    <Progress.Circle borderWidth={2} borderColor={colors.primary} size={30} indeterminate={true} />
                </View>:
                
               
                
                  <View style={{flex:1,backgroundColor: 'white', margin: HEIGHT(10), }}>
                        
                      <View style={{backgroundColor: colors.primary,flexDirection:"row",
                                     paddingVertical: HEIGHT(18),marginTop:HEIGHT(20)}}>
                          <View style={{flexDirection:"row",alignItems:'center',flexShrink:1}}>
                            <BackButton onPress={()=>navigation.pop()}/>
                                <View style={{alignItems: 'center'}}>
                                  <Text style={{fontFamily: 'FuturaStd-Medium', fontSize: WIDTH(25), color: 'white', flex:1,flexWrap:"wrap",}}>
                                    {deckData.title}</Text>
                              </View>
                          </View>
                          <Text style={{color: 'white',fontSize: WIDTH(24), fontFamily: 'FuturaStd-Medium',
                                marginLeft:'auto',marginRight: WIDTH(20)
                              }}>{assignee+1}/{currentQuestion.length}</Text>

                      </View>
                      <View style={{flex:1,  }}>     
                            <ScrollView
                                contentContainerStyle={{paddingBottom: HEIGHT(10),paddingHorizontal: WIDTH(10),
                                  borderRadius: HEIGHT(20),}}>
                            <FlipCard 
                                style={{}}
                                friction={6}
                                perspective={1000}
                                flipHorizontal={true}
                                flipVertical={false}
                                flip={isFlipped}
                                clickable={false}
                                >
                                {/* Face Side */}
                            <View style={{}}>       
                              <View style={{marginHorizontal: WIDTH(15), marginTop: HEIGHT(24)}}>
                                  <HTML baseFontStyle={{ color: '#909090',fontFamily: 'FuturaStd-Medium'}}
                                      source={{html: currentQuestion[assignee].title}}/>
                                  <Text style={{fontSize: WIDTH(23), fontFamily: 'FuturaStd-Medium', marginBottom: HEIGHT(15),marginTop: HEIGHT(15)}}>Select Confidence Level</Text>
                                  <View style={{flex:1,borderWidth:0.3,borderColor:"#d5d5d5",marginBottom: HEIGHT(15)}}>
                                      <Picker
                                          mode="dropdown" 
                                          selectedValue={confidenceLevel}
                                          style={{ fontFamily: 'FuturaStd-Medium' }}
                                          textStyle={{ fontFamily: 'FuturaStd-Medium' }}
                                          onValueChange={
                                            (itemValue,itemIndex)=>handleConfLevl(itemValue)
                                          }
                                          >
                                          <Picker.Item label="None" value="0" />
                                          <Picker.Item label="No Idea" value="1" />
                                          <Picker.Item label="Unsure" value="2" />
                                          <Picker.Item label="Think So" value="3" />
                                          <Picker.Item label="I Know It" value="4" />
                                      </Picker>
                                  </View>      
                              </View>
                            </View>
                            {/* Back Side */}
                            <View style={{marginHorizontal: WIDTH(5), marginTop: HEIGHT(24)}}>
                                <HTML baseFontStyle={{ color: '#909090',fontFamily: 'FuturaStd-Medium'}}
                                      source={{html: currentQuestion[assignee].title}}/>
                                      <HTML baseFontStyle={{ color: 'black',fontFamily: 'FuturaStd-Medium'}}
                                        source={{html: currentQuestion[assignee].answer}}/>
                                  <Text style={{fontSize: WIDTH(23), fontFamily: 'FuturaStd-Medium', marginBottom: HEIGHT(15),marginTop: HEIGHT(15)}}>Select Accuracy Level</Text>
                                <View style={{flex:1,borderWidth:0.3,borderColor:"#d5d5d5",marginBottom: HEIGHT(15)}}>
                                    <Picker
                                        mode="dropdown" 
                                        selectedValue={accuracyLevel}
                                        onValueChange={
                                          (itemValue,itemIndex)=>handleAccLevel(itemValue)
                                        }
                                        >
                                        <Picker.Item label="None" value="0" />
                                        <Picker.Item label="Totally Missed this concept" value="1" />
                                        <Picker.Item label="Did not remember and was hard to remember" value="2" />
                                        <Picker.Item label="Did not remember and was easy to remember" value="3" />
                                        <Picker.Item label="Remembered with serious effort" value="4" />
                                        <Picker.Item label="Remembered after a hesitation" value="5" />
                                        <Picker.Item label="Completely remembered" value="6" />
                                    </Picker>
                                  </View> 
                            </View>
                        </FlipCard>
                        <View style={{flexDirection:"row", marginTop: HEIGHT(24)}}> 
                            {
                                assignee == 0 ? (
                                  <View  style={{flexDirection: 'row',marginBottom: HEIGHT(18),}}>
                                      <View style={{width:WIDTH(120)}}></View>
                                  </View>
                                  ) :
                                  (
                                    <TouchableOpacity  style={{flexDirection: 'row',marginBottom: HEIGHT(18),}}
                                        onPress={() => {handlePrevClick()}}>
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
                            <View style={{alignItems:"center",justifyContent:"center",flex:1}}>
                            {
                                  (confidenceLevel !== null && isFlipped== true) ? (
                                            null
                                          ) :
                                      (
                                        <TouchableOpacity onPress={() => {handleFlip()}}
                                            style={{alignItems:"center",justifyContent:"center",marginVertical:WIDTH(18)}}>
                                            <Image
                                                style={{ width: WIDTH(50), height: WIDTH(50) }}
                                                resizeMode="contain"
                                                source={require("../assets/flip.png")}
                                                />
                                        </TouchableOpacity>
                                      )
                            }
                            </View>
                            {
                                assignee == currentQuestion.length-1 ? (
                                  <TouchableOpacity  style={{flexDirection: 'row',marginBottom: HEIGHT(18),marginLeft:'auto',}}
                                      onPress={() => {handleExitDeck()}}>
                                      <View style={{borderRadius: HEIGHT(10),backgroundColor: colors.primary,width:WIDTH(140)}}>                           
                                          <Text style={{paddingVertical: HEIGHT(10),paddingHorizontal: WIDTH(10),
                                              fontFamily: 'FuturaStd-Medium',
                                              justifyContent: 'flex-start',
                                              textAlign: 'center',fontSize: WIDTH(24),
                                              color: 'white'}}>Exit Deck</Text>
                                      </View>
                                  </TouchableOpacity>
                                  ) :
                                  (
                                    <TouchableOpacity  style={{flexDirection: 'row',marginBottom: HEIGHT(18),marginLeft:'auto',}}
                                        onPress={() => {handleNextClick()}}>
                                        <View style={{borderRadius: HEIGHT(10),backgroundColor: colors.primary,width:WIDTH(120)}}>                           
                                            <Text style={{paddingVertical: HEIGHT(10),
                                            paddingHorizontal: WIDTH(10),
                                                fontFamily: 'FuturaStd-Medium',
                                                justifyContent: 'flex-start',
                                                textAlign: 'center',fontSize: WIDTH(24),
                                                color: 'white'}}>Next</Text>
                                        </View>
                                    </TouchableOpacity>
                                  )      
                            }            
                        </View>
                </ScrollView>
                </View>


               
                </View>
              
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    hidden: {
      backfaceVisibility: "hidden",
    },
    card: {
      width: 200,
      height: 200,
    },
    back: {
      position: "absolute",
      top: 0,
    },
    cardItem: {
      width: "100%",
      height: "100%",
    },
    textInput: {
      fontSize: 18,
    },
  });
  