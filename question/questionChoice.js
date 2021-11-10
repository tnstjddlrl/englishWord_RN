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

import SelectDropdown from 'react-native-select-dropdown'

const headerIcon = require('../img/headerIcon.png')

const chwidth = Dimensions.get('screen').width;
const chheight = Dimensions.get('screen').height;

const select_arrow = require('../img/select_arrow.png')

const countries = ["5개", "9개"]

const QuestionChoice = () => {
    const navigation = useNavigation()
    const [cnt, setCnt] = useState('')

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ width: '100%', }}>
                <AutoHeightImage source={headerIcon} width={175} style={{ margin: 10 }}></AutoHeightImage>
            </View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                <Text style={{ marginTop: -50, fontSize: 25, letterSpacing: -1.5, fontFamily: 'Jua-Regular', color: 'black' }}>초등학교 3학년</Text>

                <View style={{ width: chwidth - 40, backgroundColor: 'rgb(242,242,242)', borderRadius: 10, marginTop: 50, alignItems: 'center' }}>

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
                        } else {
                            navigation.navigate('문제풀이9')
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