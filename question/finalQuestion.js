import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
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

import AutoHeightImage from 'react-native-auto-height-image';
import Spinner from 'react-native-loading-spinner-overlay';
import { useRecoilState } from 'recoil';


import { atomAxAnswer, atomAxQuestion, atomGrade, atomId, atomIsSaveWord, atomSaveAnswer, atomSaveQuestion } from '../atom/atom';

const chwidth = Dimensions.get('screen').width;
const chheight = Dimensions.get('screen').height;


const headerIcon = require('../img/headerIcon.png');
const pencil = require('../img/pencil.png');

var current = 1
var finalResultArray = []

const FinalQuestion = () => {
    const navigation = useNavigation()

    const [isStartPlay, setIsStartPlay] = useState(false)

    const [isSpinner, setIsSpinner] = useState(false)

    // const [current, setCurrent] = useState(1)
    const [collectCount, setCollectCount] = useState(0)
    const [failCount, setFailCount] = useState(0)

    const [atGrade, setAtGrade] = useRecoilState(atomGrade); //학년
    const [atId, setAtId] = useRecoilState(atomId); //아이디

    const [finalModal, setFinalModal] = useState(false)

    const [atAxQuestion, setAtAxQuestion] = useRecoilState(atomAxQuestion)
    const [atAxAnswer, setAtAxAnswer] = useRecoilState(atomAxAnswer)

    const [atSaveAnswer, setAtSaveAnswer] = useRecoilState(atomSaveAnswer)
    const [atSaveQuestion, setAtSaveQuestion] = useRecoilState(atomSaveQuestion)
    const [atIsSaveWord, setAtIsSaveWord] = useRecoilState(atomIsSaveWord)

    const [axQuestion, setAxQuestion] = useState([])
    const [axAnswer, setAxAnswer] = useState([])


    const [collect0, setCollect0] = useState('') //정답 보여주기용
    const [collect0_kor, setCollect0_kor] = useState('') //정답 확인용

    const [topWord, setTopWord] = useState('');

    const [bottom_collect1, setbottom_collect1] = useState('')    //
    const [bottom_collect2, setbottom_collect2] = useState('')
    const [bottom_collect3, setbottom_collect3] = useState('')
    const [bottom_collect4, setbottom_collect4] = useState('')
    const [bottom_collect5, setbottom_collect5] = useState('')

    useEffect(() => {
        setAxQuestion(atAxQuestion)
        setAxAnswer(atAxAnswer)

    }, [atAxQuestion])

    //////////////////////////////////////////
    function checkCollect(cc) {
        if (cc === collect0 || cc === collect0_kor) {
            console.log('맞음');
            finalResultArray.push({ En_name: collect0, collect: 'y' })

            setCollectCount((rr) => rr + 1)


        } else {
            console.log('틀림');
            finalResultArray.push({ En_name: collect0, collect: 'n' })
            setFailCount((rr) => rr + 1)
        }

        if (current < atAxQuestion.length) {
            current += 1;
            if (current % 2 == 0) {
                randomCollect(current, false)
            } else {
                randomCollect(current, true)
            }
        } else {
            // Alert.alert('끝!')
            current = 1
            setFinalModal(true)

            console.log(finalResultArray)
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    const request = async () => {
        await axios.get('https://hjong0108.cafe24.com/bbs/post.php', {
            params: {
                type: 'word_save',
                id: atId,
                grade: atGrade,//atGrade,
                save_word: JSON.stringify(axQuestion)
            },
        }).catch((err) => {
            console.log(err)
        }).then(async (res) => {
            console.log(res)
            console.log('리턴 : ' + res.data)
        })
        // console.log(axQuestion);
    }

    const request2 = async () => {
        await axios.get('https://hjong0108.cafe24.com/bbs/post.php', {
            params: {
                type: 'work_end',
                id: 'test',
                grade: '고등학교1학년',//atGrade,
                suc_word: JSON.stringify(finalResultArray)
            },
        }).catch((err) => {
            console.log(err)
        }).then(async (res) => {
            console.log(res)
            console.log('리턴 : ' + res.data)

            finalResultArray = []
        })
        // console.log(finalResultArray);
    }

    function saveWord(params) {
        setIsSpinner(true)
        setAtSaveAnswer(axAnswer)
        setAtSaveQuestion(axQuestion)
        setAtIsSaveWord(true)

        request().then(() => {
            request2()
        })

        setTimeout(() => {
            if (axQuestion.length == 5) {
                navigation.navigate('문제풀이')
            } else {
                navigation.navigate('문제풀이9')
            }
        }, 1000);
    }

    function anotherWord() {
        setAtIsSaveWord(false)
        request2()
        setTimeout(() => {
            finalResultArray = []
        }, 1000);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    function shuffle(array = []) { return array.slice().sort(() => Math.random() - 0.5); }

    function randomCollect(randomint, isen) {
        var sortArray = []
        var sortErrorArray = []
        var bottomArray = []

        if (!isen) {
            sortArray = axQuestion;
            sortErrorArray = shuffle(axAnswer);

            console.log('???????????????????????????????????');
            console.log(sortArray);

            setCollect0(sortArray[randomint - 1].En_name);
            setCollect0_kor(sortArray[randomint - 1].Ko_name);
            setTopWord(sortArray[randomint - 1].Ko_name)

            console.log(randomint);

            console.log(sortArray[randomint - 1].Ko_name);
            console.log(sortArray[randomint - 1].En_name);

            bottomArray = [sortArray[randomint - 1].En_name, sortErrorArray[0].En_name, sortErrorArray[1].En_name, sortErrorArray[2].En_name, sortErrorArray[3].En_name]
            bottomArray = shuffle(bottomArray)

            setbottom_collect1(bottomArray[0]);
            setbottom_collect2(bottomArray[1]);
            setbottom_collect3(bottomArray[2]);
            setbottom_collect4(bottomArray[3]);
            setbottom_collect5(bottomArray[4]);

        } else {
            sortArray = axQuestion
            sortErrorArray = shuffle(axAnswer);


            console.log('???????????????????????????????????')
            console.log(sortArray)

            setCollect0(sortArray[randomint - 1].En_name);
            setCollect0_kor(sortArray[randomint - 1].Ko_name);
            setTopWord(sortArray[randomint - 1].En_name)

            bottomArray = [sortArray[randomint - 1].Ko_name, sortErrorArray[0].Ko_name, sortErrorArray[1].Ko_name, sortErrorArray[2].Ko_name, sortErrorArray[3].Ko_name]
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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




    return (
        <SafeAreaView style={{ flex: 1 }}>

            {/* 헤더시작 */}
            <View style={{ width: chwidth, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, padding: 10 }}>
                <TouchableWithoutFeedback onPress={() => {
                    console.log('zzz')

                    randomCollect(1, true)
                    setTopWord(atAxQuestion[0].En_name)
                }}>
                    <AutoHeightImage source={headerIcon} width={150}></AutoHeightImage>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    navigation.navigate('코스선택');
                }}>
                    <View style={{ backgroundColor: 'black', borderRadius: 30, width: 60, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white' }}>종료</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            {/* 헤더 끝 */}

            <View style={{ flex: 1, marginLeft: 20 }}>
                <Text style={{ marginTop: 10 }}>※ 최종 테스트 결과는 기록됩니다.</Text>
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, alignItems: 'center' }}>
                    <AutoHeightImage source={pencil} width={30}></AutoHeightImage>
                    <Text style={{ marginLeft: 15, fontFamily: 'Jua-Regular', fontSize: 18, color: 'black' }}>문제풀기</Text>
                </View>

                <View style={{ borderRadius: 8, borderWidth: 1, width: chwidth - 40, flex: 1, borderColor: 'rgb(146,8,210)', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, color: 'rgb(146,8,210)', fontWeight: 'bold' }}>{topWord}</Text>
                </View>

            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
                {isStartPlay ?
                    <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 20, fontWeight: 'bold', color: 'black', letterSpacing: -1 }}>위의 단어의 뜻 혹은 영단어는?</Text>
                    :
                    <TouchableWithoutFeedback onPress={() => {
                        randomCollect(1, true)
                        setTopWord(atAxQuestion[0].En_name)
                        setIsStartPlay(true)
                    }}>
                        <View style={{ width: 200, padding: 10, borderRadius: 20, backgroundColor: 'rgb(94,131,222)', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontFamily: 'Jua-Regular', fontSize: 20 }}>시작</Text>
                        </View>
                    </TouchableWithoutFeedback>
                }
            </View>
            <View style={{ flex: 1.5, alignItems: 'center' }}>



                {/* 정답상자 시작 */}
                <View style={{ alignItems: 'center', marginTop: 5, flex: 1, }}>
                    <TouchableWithoutFeedback onPress={() => {
                        console.log(bottom_collect1);
                        checkCollect(bottom_collect1);
                    }}>
                        <View style={{ borderRadius: 10, width: chwidth - 40, height: 50, maxHeight: '15%', marginBottom: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(245,245,245)' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>{bottom_collect1}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        console.log(bottom_collect2);
                        checkCollect(bottom_collect2);
                    }}>
                        <View style={{ borderRadius: 10, width: chwidth - 40, height: 50, maxHeight: '15%', marginBottom: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(245,245,245)' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>{bottom_collect2}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        console.log(bottom_collect3);
                        checkCollect(bottom_collect3);
                    }}>
                        <View style={{ borderRadius: 10, width: chwidth - 40, height: 50, maxHeight: '15%', marginBottom: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(245,245,245)' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>{bottom_collect3}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        console.log(bottom_collect4);
                        checkCollect(bottom_collect4);
                    }}>
                        <View style={{ borderRadius: 10, width: chwidth - 40, height: 50, maxHeight: '15%', marginBottom: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(245,245,245)' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>{bottom_collect4}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        console.log(bottom_collect5);
                        checkCollect(bottom_collect5);
                    }}>
                        <View style={{ borderRadius: 10, width: chwidth - 40, height: 50, maxHeight: '15%', marginBottom: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(245,245,245)' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>{bottom_collect5}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                {/* 정답상자 끝 */}
            </View>


            <Modal visible={finalModal} transparent={true}>
                <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '60%', height: 130, borderRadius: 10, backgroundColor: 'white', marginBottom: 8, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'Jua-Regular', fontSize: 23, color: 'black', marginRight: 10 }}>정답</Text>
                            <Text style={{ fontFamily: 'Jua-Regular', fontSize: 23, color: 'rgb(233,95,10)' }}>{collectCount}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ fontFamily: 'Jua-Regular', fontSize: 23, color: 'black', marginRight: 10 }}>오답</Text>
                            <Text style={{ fontFamily: 'Jua-Regular', fontSize: 23, color: 'rgb(233,95,10)' }}>{failCount}</Text>
                        </View>
                    </View>

                    <TouchableWithoutFeedback onPress={() => {
                        saveWord()
                    }}>
                        <View style={{ width: '60%', height: 50, borderRadius: 10, backgroundColor: 'rgb(116,219,178)', marginBottom: 8, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Jua-Regular' }}>같은 단어 암기</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => {
                        console.log('zzz');
                        anotherWord()
                        navigation.navigate('문제개수')
                    }}>
                        <View style={{ width: '60%', height: 50, borderRadius: 8, backgroundColor: 'rgb(53,93,194)', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Jua-Regular' }}>다른 단어 암기</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </SafeAreaView>
            </Modal>



        </SafeAreaView>
    )
}


export default FinalQuestion;