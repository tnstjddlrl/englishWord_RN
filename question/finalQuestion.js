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

import AutoHeightImage from 'react-native-auto-height-image';

const chwidth = Dimensions.get('screen').width;
const chheight = Dimensions.get('screen').height;


const headerIcon = require('../img/headerIcon.png');
const pencil = require('../img/pencil.png');

const FinalQuestion = () => {
    const navigation = useNavigation()

    return (
        <SafeAreaView style={{ flex: 1 }}>

            {/* 헤더시작 */}
            <View style={{ width: chwidth, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, padding: 10 }}>
                <TouchableWithoutFeedback onPress={() => {
                    console.log('zzz')
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
                    <Text style={{ fontSize: 20, color: 'rgb(146,8,210)', fontWeight: 'bold' }}>단어</Text>
                </View>

            </View>

            <View style={{ flex: 1.5, alignItems: 'center' }}>
                <Text style={{ marginTop: 30, fontSize: 20, fontWeight: 'bold', color: 'black', letterSpacing: -1 }}>위의 단어의 뜻 혹은 영단어는?</Text>
            </View>

        </SafeAreaView>
    )
}


export default FinalQuestion;