import {NetworkInfo} from 'react-native-network-info'

import store from '../redux/store'

const baseUrl = 'https://apimvp.reel-lms.com/'
// const baseUrl = 'https://neoapi.reel-lms.com/'

// https://neoapi.reel-lms.com/
const loginUrl = baseUrl+'login'
const logoutUrl = baseUrl+'logout'
const forgetPasswordUrl = baseUrl+'forgetPassword'
const coursesStudentUrl = baseUrl+'coursesStudentPath'
const gettingQuizStatusIdUrl = baseUrl+'gettingQuizStatusId'
const startQuizTakingUrl = baseUrl+'startQuizTaking'
const updateQuizByQuizIdUrl = baseUrl+'updateQuizByQuizId'
const studentDashboardStatsUrl = baseUrl+'studentDashboardStats'
const displayScoreCardUrl = baseUrl+'displayScoreCard'
const getAllDecksUrl = baseUrl+'getAllCardsAndDecks'
const practiseDeckUrl = baseUrl+'getCardsInDeck'
const updateCardConf = baseUrl+'updateCardConfidence'
const updateCardAccu  = baseUrl+'updateCardAccuracy'
const getAllQuizes = baseUrl +'getAllQuizesByUserId'

export const login = async (email, password) => {
    console.log(password);
    const ipv4Address = await NetworkInfo.getIPV4Address()
    const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
        },
        body: JSON.stringify({
            email, password, ipv4Address
        })
    })
    const responseData = await response.json()
    // console.log("responseDT",responseData);
    if (response.status == 200 && responseData.length > 0) {
        const userInfo = responseData[0]
        return {
            userInfo, status: response.status
        }
    }
    return {
        ...responseData, status: response.status
    }
}

export const updateCardConfidence = async ( cardId,confidence) => {
    
    const studentId = store.getState().userReducer.userInfo.id
    const ipv4Address = await NetworkInfo.getIPV4Address()
    const token = store.getState().userReducer.userInfo.sessionToken
   
    const body = {cardId, confidence, studentId,ipv4Address }
    const response =  await fetch(updateCardConf, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ipv4address : ipv4Address,
            'userid': studentId,
        },
    })
    const responseData = await response.json()
    // console.log('response:%%%%%%%%%%%%%%%%', responseData)
    return {
        message: response.message,
        ...responseData
    }
}

export const updateCardAccuracy = async ( cardId,accuracy) => {
    
    const studentId = store.getState().userReducer.userInfo.id
    const ipv4Address = await NetworkInfo.getIPV4Address()
    const token = store.getState().userReducer.userInfo.sessionToken
   
    const body = {cardId, accuracy, studentId,ipv4Address }
    const response =  await fetch(updateCardAccu, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ipv4address : ipv4Address,
            'userid': studentId,
        },
    })
    const responseData = await response.json()
    // console.log('response:%%%%%%%%%%%%%%%%', responseData)
    return {
        message: response.message,
        ...responseData
    }
}


export const logout = async userId => {
    return await fetch(`${logoutUrl}?userId=${userId}`).json()
}

export const forgetPassword = async email => {
    const formData = new FormData()
    formData.append('email', email)
    const response =  await fetch(forgetPasswordUrl, {
        method: 'POST',
        body: formData
    })
    const responseJson = await response.json()
    console.log(responseJson);
    if (response.status == 200) {
        return {
            status: 200,
            message: responseJson.message          
        }
    }
    return {
        status: response.status, ...responseJson
    }
   
}

export const coursesStudent = async userId => {
    const token = store.getState().userReducer.userInfo.sessionToken
    const ipv4Address = await NetworkInfo.getIPV4Address()
    const studentId = store.getState().userReducer.userInfo.id
    const response = await fetch(`${coursesStudentUrl}?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            ipv4address : ipv4Address,
            'userid': studentId,
            'Authorization': `Bearer ${token}`
        }
    })
   
    const responseJson = await response.json()
    console.log(responseJson)
    if (response.status == 200) {
        return {
            status: 200,
            courses: responseJson.courses,
            // activity:  responseJson.activity
        }
    }
    return {
        status: response.status, ...responseJson
    }
}

export const studentDashboardStats = async studentId => {
    const token = store.getState().userReducer.userInfo.sessionToken
    const ipv4Address = await NetworkInfo.getIPV4Address()
    const response = await fetch(`${studentDashboardStatsUrl}?studentId=${studentId}&b2b=1`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            ipv4address : ipv4Address,
            'userid': studentId,
            'Authorization': `Bearer ${token}`
        }
    })
    const responseJson = await response.json()
    // console.log("responseJson in studentDashboardStats",responseJson);

    if (response.status == 200) {
        return {
            status: 200,
            // courses: responseJson.courses,
            activity:  responseJson.activity
        }
    }
    return {
        status: response.status, ...responseJson
    }
}

export const getAllQuizesStatus = async (userId,startFrom) => {
    const token = store.getState().userReducer.userInfo.sessionToken
    const ipv4Address = await NetworkInfo.getIPV4Address()
    console.log("userId",userId);
    const response = await fetch(`${getAllQuizes}?userId=${userId}&startFrom=${startFrom}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            ipv4address : ipv4Address,
            'userid': userId,
            'Authorization': `Bearer ${token}`
        }
    })
    const responseJson = await response.json()
    // console.log("responseJson in getAllQuizesStatus",responseJson);

    if (response.status == 200) {
        return {
            status: 200,
            // courses: responseJson.courses,
            results:  responseJson.results
        }
    }
    return {
        status: response.status, ...responseJson
    }
}

// export const updateQuizByQuizId = async (answer, confidence, flag, hightlightText, isMarked, questionId, quizId, strikeThrouhText, timeSpent, nextOrPreviousQId) => {

export const practiseDeck = async (studentId,set_Id,sharedId) => {
    const token = store.getState().userReducer.userInfo.sessionToken
    const ipv4Address = await NetworkInfo.getIPV4Address()
    
    var isSharedDeck;
    if(sharedId == 1)
    {
        isSharedDeck= true
    }
    else{
        isSharedDeck= false
    }
    const mode = 'answer'
    const response = await fetch(`${practiseDeckUrl}?mode=${mode}&setId=${set_Id}&studentId=${studentId}&isSharedDeck=${isSharedDeck}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            ipv4address : ipv4Address,
            'userid': studentId,
            'Authorization': `Bearer ${token}`
        }
    })
    const responseJson = await response.json()
    // console.log("responseJson in practiseDeck",responseJson);

    if (response.status == 200) {
        // console.log("responseJson in practiseDeck",responseJson);
        return {
            status: 200,
            // courses: responseJson.courses,
            activity:  responseJson.CardsInDeck
        }
    }
    return {
        status: response.status, ...responseJson
    }
}

export const getAllDeckStatus = async studentId => {
    const token = store.getState().userReducer.userInfo.sessionToken
    const ipv4Address = await NetworkInfo.getIPV4Address()
    // const studentId = store.getState().userReducer.userInfo.id

    const response = await fetch(`${getAllDecksUrl}?studentId=${studentId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            ipv4address : ipv4Address,
            'userid': studentId,
            'Authorization': `Bearer ${token}`
        }
    })
    const responseJson = await response.json()
    if (response.status == 200) {
        // console.log("responseJson in getAllDeckStatus**",responseJson);
        return {
            status: 200,
            // courses: responseJson.courses,
            activity:  responseJson.cardsAndDecks
        }
    }
    return {
        status: response.status, ...responseJson
    }
}

export const initiateQuiz = async quizId => {
    const token = store.getState().userReducer.userInfo.sessionToken
    const ipv4Address = await NetworkInfo.getIPV4Address()
    const studentId = store.getState().userReducer.userInfo.id
    const response = await fetch(`${gettingQuizStatusIdUrl}?quizId=${quizId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            ipv4address : ipv4Address,
            'userid': studentId,
        },
        // body: formData
    })
    // console.log('response:', response)
    const responseJson = await response.json()
    // console.log('responseJson:', Object.keys(responseJson.firstQuestion))
    if (response.status == 200) {
        return {
            status: 200, ...responseJson[0]
            // courses: responseJson.courses,
            // activity:  responseJson.activity
        }
    }
    return {
        status: response.status, ...responseJson
    }
}

export const startQuizTaking = async quizId => {
    const token = store.getState().userReducer.userInfo.sessionToken
    const ipv4Address = await NetworkInfo.getIPV4Address()
    const studentId = store.getState().userReducer.userInfo.id
    // const formData = new FormData()
    // formData.append('quizId', quizId)
    console.log(quizId);
    const response = await fetch(`${startQuizTakingUrl}?quizId=${quizId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            ipv4address : ipv4Address,
            'userid': studentId,
        },
        // body: formData
    })
    //  console.log('response:', response)
    const responseJson = await response.json()
    // console.log('responseJson:', Object.keys(responseJson.firstQuestion))
    if (response.status == 200) {
        return {
            status: 200,
            firstQuestion: responseJson.firstQuestion,
            sync: responseJson.sync,
            // courses: responseJson.courses,
            // activity:  responseJson.activity
        }
    }
    return {
        status: response.status, ...responseJson
    }
}

export const updateQuizByQuizId = async (answer, confidence, flag, hightlightText, isMarked, questionId, quizId, strikeThrouhText, timeSpent, nextOrPreviousQId) => {
    const token = store.getState().userReducer.userInfo.sessionToken
    const ipv4Address = await NetworkInfo.getIPV4Address()
    const studentId = store.getState().userReducer.userInfo.id
    const formData = new FormData()
    formData.append('answer', answer)
    formData.append('confidence', confidence)
    formData.append('flag', flag)
    formData.append('hightlightText', hightlightText)
    formData.append('isMarked', isMarked)
    formData.append('questionId', questionId)
    formData.append('quizId', quizId)
    formData.append('strikeThrouhText', strikeThrouhText)
    formData.append('timeSpent', timeSpent)
    formData.append('updateAt', new Date().toISOString())
    formData.append('nextOrPreviousQId', nextOrPreviousQId)
    const body = {
        answer, confidence, flag, hightlightText, isMarked, questionId, quizId, strikeThrouhText, timeSpent, updateAt: new Date().toISOString(), nextOrPreviousQId
    }
     console.log('formData Submit:', formData)
    console.log('updateQuizByQuizId data:', body)
    const response =  await fetch(updateQuizByQuizIdUrl, {
        method: 'POST',
        // body: formData,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            // 'accept': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': `Bearer ${token}`,
            ipv4address : ipv4Address,
            'userid': studentId,
        },
    })
    // console.log('response:%%%%%%%%%%%%%%%%', response)
    const responseData = await response.json()
    return {
        status: response.status,
        ...responseData
    }
}


export const displayScoreCard = async quizId => {
    console.log('Quiz Id:'+quizId);
    const token = store.getState().userReducer.userInfo.sessionToken
    const ipv4Address = await NetworkInfo.getIPV4Address()
    const studentId = store.getState().userReducer.userInfo.id
    const fetchDisplayScoreCard = `${displayScoreCardUrl}?quizId=${quizId}&studentId=${studentId}`
    // console.log('fetchDisplayScoreCard:', fetchDisplayScoreCard)
    const response = await fetch(fetchDisplayScoreCard, {
        method: 'GET',
        headers: {
            // 'Content-Type': 'application/json',
            // 'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': `Bearer ${token}`,
            ipv4address : ipv4Address,
            'userid': studentId,
        },
        // body: formData
    })
    const responseJson = await response.json()
    // console.log('responseJson:', Object.keys(responseJson.firstQuestion))
    // console.log('responseJson:', responseJson)
    if (response.status == 200) {
        return {
            status: 200, ...responseJson
            // courses: responseJson.courses,
            // activity:  responseJson.activity
        }
    }
    return {
        status: response.status, ...responseJson
    }
}