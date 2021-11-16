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
import { atomAxAnswer, atomAxQuestion, atomGrade, atomId, atomIsSaveWord, atomSaveAnswer, atomSaveQuestion } from '../atom/atom';

import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import AutoHeightImage from 'react-native-auto-height-image';

const chwidth = Dimensions.get('screen').width;
const chheight = Dimensions.get('screen').height;

const headerIcon = require('../img/headerIcon.png');
const person = require('../img/person.png');


var interval;
var smallInterval;
var isStop;

const Question = () => {
    const navigation = useNavigation()

    const [isStartPlay, setIsStartPlay] = useState(false) //시작했는지 판별용

    const [isFinish, setIsFinish] = useState(false) //끝났는지 판별용

    const [currentPlay, setCurrentPlay] = useState(0); //현재 횟수
    const [currentCollect, setCurrentCollect] = useState(0) //맞은횟수

    const [arriveFirst, setArriveFirst] = useState(true)

    // const [isStop, setIsStop] = useState(false) //stopandgo 부를때 true로 바꾸어짐, 여러번 함수 호출되는거 방지용

    const [timer, setTimer] = useState(3);
    const [secon, setSecon] = useState('00'); //큰타이머

    const [smallTimer, setSmallTimer] = useState(5);
    const [redQuestion, setRedQuestion] = useState(getRandomInt(1, 6, redQuestion));

    const [redQuestion_col, setRedQuestion_col] = useState(getRandomInt(1, 6, redQuestion_col));


    const [touchBlockModal, setTouchBlockModal] = useState(false);


    const [atGrade, setAtGrade] = useRecoilState(atomGrade); //학년
    const [atId, setAtId] = useRecoilState(atomId); //아이디

    const [userName, setUserName] = useState('')
    const [userGrade, setUserGrade] = useState('')

    const [atAxQuestion, setAtAxQuestion] = useRecoilState(atomAxQuestion)
    const [atAxAnswer, setAtAxAnswer] = useRecoilState(atomAxAnswer)

    const [atSaveAnswer, setAtSaveAnswer] = useRecoilState(atomSaveAnswer)
    const [atSaveQuestion, setAtSaveQuestion] = useRecoilState(atomSaveQuestion)
    const [atIsSaveWord, setAtIsSaveWord] = useRecoilState(atomIsSaveWord)

    const [errorArray, setErrorArray] = useState([])

    const [questionList, setQuscionList] = useState([])

    const [axQuestion, setAxQuestion] = useState([])
    const [axAnswer, setAxAnswer] = useState([])

    const [cc1, setCc1] = useState('e')
    const [cc2, setCc2] = useState('e')
    const [cc3, setCc3] = useState('e')
    const [cc4, setCc4] = useState('e')
    const [cc5, setCc5] = useState('e')


    const [collect1, setCollect1] = useState('')    //
    const [collect2, setCollect2] = useState('')
    const [collect3, setCollect3] = useState('')
    const [collect4, setCollect4] = useState('')
    const [collect5, setCollect5] = useState('')    //상단 정답 및 오류보여주기 용
    const [collect1_kor, setCollect1_kor] = useState('')
    const [collect2_kor, setCollect2_kor] = useState('')
    const [collect3_kor, setCollect3_kor] = useState('')
    const [collect4_kor, setCollect4_kor] = useState('')
    const [collect5_kor, setCollect5_kor] = useState('')


    const [collect0, setCollect0] = useState('') //정답 보여주기용
    const [collect0_kor, setCollect0_kor] = useState('') //정답 확인용


    const [bottom_collect1, setbottom_collect1] = useState('')    //
    const [bottom_collect2, setbottom_collect2] = useState('')
    const [bottom_collect3, setbottom_collect3] = useState('')
    const [bottom_collect4, setbottom_collect4] = useState('')
    const [bottom_collect5, setbottom_collect5] = useState('')


    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    const Questionrequest = async () => {
        await axios.get('https://hjong0108.cafe24.com/bbs/post.php', {
            params: {
                type: 'new_course',
                grade: '고등학교1학년', //atGrade
                id: atId, //atId
                cnt: 5,
            },
        }).catch((err) => {
            console.log(err)
        }).then((res) => {
            console.log('리턴 : ' + res.data);
            console.log(res.data);

            if (res.data == 'course_full') {
                // Alert.alert('문제를 전부 제공하였습니다.')
                console.log('??')
                resetCourse().then(() => {
                    Questionrequest()
                })

            } else {
                setAxAnswer(res.data.answers);
                setAxQuestion(res.data.questions);
            }
        });
    };

    const resetCourse = async () => {
        await axios.get('https://hjong0108.cafe24.com/bbs/post.php', {
            params: {
                type: 'course_reset',
                grade: '고등학교1학년',
                id: 'test', //atId
            },
        }).catch((err) => {
            console.log(err)
        }).then((res) => {
            console.log('리턴 : ' + res.data);
            console.log(res.data);
        });
    };

    const userInform = async () => {
        await axios.get('https://hjong0108.cafe24.com/bbs/post.php', {
            params: {
                type: 'information',
                id: 'test', //atId
            },
        }).catch((err) => {
            console.log(err)
        }).then((res) => {
            console.log('리턴 : ' + res.data);
            console.log(res.data);
            var rr = res.data
            setUserName(rr.split('/')[0])
            setUserGrade(rr.split('/')[1])
        });
    };
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // do something
            console.log('포커스');
            console.log(atIsSaveWord)

            setCurrentCollect(0)
            setCurrentPlay(0)
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
    }, []);

    useEffect(() => {
        console.log('배열 값 변경완료');
        console.log(axQuestion);
        if (axQuestion.length > 0) {
            setUp()
            isEnKo(redQuestion);
        }
        return () => {
            AllClearInterval();
        };
    }, [axAnswer, axQuestion]);

    function startBtn_click(params) {
        // isEnKo(redQuestion)

        setTimer(180)
        setSmallTimer(5)
        if (atIsSaveWord) {
            setAxAnswer(atSaveAnswer);
            setAxQuestion(atSaveQuestion);
            userInform()
        } else {
            Questionrequest()
            userInform()
        }

        setTimeout(() => {
            console.log('처음도착')
            interval = intervalset();
            smallInterval = smallIntervalset();

            setIsStartPlay(true)
        }, 500);
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
    function resetEnKo(params) {
        setCc1('e')
        setCc2('e')
        setCc3('e')
        setCc4('e')
        setCc5('e')
    }


    function setUp(params) {
        var array = []
        array = axQuestion

        setCollect1(array[0].En_name);
        setCollect2(array[1].En_name);
        setCollect3(array[2].En_name);
        setCollect4(array[3].En_name);
        setCollect5(array[4].En_name);
        setCollect1_kor(array[0].Ko_name);
        setCollect2_kor(array[1].Ko_name);
        setCollect3_kor(array[2].Ko_name);
        setCollect4_kor(array[3].Ko_name);
        setCollect5_kor(array[4].Ko_name);
    }


    function timerStopAndGo(setint) {
        if (!isStop) {
            isStop = true
            setTouchBlockModal(true);
            setCurrentPlay((rr) => rr + 1);

            AllClearInterval();

            setTimeout(() => {
                var randomint = getRandomInt(1, 6, redQuestion);
                setRedQuestion(randomint);

                isEnKo(randomint)
                interval = intervalset();
                setSmallTimer(5);
                smallInterval = smallIntervalset();
                setTouchBlockModal(false);
                isStop = false
            }, setint);
        } else {
            console.log('중복 호출!');
        }
    };

    function isEnKo(randomint) {
        switch (randomint) {
            case 1:
                if (cc1 === 'e') {
                    randomCollect(randomint, true)
                } else {
                    randomCollect(randomint, false)
                }
                break;
            case 2:
                if (cc2 === 'e') {
                    randomCollect(randomint, true)
                } else {
                    randomCollect(randomint, false)
                }
                break;
            case 3:
                if (cc3 === 'e') {
                    randomCollect(randomint, true)
                } else {
                    randomCollect(randomint, false)
                }
                break;
            case 4:
                if (cc4 === 'e') {
                    randomCollect(randomint, true)
                } else {
                    randomCollect(randomint, false)
                }
                break;
            case 5:
                if (cc5 === 'e') {
                    randomCollect(randomint, true)
                } else {
                    randomCollect(randomint, false)
                }
                break;
            default:
                break;
        }
    }


    function randomCollect(randomint, isen) {

        if (!isen) {
            var sortArray = axQuestion;
            var sortErrorArray = shuffle(axAnswer);

            console.log('???????????????????????????????????');
            console.log(sortArray);

            setCollect0(sortArray[randomint - 1].Ko_name);
            setCollect0_kor(sortArray[randomint - 1].En_name);

            console.log(randomint);

            console.log(sortArray[randomint - 1].Ko_name);
            console.log(sortArray[randomint - 1].En_name);

            var bottomArray = [sortArray[randomint - 1].En_name, sortErrorArray[0].En_name, sortErrorArray[1].En_name, sortErrorArray[2].En_name, sortErrorArray[3].En_name]
            bottomArray = shuffle(bottomArray)

            setbottom_collect1(bottomArray[0]);
            setbottom_collect2(bottomArray[1]);
            setbottom_collect3(bottomArray[2]);
            setbottom_collect4(bottomArray[3]);
            setbottom_collect5(bottomArray[4]);

        } else {
            var sortArray = axQuestion
            var sortErrorArray = shuffle(axAnswer)

            console.log('???????????????????????????????????')
            console.log(sortArray)

            setCollect0(sortArray[randomint - 1].En_name);
            setCollect0_kor(sortArray[randomint - 1].Ko_name);

            var bottomArray = [sortArray[randomint - 1].Ko_name, sortErrorArray[0].Ko_name, sortErrorArray[1].Ko_name, sortErrorArray[2].Ko_name, sortErrorArray[3].Ko_name]
            bottomArray = shuffle(bottomArray)

            console.log(randomint);
            console.log(sortArray[randomint - 1].Ko_name);
            console.log(sortArray[randomint - 1].En_name);

            setbottom_collect1(bottomArray[0]);
            setbottom_collect2(bottomArray[1]);
            setbottom_collect3(bottomArray[2]);
            setbottom_collect4(bottomArray[3]);
            setbottom_collect5(bottomArray[4]);
        }
    }

    function shuffle(array = []) { return array.slice().sort(() => Math.random() - 0.5); }

    function checkQuestion(collect) {
        timerStopAndGo(1002)
        if (collect == collect0_kor || collect == collect0) {
            console.log(collect0_kor)
            console.log('정답입니다!')
            setCurrentCollect((rr) => rr + 1)

            switch (redQuestion) {
                case 1:
                    if (cc1 == 'e') {
                        setCc1('k')
                    } else {
                        setCc1('e')
                    }
                    break;
                case 2:
                    if (cc2 == 'e') {
                        setCc2('k')
                    } else {
                        setCc2('e')
                    }
                    break;
                case 3:
                    if (cc3 == 'e') {
                        setCc3('k')
                    } else {
                        setCc3('e')
                    }
                    break;
                case 4:
                    if (cc4 == 'e') {
                        setCc4('k')
                    } else {
                        setCc4('e')
                    }
                    break;
                case 5:
                    if (cc5 == 'e') {
                        setCc5('k')
                    } else {
                        setCc5('e')
                    }
                    break;
                default:
                    break;
            }

        } else {
            console.log('오답입니다!')
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////
    function calculSecons() {
        if (timer <= 0) {
            clearInterval(interval);
            // Alert.alert('시간종료!');
            setIsFinish(true)
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
            setTouchBlockModal(true)
            timerStopAndGo(1002)
        };
    };
    useEffect(() => {
        smallTimerOut();
    }, [smallTimer]);

    function errorDataCalcul(params) {
        var tt = Math.floor(((currentPlay - currentCollect) / currentPlay) * 100)
        if (isNaN(tt)) {
            return ('0')
        } else {
            return (tt)
        }
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

            {/* 헤더시작 */}
            <View style={{ width: chwidth, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, padding: 10 }}>
                <TouchableWithoutFeedback onPress={() => {
                    // startBtn_click();
                }}>
                    <AutoHeightImage source={headerIcon} width={150}></AutoHeightImage>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    setAtIsSaveWord(false)
                    navigation.goBack();
                }}>
                    <View style={{ backgroundColor: 'black', borderRadius: 30, width: 60, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white' }}>종료</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            {/* 헤더 끝 */}

            {/* 개인정보 시작 */}
            <View style={{ width: chwidth, justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                <View style={{ width: chwidth - 40, borderWidth: 1, borderRadius: 5, padding: 10, borderColor: '#cccccc' }}>
                    <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'center' }}>
                        <AutoHeightImage source={person} width={23}></AutoHeightImage>
                        <Text style={{ marginLeft: 5, fontSize: 15, fontWeight: 'bold', color: 'black' }}>{userName} {userGrade}</Text>
                    </View>
                    <Text>진행횟수 - {currentPlay}회 / 오답률 {errorDataCalcul()}%</Text>
                </View>
            </View>
            {/* 개인정보 끝 */}

            {/* 십자 및 9개 문제상자 */}
            <View style={{ width: chwidth, alignItems: 'center', marginTop: 10 }}>
                <View style={{ marginBottom: 2 }}>
                    <View style={{ width: chwidth / 3.5, height: chheight / 11, alignItems: 'center', justifyContent: 'center', backgroundColor: redQuestion == 1 ? 'rgb(94,131,222)' : 'rgb(238,248,244)', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>{cc1 === 'e' ? collect1 : collect1_kor}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                    <View style={{ width: chwidth / 3.5, height: chheight / 11, alignItems: 'center', justifyContent: 'center', backgroundColor: redQuestion == 2 ? 'rgb(94,131,222)' : 'rgb(238,248,244)', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, marginRight: 2 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>{cc2 === 'e' ? collect2 : collect2_kor}</Text>
                    </View>

                    <View style={{ width: chwidth / 3.5, height: chheight / 11, alignItems: 'center', justifyContent: 'center', backgroundColor: redQuestion == 3 ? 'rgb(94,131,222)' : 'rgb(238,248,244)', marginRight: 2 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>{cc3 === 'e' ? collect3 : collect3_kor}</Text>
                    </View>

                    <View style={{ width: chwidth / 3.5, height: chheight / 11, alignItems: 'center', justifyContent: 'center', backgroundColor: redQuestion == 4 ? 'rgb(94,131,222)' : 'rgb(238,248,244)', borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>{cc4 === 'e' ? collect4 : collect4_kor}</Text>
                    </View>
                </View>

                <View>
                    <View style={{ width: chwidth / 3.5, height: chheight / 11, alignItems: 'center', justifyContent: 'center', backgroundColor: redQuestion == 5 ? 'rgb(94,131,222)' : 'rgb(238,248,244)', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>{cc5 === 'e' ? collect5 : collect5_kor}</Text>
                    </View>
                </View>
            </View>
            {/* 문제상자 끝 */}

            {/* 타이머 시작 */}
            <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 10 }}>
                {isStartPlay ?
                    <View style={{ width: chwidth - 40, height: 50, alignItems: 'center' }}>
                        <Text style={{ color: 'red', fontWeight: 'bold' }}>타이머 {`${parseInt((timer % 3600) / 60)}:${secon} / ${Math.floor(smallTimer)}`}</Text>
                    </View>
                    :
                    <TouchableWithoutFeedback onPress={() => { startBtn_click() }}>
                        <View style={{ width: 200, padding: 10, borderRadius: 20, backgroundColor: 'rgb(94,131,222)', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                            <Text style={{ color: 'white', fontFamily: 'Jua-Regular', fontSize: 20 }}>시작</Text>
                        </View>
                    </TouchableWithoutFeedback>
                }

            </View>

            {/* 정답상자 시작 */}
            <View style={{ alignItems: 'center', marginTop: 5, flex: 1, }}>
                <TouchableWithoutFeedback onPress={() => {
                    if (isStartPlay) {
                        if (!touchBlockModal || smallTimer === 0) {
                            console.log(bottom_collect1);
                            checkQuestion(bottom_collect1);
                        }
                    } else {
                        Alert.alert('먼저 시작버튼을 눌러주세요!')
                    }
                }}>
                    <View style={{ borderRadius: 10, width: chwidth - 40, height: 50, maxHeight: '15%', marginBottom: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(245,245,245)' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>{bottom_collect1}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {

                    if (isStartPlay) {
                        if (!touchBlockModal || smallTimer === 0) {
                            console.log(bottom_collect2);
                            checkQuestion(bottom_collect2);
                        }
                    } else {
                        Alert.alert('먼저 시작버튼을 눌러주세요!')
                    }


                }}>
                    <View style={{ borderRadius: 10, width: chwidth - 40, height: 50, maxHeight: '15%', marginBottom: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(245,245,245)' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>{bottom_collect2}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {

                    if (isStartPlay) {
                        if (!touchBlockModal || smallTimer === 0) {
                            console.log(bottom_collect3);
                            checkQuestion(bottom_collect3);
                        }
                    } else {
                        Alert.alert('먼저 시작버튼을 눌러주세요!')
                    }
                }}>
                    <View style={{ borderRadius: 10, width: chwidth - 40, height: 50, maxHeight: '15%', marginBottom: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(245,245,245)' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>{bottom_collect3}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {

                    if (isStartPlay) {
                        if (!touchBlockModal || smallTimer === 0) {
                            console.log(bottom_collect4);
                            checkQuestion(bottom_collect4);
                        }
                    } else {
                        Alert.alert('먼저 시작버튼을 눌러주세요!')
                    }
                }}>
                    <View style={{ borderRadius: 10, width: chwidth - 40, height: 50, maxHeight: '15%', marginBottom: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(245,245,245)' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>{bottom_collect4}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {

                    if (isStartPlay) {
                        if (!touchBlockModal || smallTimer === 0) {
                            console.log(bottom_collect5);
                            checkQuestion(bottom_collect5);
                        }

                    } else {
                        Alert.alert('먼저 시작버튼을 눌러주세요!')
                    }
                }}>
                    <View style={{ borderRadius: 10, width: chwidth - 40, height: 50, maxHeight: '15%', marginBottom: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(245,245,245)' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>{bottom_collect5}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            {/* 정답상자 끝 */}


            <Modal visible={touchBlockModal} transparent={true}>
                <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(128,128,128,0.5)' }}>
                </SafeAreaView>
            </Modal>

            <Modal visible={isFinish} transparent={true}>
                <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(128,128,128,0.5)', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '60%', borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', padding: 25 }}>
                        <Text style={{ fontFamily: 'Jua-Regular' }}>총 문제 {currentPlay}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <Text style={{ fontFamily: 'Jua-Regular', fontSize: 20, letterSpacing: -1, color: 'black', marginRight: 15 }}>정답횟수</Text>
                            <Text style={{ fontFamily: 'Jua-Regular', fontSize: 20, letterSpacing: -1, color: '#ff6600' }}>{currentCollect}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ fontFamily: 'Jua-Regular', fontSize: 20, letterSpacing: -1, color: 'black', marginRight: 15 }}>오답률</Text>
                            <Text style={{ fontFamily: 'Jua-Regular', fontSize: 20, letterSpacing: -1, color: '#ff6600' }}>{errorDataCalcul()}%</Text>
                        </View>
                    </View>

                    <TouchableWithoutFeedback onPress={() => {
                        setAtAxAnswer(axAnswer);
                        setAtAxQuestion(axQuestion);
                        navigation.navigate('최종풀이')
                        setIsFinish(false)
                        setIsStartPlay(false)
                        // setUp()
                        // resetEnKo()
                    }}>
                        <View style={{ width: '60%', height: 50, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor: 'rgb(94,131,222)', marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Jua-Regular' }}>문제풀러가기</Text>
                        </View>
                    </TouchableWithoutFeedback>

                </SafeAreaView>
            </Modal>




        </SafeAreaView>
    )
}

export default Question;