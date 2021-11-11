import React, { useEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    useColorScheme,
    View,
} from 'react-native';

import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState } from 'recoil';
import { atomId } from '../atom/atom';


const getAsyncId = async () => {
    try {
        const value = await AsyncStorage.getItem('@user_id')
        if (value !== null) {
            return value
        } else {
            return null;
        }
    } catch (e) {
        console.log(e)
    }
}


const Loading = () => {
    const navigation = useNavigation()

    const [atId, setAtId] = useRecoilState(atomId)

    useEffect(() => {
        getAsyncId().then((res) => {
            if (res !== null) {
                setAtId(res)
                navigation.navigate('코스선택')
            } else {
                navigation.navigate('로그인')
            }
        })
    }, [])


    return (
        <View></View>
    )
}

export default Loading;