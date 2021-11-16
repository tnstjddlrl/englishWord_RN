import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    BackHandler,
    Dimensions,
    Modal,
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

import SelectDropdown from 'react-native-select-dropdown'
import { constSelector, useRecoilState } from 'recoil';
import { atomGrade, atomId, atomIsSaveWord, atomSaveAnswer, atomSaveQuestion } from '../atom/atom';

const headerIcon = require('../img/headerIcon.png')

const chwidth = Dimensions.get('screen').width;
const chheight = Dimensions.get('screen').height;

const select_arrow = require('../img/select_arrow.png')

const countries = ["5개", "9개"]

var saveCnt = 0

const QuestionChoice = () => {
    const navigation = useNavigation()
    const [cnt, setCnt] = useState('')

    const [atId, setAtId] = useRecoilState(atomId); //아이디
    const [atGrade, setAtGrade] = useRecoilState(atomGrade); //학년

    const [atSaveAnswer, setAtSaveAnswer] = useRecoilState(atomSaveAnswer)
    const [atSaveQuestion, setAtSaveQuestion] = useRecoilState(atomSaveQuestion)
    const [atIsSaveWord, setAtIsSaveWord] = useRecoilState(atomIsSaveWord)

    const isSaveWord_Request = async () => {
        await axios.get('https://hjong0108.cafe24.com/bbs/post.php', {
            params: {
                type: 'request_course',
                id: atId,
                grade: atGrade
            },
        }).catch((err) => {
            console.log(err)
        }).then(async (res) => {
            console.log('리턴 : ' + res.data);
            console.log(res.data)

            if (res.data.result === 'save_course') {
                console.log(res.data.questions);
                console.log(res.data.answers);

                setAtSaveAnswer(res.data.answers)
                setAtSaveQuestion(res.data.questions)
                setAtIsSaveWord(true)
                saveCnt = res.data.questions.length;
                setTimeout(() => {
                    Alert.alert('기존에 저장된 문제가 있습니다.', '저장된 문제를 암기하시겠습니까?',
                        [
                            {
                                text: "취소",
                                onPress: () => {
                                    console.log("Cancel Pressed")
                                    setAtIsSaveWord(false)
                                },
                                style: "cancel"
                            },
                            { text: "확인", onPress: () => QuestionLenthAndNavigate() }
                        ])
                }, 500);
            } else {
                console.log('아무것도없음!')
            }
        })
    }

    useEffect(() => {
        if (atId != null && atGrade != null) {
            isSaveWord_Request()
        }
    }, [atId, atGrade])

    function QuestionLenthAndNavigate() {
        console.log(atSaveQuestion);
        console.log(saveCnt);
        if (saveCnt == 5) {
            navigation.navigate('문제풀이')
        } else if (saveCnt == 9) {
            navigation.navigate('문제풀이9')
        } else {
            Alert.alert('네트워크 오류가 발생하였습니다.', '앱이 재실행됩니다.')
            setTimeout(() => {
                console.log('앱재실행')
            }, 1500);
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // do something
            // Alert.alert('방문!')
            // isSaveWord_Request()
        });

        return unsubscribe;
    }, [navigation])

    useEffect(() => {
        const backAction = () => {
            // Alert.alert("앱 종료", "앱을 종료하시겠습니까?", [
            //     {
            //         text: "취소",
            //         onPress: () => null,
            //         style: "cancel"
            //     },
            //     { text: "확인", onPress: () => BackHandler.exitApp() }
            // ]);
            navigation.goBack();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ width: '100%', }}>
                <AutoHeightImage source={headerIcon} width={175} style={{ margin: 10 }}></AutoHeightImage>
            </View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                <Text style={{ marginTop: -50, fontSize: 25, letterSpacing: -1.5, fontFamily: 'Jua-Regular', color: 'black' }}>{atGrade}</Text>

                <View style={{ width: chwidth - 40, backgroundColor: 'rgb(230,230,230)', borderRadius: 10, marginTop: 30, alignItems: 'center', padding: 40 }}>

                    <View style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, letterSpacing: -1, marginRight: 15, color: 'black' }}>단어갯수</Text>

                        <SelectDropdown
                            data={countries}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                                setCnt(selectedItem)
                            }}
                            defaultButtonText={"선택"}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}

                            buttonStyle={{
                                width: 100,
                                height: 35,
                                backgroundColor: 'white',
                                borderRadius: 3,
                                borderWidth: 1,
                                borderColor: 'black',
                            }}

                            buttonTextStyle={{ textAlign: "left", fontSize: 15, color: 'black', marginLeft: 0 }}

                            renderDropdownIcon={() => {
                                return (
                                    <AutoHeightImage source={select_arrow} width={15}></AutoHeightImage>)
                            }}
                        />
                    </View>

                    <TouchableWithoutFeedback onPress={() => {
                        if (cnt === '5개') {
                            navigation.navigate('문제풀이')
                        } else if (cnt === '9개') {
                            navigation.navigate('문제풀이9')
                        } else {
                            Alert.alert('갯수를 선택해주세요.')
                        }
                    }}>
                        <View style={{ width: chwidth - 80, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(53,93,194)' }}>
                            <Text style={{ fontSize: 20, color: 'white', margin: 13, fontFamily: 'Jua-Regular' }}>시작</Text>
                        </View>
                    </TouchableWithoutFeedback>

                </View>

            </View>

            <View style={{ height: 70 }}>

            </View>


        </SafeAreaView>
    )
}

export default QuestionChoice;