import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
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

const Fakemain = () => {
    const navigation = useNavigation()

    return (
        <SafeAreaView>
            <TouchableWithoutFeedback onPress={() => { navigation.navigate('로그인') }}>
                <Text style={{ margin: 20, fontSize: 20 }}>로그인</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => { navigation.navigate('코스선택') }}>
                <Text style={{ margin: 20, fontSize: 20 }}>코스선택</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => { navigation.navigate('문제개수') }}>
                <Text style={{ margin: 20, fontSize: 20 }}>문제개수</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => { navigation.navigate('문제풀이') }}>
                <Text style={{ margin: 20, fontSize: 20 }}>문제풀이</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => { navigation.navigate('문제풀이9') }}>
                <Text style={{ margin: 20, fontSize: 20 }}>문제풀이2</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => { navigation.navigate('') }}>
                <Text style={{ margin: 20, fontSize: 20 }}>최종테스트</Text>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default Fakemain;