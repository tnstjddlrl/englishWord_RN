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
import { atomGrade, atomId } from '../atom/atom';

import { useNavigation } from '@react-navigation/core';
import axios from 'axios';

const chwidth = Dimensions.get('screen').width;
const chheight = Dimensions.get('screen').height;

var interval;
var smallInterval;

const Question = () => {
    const navigation = useNavigation()

    const [currentPlay, setCurrentPlay] = useState(0); //현재 횟수
    const [currentCollect, setCurrentCollect] = useState(0)

    const [arriveFirst, setArriveFirst] = useState(true)

    const [timer, setTimer] = useState(300);
    const [secon, setSecon] = useState('00');

    const [smallTimer, setSmallTimer] = useState(5);
    const [redQuestion, setRedQuestion] = useState(getRandomInt(1, 6, redQuestion));

    const [redQuestion_col, setRedQuestion_col] = useState(getRandomInt(1, 6, redQuestion_col));


    const [touchBlockModal, setTouchBlockModal] = useState(false);


    const [atGrade, setAtGrade] = useRecoilState(atomGrade); //학년
    const [atId, setAtId] = useRecoilState(atomId); //아이디


    const [errorArray, setErrorArray] = useState([])

    const [questionList, setQuscionList] = useState([])

    const [axQuestion, setAxQuestion] = useState([])
    const [axAnswer, setAxAnswer] = useState([])

    const [collect0, setCollect0] = useState('') //정답 보여주기용

    const [collect1, setCollect1] = useState('')    //
    const [collect2, setCollect2] = useState('')
    const [collect3, setCollect3] = useState('')
    const [collect4, setCollect4] = useState('')
    const [collect5, setCollect5] = useState('')    //오류보여주기 용

    const [collect0_kor, setCollect0_kor] = useState('') //정답 확인용


    const [bottom_collect1, setbottom_collect1] = useState('')    //
    const [bottom_collect2, setbottom_collect2] = useState('')
    const [bottom_collect3, setbottom_collect3] = useState('')
    const [bottom_collect4, setbottom_collect4] = useState('')
    const [bottom_collect5, setbottom_collect5] = useState('')

    // const [collect1_kor, setCollect1_kor] = useState('')
    // const [collect2_kor, setCollect2_kor] = useState('')
    // const [collect3_kor, setCollect3_kor] = useState('')
    // const [collect4_kor, setCollect4_kor] = useState('')
    // const [collect5_kor, setCollect5_kor] = useState('')

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    const Questionrequest = async () => {
        await axios.get('https://hjong0108.cafe24.com/bbs/post.php', {
            params: {
                type: 'new_course',
                grade: '고등학교1학년', //atGrade
                id: 'test', //atId
                cnt: 5,
            },
        }).catch((err) => {
            console.log(err)
        }).then((res) => {
            console.log('리턴 : ' + res.data);
            console.log(res.data);

            setAxAnswer(() => res.data.answers);
            setAxQuestion(() => res.data.questions);

        });
    };
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // do something
            Questionrequest()
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
    }, []);

    useEffect(() => {
        console.log('배열 값 변경완료');
        console.log(axQuestion);

        return () => {
            AllClearInterval();
        };
    }, [axAnswer, axQuestion]);

    function startBtn_click(params) {


        console.log('처음도착')
        if ((axQuestion !== []) && arriveFirst) {
            setArriveFirst(false);
            randomCollect(redQuestion);

            interval = intervalset();
            smallInterval = smallIntervalset();
        } else {
            Alert.alert('뭔가이상함')
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////

    function getRandomInt(min, max, res) {
        min = Math.ceil(min);
        max = Math.floor(max);

        for (var i = 0; i < 7; i++) {
            var random = Math.floor(Math.random() * (max - min)) + min;
            if (random !== res) {
                return random;
            } else {

            }
        }
        return Math.floor(Math.random() * (max - min)) + min;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////
    function intervalset() {
        return setInterval(() => { setTimer((res) => res - 1) }, 1001);
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


    /////////////////////////////////////////////////////////////////////////////////////////
    function timerStopAndGo(setint) {
        setTouchBlockModal(true);

        AllClearInterval();

        setTimeout(() => {
            var randomint = getRandomInt(1, 6, redQuestion);
            setRedQuestion(randomint);

            randomCollect(randomint)
            interval = intervalset();
            setSmallTimer(5);
            smallInterval = smallIntervalset();
            setTouchBlockModal(false);
            setCurrentPlay((rr) => rr + 1)
        }, setint);
    };


    function randomCollect(randomint) {

        if (currentPlay % 2 == 0) {
            var sortArray = shuffle(axQuestion)
            var sortErrorArray = shuffle(axAnswer)

            console.log('???????????????????????????????????')
            console.log(sortArray)

            setCollect0(sortArray[randomint - 1].Ko_name)
            setCollect0_kor(sortArray[randomint - 1].En_name)

            console.log(randomint)

            console.log(sortArray[randomint - 1].Ko_name)
            console.log(sortArray[randomint - 1].En_name)

            var bottomArray = [sortArray[randomint - 1].En_name, sortErrorArray[0].En_name, sortErrorArray[1].En_name, sortErrorArray[2].En_name, sortErrorArray[3].En_name]
            bottomArray = shuffle(bottomArray)

            setCollect1(sortArray[0].Ko_name)
            setCollect2(sortArray[1].Ko_name)
            setCollect3(sortArray[2].Ko_name)
            setCollect4(sortArray[3].Ko_name)
            setCollect5(sortArray[4].Ko_name)

            setbottom_collect1(bottomArray[0])
            setbottom_collect2(bottomArray[1])
            setbottom_collect3(bottomArray[2])
            setbottom_collect4(bottomArray[3])
            setbottom_collect5(bottomArray[4])

        } else {
            var sortArray = shuffle(axQuestion)
            var sortErrorArray = shuffle(axAnswer)

            console.log('???????????????????????????????????')
            console.log(sortArray)

            setCollect0(sortArray[randomint - 1].En_name)
            setCollect0_kor(sortArray[randomint - 1].Ko_name)

            var bottomArray = [sortArray[randomint - 1].Ko_name, sortErrorArray[0].Ko_name, sortErrorArray[1].Ko_name, sortErrorArray[2].Ko_name, sortErrorArray[3].Ko_name]
            bottomArray = shuffle(bottomArray)

            console.log(randomint)
            console.log(sortArray[randomint - 1].Ko_name)
            console.log(sortArray[randomint - 1].En_name)

            setCollect1(sortArray[0].En_name)
            setCollect2(sortArray[1].En_name)
            setCollect3(sortArray[2].En_name)
            setCollect4(sortArray[3].En_name)
            setCollect5(sortArray[4].En_name)

            setbottom_collect1(bottomArray[0])
            setbottom_collect2(bottomArray[1])
            setbottom_collect3(bottomArray[2])
            setbottom_collect4(bottomArray[3])
            setbottom_collect5(bottomArray[4])

        }
    }

    function shuffle(array = []) { return array.sort(() => Math.random() - 0.5); }

    function checkQuestion(collect) {
        timerStopAndGo(1002)
        if (collect == collect0_kor) {
            console.log(collect0_kor)
            console.log('정답입니다!')
            setCurrentCollect((rr) => rr + 1)
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
                <TouchableWithoutFeedback onPress={() => {
                    startBtn_click()
                }}>
                    <Text>로고</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    navigation.goBack();
                }}>
                    <Text>뒤로가기</Text>
                </TouchableWithoutFeedback>
            </View>
            {/* 헤더 끝 */}

            {/* 개인정보 시작 */}
            <View style={{ width: chwidth, height: 50, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>진행횟수 {currentPlay}회</Text>
                <Text>정답횟수 : {currentCollect}</Text>
                {(!isNaN(currentCollect / currentPlay) && !touchBlockModal) &&

                    <Text>정답률 {Math.floor((currentCollect / currentPlay) * 100)}%</Text>
                }

            </View>
            {/* 개인정보 끝 */}

            {/* 십자 및 9개 문제상자 */}
            {axAnswer !== [] &&
                <View style={{ width: chwidth, alignItems: 'center' }}>
                    <View>
                        <View style={{ borderWidth: 1, width: chwidth / 4, height: chheight / 10, alignItems: 'center', justifyContent: 'center', backgroundColor: redQuestion == 1 ? 'pink' : 'white' }}>
                            <Text>{collect1}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ borderWidth: 1, width: chwidth / 4, height: chheight / 10, alignItems: 'center', justifyContent: 'center', backgroundColor: redQuestion == 2 ? 'pink' : 'white' }}>
                            <Text>{collect2}</Text>
                        </View>

                        <View style={{ borderWidth: 1, width: chwidth / 4, height: chheight / 10, alignItems: 'center', justifyContent: 'center', backgroundColor: redQuestion == 3 ? 'pink' : 'white' }}>
                            <Text>{collect3}</Text>
                        </View>

                        <View style={{ borderWidth: 1, width: chwidth / 4, height: chheight / 10, alignItems: 'center', justifyContent: 'center', backgroundColor: redQuestion == 4 ? 'pink' : 'white' }}>
                            <Text>{collect4}</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{ borderWidth: 1, width: chwidth / 4, height: chheight / 10, alignItems: 'center', justifyContent: 'center', backgroundColor: redQuestion == 5 ? 'pink' : 'white' }}>
                            <Text>{collect5}</Text>
                        </View>
                    </View>
                </View>
            }
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
                    console.log(bottom_collect1);
                    checkQuestion(bottom_collect1)
                }}>
                    <View style={{ borderWidth: 1, width: chwidth - 40, height: 50, alignItems: 'center' }}>
                        <Text>{bottom_collect1}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    console.log(bottom_collect2);
                    checkQuestion(bottom_collect2)
                }}>
                    <View style={{ borderWidth: 1, width: chwidth - 40, height: 50, alignItems: 'center' }}>
                        <Text>{bottom_collect2}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    console.log(bottom_collect3);
                    checkQuestion(bottom_collect3)
                }}>
                    <View style={{ borderWidth: 1, width: chwidth - 40, height: 50, alignItems: 'center' }}>
                        <Text>{bottom_collect3}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    console.log(bottom_collect4);
                    checkQuestion(bottom_collect4)
                }}>
                    <View style={{ borderWidth: 1, width: chwidth - 40, height: 50, alignItems: 'center' }}>
                        <Text>{bottom_collect4}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    console.log(bottom_collect5);
                    checkQuestion(bottom_collect5)
                }}>
                    <View style={{ borderWidth: 1, width: chwidth - 40, height: 50, alignItems: 'center' }}>
                        <Text>{bottom_collect5}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            {/* 정답상자 끝 */}


            <Modal visible={touchBlockModal} transparent={true}>
                <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(128,128,128,0.5)' }}>
                </SafeAreaView>
            </Modal>


        </SafeAreaView>
    )
}

export default Question;