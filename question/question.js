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

    const [timer, setTimer] = useState(10)
    const [secon, setSecon] = useState('00')

    const [nextTimer, setNextTimer] = useState(5)

    const [touchBlockModal, setTouchBlockModal] = useState(false)

    const [atGrade, setAtGrade] = useRecoilState(atomGrade); //학년


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


    function calculSecons(params) {
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

    function intervalset(params) {
        return setInterval(() => { setTimer((res) => res - 1) }, 1002);
    };

    function smallIntervalset(params) {
        return setInterval(() => { setNextTimer((res) => res - 1) }, 1002);
    };

    function AllClearInterval(params) {
        clearInterval(interval);
        clearInterval(smallInterval);

        interval = null;
        smallInterval = null;
    }

    function timerStopAndGo(setint) {
        setTouchBlockModal(true);

        AllClearInterval();

        setTimeout(() => {
            interval = intervalset();
            setNextTimer(5);
            smallInterval = smallIntervalset();
            setTouchBlockModal(false);
        }, setint);
    };

    function smallTimerOut(params) {
        if (nextTimer <= 0) {//작은타이머 숫자 다 지나가면 실행됨
            timerStopAndGo(1002)
        };
    };

    useEffect(() => {
        calculSecons();
    }, [timer]);


    useEffect(() => {
        smallTimerOut();
    }, [nextTimer]);

    useEffect(() => {
        interval = intervalset();
        smallInterval = smallIntervalset();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>

            {/* 헤더시작 */}
            <View style={{ width: chwidth, height: 50, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>로고</Text>
                <Text>뒤로가기</Text>
            </View>
            {/* 헤더 끝 */}

            {/* 개인정보 시작 */}
            <View style={{ width: chwidth, height: 50 }}>
                <Text>개인정보</Text>
            </View>
            {/* 개인정보 끝 */}

            {/* 십자 및 9개 문제상자 */}
            <View style={{ width: chwidth, alignItems: 'center' }}>

                <View>
                    <View style={{ borderWidth: 1, width: chwidth / 4, height: chheight / 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>단어1</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>

                    <View style={{ borderWidth: 1, width: chwidth / 4, height: chheight / 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>단어2</Text>
                    </View>

                    <View style={{ borderWidth: 1, width: chwidth / 4, height: chheight / 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>단어3</Text>
                    </View>

                    <View style={{ borderWidth: 1, width: chwidth / 4, height: chheight / 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>단어4</Text>
                    </View>

                </View>

                <View>

                    <View style={{ borderWidth: 1, width: chwidth / 4, height: chheight / 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>단어5</Text>
                    </View>

                </View>

            </View>
            {/* 문제상자 끝 */}

            {/* 타이머 시작 */}
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <View style={{ borderWidth: 1, width: chwidth - 40, height: 50, alignItems: 'center' }}>
                    <Text>{`${parseInt((timer % 3600) / 60)}:${secon} / ${Math.floor(nextTimer)}`}</Text>

                </View>
            </View>


            {/* 정답상자 시작 */}
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <TouchableWithoutFeedback onPress={() => { console.log('1') }}>
                    <View style={{ borderWidth: 1, width: chwidth - 40, height: 50, alignItems: 'center' }}>
                        <Text>정답1</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { console.log('2') }}>
                    <View style={{ borderWidth: 1, width: chwidth - 40, height: 50, alignItems: 'center' }}>
                        <Text>정답2</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { console.log('3') }}>
                    <View style={{ borderWidth: 1, width: chwidth - 40, height: 50, alignItems: 'center' }}>
                        <Text>정답3</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { console.log('4') }}>
                    <View style={{ borderWidth: 1, width: chwidth - 40, height: 50, alignItems: 'center' }}>
                        <Text>정답4</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { console.log('5') }}>
                    <View style={{ borderWidth: 1, width: chwidth - 40, height: 50, alignItems: 'center' }}>
                        <Text>정답5</Text>
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