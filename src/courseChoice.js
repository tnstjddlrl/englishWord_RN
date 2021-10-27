import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    useColorScheme,
    View,
} from 'react-native';
import { useRecoilState } from 'recoil';
import { atomGrade } from '../atom/atom';

const CourseChoice = () => {

    const [courseList, setCourseList] = useState([])
    const [atGrade, setAtGrade] = useRecoilState(atomGrade); //학년

    const CourseRequest = async () => {
        await axios.get('https://hjong0108.cafe24.com/bbs/post.php', {
            params: {
                type: 'course_list',
                grade: 'test'
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
    }, [])

    function CourseBlock({ course }) {
        // console.log(course)
        return (
            <TouchableWithoutFeedback onPress={() => {
                setAtGrade(course)
                console.log(course)
            }}>
                <View style={{ backgroundColor: 'skyblue', width: '80%', height: 50, borderRadius: 15, margin: 20, alignContent: 'center', justifyContent: 'center' }}>
                    <Text>{course}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    const CourseBlockPush = () => {
        var pp = []

        for (var i = 0; i < courseList.length; i++) {
            pp.push(<CourseBlock key={i} course={courseList[i].course}></CourseBlock>)
        }

        return (
            pp
        )
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {/* <CourseBlockPush></CourseBlockPush> */}
                {courseList.map((course, index) => <CourseBlock key={index} course={course.course} />)}

            </View>
        </SafeAreaView>
    )
}



export default CourseChoice;