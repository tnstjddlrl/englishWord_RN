import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    useColorScheme,
    View,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { useRecoilState } from 'recoil';
import { atomGrade, atomId } from '../atom/atom';

const chwidth = Dimensions.get('screen').width


const headerIcon = require('../img/headerIcon.png')

const CourseChoice = () => {
    const navigation = useNavigation()

    const [courseList, setCourseList] = useState([])

    const [atId, setAtId] = useRecoilState(atomId); //아이디

    const [atGrade, setAtGrade] = useRecoilState(atomGrade); //학년

    const CourseRequest = async () => {
        await axios.get('https://hjong0108.cafe24.com/bbs/post.php', {
            params: {
                type: 'course_list',
                id: 'test'
            },
        }).catch((err) => {
            console.log(err)
        }).then(async (res) => {
            console.log('리턴 : ' + res.data);
            console.log(res.data.values)
            setCourseList(res.data.values)
            // if (res.data == '') {

            // }
        })
    }

    useEffect(() => {
        CourseRequest()

        console.log(atId)
    }, [])

    useEffect(() => {
        console.log(courseList);
    }, [courseList])

    function CourseBlock({ course }) {
        // console.log(course)
        return (
            <TouchableWithoutFeedback onPress={() => {
                setAtGrade(course)
                console.log(course)
                navigation.navigate('문제개수')
            }}>
                <View style={{ backgroundColor: 'rgb(53,93,194)', width: chwidth - 60, height: 50, borderRadius: 10, margin: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{course}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ width: '100%', }}>
                <AutoHeightImage source={headerIcon} width={180} style={{ margin: 10 }}></AutoHeightImage>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {/* <CourseBlockPush></CourseBlockPush> */}
                {courseList.map((course, index) => <CourseBlock key={index} course={course.course} />)}

                <CourseBlock course={'고등학교1학년'}></CourseBlock>
            </View>
            <View style={{ height: 50 }}></View>
        </SafeAreaView>
    )
}

export default CourseChoice;