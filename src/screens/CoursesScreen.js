import React, { useEffect, useState } from 'react'
import { View, RefreshControl, StatusBar, Image, Text, FlatList } from 'react-native'
import {Header} from 'react-native-elements'
import * as Progress from 'react-native-progress'
import colors from '../config/colors'
import gstyles from '../config/styles'
import { WIDTH, HEIGHT } from '../config/utils'
import CourseCell from '../components/CourseCell'
import BackButton from '../components/BackButton'
import { useSelector, useDispatch } from 'react-redux'
// import {courses} from '../config/dummy'
import {coursesStudent} from '../config/api'
import {resetLogin} from '../redux/actions'

export default ({navigation}) => {
    const [courses, setCourses] = useState({courses:[], refreshing: false})
    const userInfo = useSelector(state=>state.userReducer.userInfo)
    const dispatch = useDispatch()
    const loadCourses = async () => {
        setCourses({courses: [], refreshing: true})
        const response = await coursesStudent(userInfo.id)
        if (response.status != 200) {
            dispatch(resetLogin())
            return
        }
        const courses = response.courses
        if (courses) {
            console.log('courses:', courses)
            setCourses({
                courses: courses,
                refreshing: false
            })
        } else {
            setCourses({
                courses: [],
                refreshing: false
            })
        }
    }
    useEffect(()=>{
        loadCourses()
    }, [])
    const handleRefresh = () => {
        if (userInfo) {
            loadCourses()
        }
    }
    return (
        <View style={gstyles.container}>
            <StatusBar backgroundColor={colors.primary}/>
            <Header
                backgroundColor={colors.primary}
                leftComponent={
                    <BackButton
                        onPress={()=>navigation.goBack()}
                    />
                }
                centerComponent={
                    <View style={{alignItems: 'center'}}>
                        <Text style={gstyles.headerlabel}>Courses</Text>
                    </View>
                }
                containerStyle={{borderBottomColor : 'black'}}
            />
            <FlatList
                style={{flex: 1, backgroundColor: 'white', paddingHorizontal: WIDTH(10), borderRadius: HEIGHT(10), marginBottom: HEIGHT(10)}}
                refreshing={courses.refreshing}
                refreshControl={<RefreshControl refreshing={courses.refreshing} colors={[colors.primary]} onRefresh={handleRefresh}/>}
                data={courses.courses}
                keyExtractor={(item, index) => ''+index}
                renderItem={props=><CourseCell {...props}/>}
            />
        </View>
    )
}