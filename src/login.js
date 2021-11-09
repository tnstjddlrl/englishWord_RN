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

import axios from 'axios';
import { useRecoilState } from 'recoil';
import { atomId } from '../atom/atom';
import AutoHeightImage from 'react-native-auto-height-image';


const chwidth = Dimensions.get('screen').width

const loginPicture = require('../img/loginPicture.png')


const Login = () => {

    const [id, setId] = useState('')
    const [pwd, setPwd] = useState('')

    const [atId, setAtId] = useRecoilState(atomId)

    const request = async () => {
        console.log(id + pwd)
        await axios.get('https://hjong0108.cafe24.com/bbs/post.php', {
            params: {
                type: 'login',
                id: id,
                pw: pwd
            },
        }).catch((err) => {
            console.log(err)
        }).then(async (res) => {
            console.log(res)
            console.log('리턴 : ' + res.data)
            if (res.data == 'login_fail') {
                Alert.alert('아이디 혹은 비밀번호 오류입니다!')
            } else if (res.data == 'login_suc') {
                setAtId(id)
                Alert.alert('로그인 성공')

                // setTimeout(() => {
                //     navigation.navigate('실제 메인')
                // }, 300);
            }

        })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(241,241,241)', justifyContent: 'center' }}>

            <View style={{ width: chwidth, alignItems: 'center' }}>
                <View style={{ width: chwidth - 60 }}>

                    <View style={{ marginBottom: 40, width: chwidth - 60, alignItems: 'center' }}>

                        <View style={{ width: 90, height: 90, borderRadius: 45, backgroundColor: 'white', marginBottom: 20, alignItems: 'center', justifyContent: 'center' }}>
                            <AutoHeightImage source={loginPicture} width={75}></AutoHeightImage>
                        </View>

                        <Text style={{ color: 'rgb(53,93,194)', fontWeight: 'bold', fontSize: 35 }}>영단어 TEST</Text>
                        <Text>English Word Test</Text>
                    </View>

                    <View style={{ backgroundColor: 'white', borderRadius: 8, elevation: 5, marginBottom: 10 }}>
                        <TextInput
                            style={{ height: 50, width: chwidth - 70, borderColor: 'gray', marginLeft: 10 }}
                            placeholder={'아이디'}
                            onChangeText={setId}
                        ></TextInput>
                    </View>

                    <View style={{ backgroundColor: 'white', borderRadius: 8, elevation: 5, marginBottom: 10 }}>
                        <TextInput
                            style={{ height: 50, width: chwidth - 70, borderColor: 'gray', marginLeft: 10 }}
                            placeholder={'비밀번호'}
                            onChangeText={setPwd}
                        ></TextInput>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        {/* 체크박스  */}
                        <Text>아이디저장</Text>
                    </View>

                    <TouchableWithoutFeedback onPress={() => { request() }}>
                        <View style={{ width: chwidth - 60, height: 50, backgroundColor: 'rgb(53,93,194)', borderRadius: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>로그인</Text>
                        </View>
                    </TouchableWithoutFeedback>

                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login;