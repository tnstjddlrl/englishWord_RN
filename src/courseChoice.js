import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    BackHandler,
    Dimensions,
    SafeAreaView,
    Text,
    TouchableWithoutFeedback,
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
                id: atId
            },
        }).catch((err) => {
            console.log(err)
        }).then(async (res) => {
            console.log('리턴 : ' + res.data);
            console.log(res.data.values)
            setCourseList(res.data.values)
        })
    }

    useEffect(() => {
        const backAction = () => {
            Alert.alert("앱 종료", "앱을 종료하시겠습니까?", [
                {
                    text: "취소",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "확인", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

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
            {/* 헤더시작 */}
            <View style={{ width: chwidth, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, padding: 10 }}>
                <TouchableWithoutFeedback onPress={() => {
                    // startBtn_click();
                }}>
                    <AutoHeightImage source={headerIcon} width={180}></AutoHeightImage>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    // setAtIsSaveWord(false)
                    navigation.navigate('로그인');
                }}>
                    <View style={{ backgroundColor: 'black', borderRadius: 30, width: 80, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white' }}>로그아웃</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            {/* 헤더 끝 */}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {/* <CourseBlockPush></CourseBlockPush> */}
                {courseList.map((course, index) => <CourseBlock key={index} course={course.course} />)}

            </View>
            <View style={{ height: 50 }}></View>
        </SafeAreaView>
    )
}

export default CourseChoice;