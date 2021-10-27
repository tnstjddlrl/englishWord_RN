import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
    Alert,
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
import { useRecoilState } from 'recoil';
import { atomGrade } from '../atom/atom';

const chwidth = Dimensions.get('screen').width;
const chheight = Dimensions.get('screen').height;

var interval;
var smallInterval;

const Question = () => {
    const navigation = useNavigation()

    const [timer, setTimer] = useState(300);
    const [secon, setSecon] = useState('00');

    const [smallTimer, setSmallTimer] = useState(5);
    const [redQuestion, setRedQuestion] = useState(getRandomInt(1, 6));

    const [touchBlockModal, setTouchBlockModal] = useState(false);

    const [currentPlay, setCurrentPlay] = useState(0);

    const [atGrade, setAtGrade] = useRecoilState(atomGrade); //학년

    var errorArray = ['감자', '고구마', '오이', '토마토', '정답']

    const [collect0, setCollect0] = useState('정답')

    const [collect1, setCollect1] = useState('')
    const [collect2, setCollect2] = useState('')
    const [collect3, setCollect3] = useState('')
    const [collect4, setCollect4] = useState('')
    const [collect5, setCollect5] = useState('')

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    const Questionrequest = async () => {
        console.log(id + pwd)
        await axios.get('https://hjong0108.cafe24.com/bbs/post.php', {
            params: {
                type: 'question',
                grade: 'test'
            },
        }).catch((err) => {
            console.log(err)
        }).then(async (res) => {
            console.log('리턴 : ' + res.data)
            if (res.data == '') {

            }
        })
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        for (var i = 0; i < 7; i++) {
            var random = Math.floor(Math.random() * (max - min)) + min;
            if (random !== redQuestion) {
                return random
            } else {
                // console.log('같은거!')
            }
        }
        return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
    }


    ///////////////////////////////////////////////////////////////////////////////////////////
    function intervalset() {
        return setInterval(() => { setTimer((res) => res - 1) }, 1002);
    };

    function smallIntervalset() {
        return setInterval(() => { setSmallTimer((res) => res - 1) }, 1002);
    };

    function AllClearInterval() {
        clearInterval(interval);
        clearInterval(smallInterval);

        interval = null;
        smallInterval = null;
    }

    useEffect(() => {
        randomCollect()
        interval = intervalset();
        smallInterval = smallIntervalset();

        return () => {
            AllClearInterval()
        }
    }, []);
    /////////////////////////////////////////////////////////////////////////////////////////
    function timerStopAndGo(setint) {
        setTouchBlockModal(true);

        AllClearInterval();

        setTimeout(() => {
            setRedQuestion(getRandomInt(1, 6));
            randomCollect()
            interval = intervalset();
            setSmallTimer(5);
            smallInterval = smallIntervalset();
            setTouchBlockModal(false);
            setCurrentPlay((rr) => rr + 1)
        }, setint);
    };

    function arrayselect() {
        var numbers = [];
        var pickNumbers = 5;

        for (var insertCur = 0; insertCur < pickNumbers; insertCur++) {
            numbers[insertCur] = Math.floor(Math.random() * 5) + 1;
            for (var searchCur = 0; searchCur < insertCur; searchCur++) {
                if (numbers[insertCur] == numbers[searchCur]) {
                    insertCur--;
                    break;
                }
            }
        }
        return numbers;
    }

    function randomCollect() {
        var array = arrayselect()

        setCollect1(errorArray[array[0] - 1])
        setCollect2(errorArray[array[1] - 1])
        setCollect3(errorArray[array[2] - 1])
        setCollect4(errorArray[array[3] - 1])
        setCollect5(errorArray[array[4] - 1])
    }

    function checkQuestion(collect) {
        timerStopAndGo(1002)
        if (collect == collect0) {
            console.log('정답입니다!')
        } else {
            console.log('오답입니다!')
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////
    function calculSecons() {
        if (timer <= 0) {
            clearInterval(interval);
            Alert.alert('시간종료!');
            setTimer(0);

            clearInterval(smallInterval)
        };
        if (String(Math.floor(timer % 60)).length == 1) {
            setSecon('0' + String(Math.floor(timer % 60)));
        } else {
            setSecon(String(Math.floor(timer % 60)));
        };
    }

    useEffect(() => {
        calculSecons();
    }, [timer]);
    ////////////////////////////////////////////////////////////////////////////////////////

    function smallTimerOut() {
        if (smallTimer <= 0) {//작은타이머 숫자 다 지나가면 실행됨
            timerStopAndGo(1002)
        };
    };
    useEffect(() => {
        smallTimerOut();
    }, [smallTimer]);


    return (
        <SafeAreaView style={{ flex: 1 }}>

            {/* 헤더시작 */}
            <View style={{ width: chwidth, height: 50, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>로고</Text>
                <TouchableWithoutFeedback onPress={() => {
                    navigation.goBack();
                }}>
                    <Text>뒤로가기</Text>
                </TouchableWithoutFeedback>
            </View>
            {/* 헤더 끝 */}

            {/* 개인정보 시작 */}
            <View style={{ width: chwidth, height: 50 }}>
                <Text>진행횟수 {currentPlay}회</Text>
            </View>
            {/* 개인정보 끝 */}

            {/* 십자 및 9개 문제상자 */}
            <View style={{ width: chwidth, alignItems: 'center' }}>

                <View>
                    <View style={{ borderWidth: 1, width: chwidth / 4, height: chheight / 10, alignItems: 'center', justifyContent: 'center', backgroundColor: redQuestion == 1 ? 'pink' : 'white' }}>
                        <Text>{redQuestion == 1 ? '정답' : '오답1'}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>

                    <View style={{ borderWidth: 1, width: chwidth / 4, height: chheight / 10, alignItems: 'center', justifyContent: 'center', backgroundColor: redQuestion == 2 ? 'pink' : 'white' }}>
                        <Text>{redQuestion == 2 ? '정답' : '오답2'}</Text>
                    </View>

                    <View style={{ borderWidth: 1, width: chwidth / 4, height: chheight / 10, alignItems: 'center', justifyContent: 'center', backgroundColor: redQuestion == 3 ? 'pink' : 'white' }}>
                        <Text>{redQuestion == 3 ? '정답' : '오답3'}</Text>
                    </View>

                    <View style={{ borderWidth: 1, width: chwidth / 4, height: chheight / 10, alignItems: 'center', justifyContent: 'center', backgroundColor: redQuestion == 4 ? 'pink' : 'white' }}>
                        <Text>{redQuestion == 4 ? '정답' : '오답4'}</Text>
                    </View>

                </View>

                <View>

                    <View style={{ borderWidth: 1, width: chwidth / 4, height: chheight / 10, alignItems: 'center', justifyContent: 'center', backgroundColor: redQuestion == 5 ? 'pink' : 'white' }}>
                        <Text>{redQuestion == 5 ? '정답' : '오답5'}</Text>
                    </View>

                </View>

            </View>
            {/* 문제상자 끝 */}

            {/* 타이머 시작 */}
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <View style={{ borderWidth: 1, width: chwidth - 40, height: 50, alignItems: 'center' }}>
                    <Text>{`${parseInt((timer % 3600) / 60)}:${secon} / ${Math.floor(smallTimer)}`}</Text>

                </View>
            </View>


            {/* 정답상자 시작 */}
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <TouchableWithoutFeedback onPress={() => {
                    console.log(collect1);
                    checkQuestion(collect1)
                }}>
                    <View style={{ borderWidth: 1, width: chwidth - 40, height: 50, alignItems: 'center' }}>
                        <Text>{collect1}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    console.log(collect2);
                    checkQuestion(collect2)
                }}>
                    <View style={{ borderWidth: 1, width: chwidth - 40, height: 50, alignItems: 'center' }}>
                        <Text>{collect2}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    console.log(collect3);
                    checkQuestion(collect3)
                }}>
                    <View style={{ borderWidth: 1, width: chwidth - 40, height: 50, alignItems: 'center' }}>
                        <Text>{collect3}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    console.log(collect4);
                    checkQuestion(collect4)
                }}>
                    <View style={{ borderWidth: 1, width: chwidth - 40, height: 50, alignItems: 'center' }}>
                        <Text>{collect4}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    console.log(collect5);
                    checkQuestion(collect5)
                }}>
                    <View style={{ borderWidth: 1, width: chwidth - 40, height: 50, alignItems: 'center' }}>
                        <Text>{collect5}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            {/* 정답상자 끝 */}


            <Modal visible={touchBlockModal} transparent={true}>
                <SafeAreaView style={{ flex: 1 }}>
                </SafeAreaView>
            </Modal>

        </SafeAreaView>
    )
}

export default Question;