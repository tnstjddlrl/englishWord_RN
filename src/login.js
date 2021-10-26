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


const chwidth = Dimensions.get('screen').width


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

                Alert.alert('로그인 성공')

                // setTimeout(() => {
                //     navigation.navigate('실제 메인')
                // }, 300);
            }

        })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(11,20,100)', justifyContent: 'center' }}>

            <View style={{ width: chwidth, alignItems: 'center' }}>
                <View style={{ width: chwidth - 40, backgroundColor: 'white', borderRadius: 10 }}>
                    <View style={{ margin: 30, marginTop: 50 }}>

                        <TextInput
                            style={{ height: 50, width: chwidth - 100, borderBottomWidth: 1, borderColor: 'gray' }}
                            placeholder={'ID'}
                            onChangeText={setId}
                        ></TextInput>


                        <TextInput
                            style={{ height: 50, width: chwidth - 100, borderBottomWidth: 1, borderColor: 'gray' }}
                            placeholder={'PASSWORD'}
                            onChangeText={setPwd}
                        ></TextInput>

                        <View style={{ flexDirection: 'row', marginTop: 10 }}>

                            <Text>아이디저장</Text>
                        </View>

                        <TouchableWithoutFeedback onPress={() => { request() }}>
                            <View style={{ width: chwidth - 100, height: 50, backgroundColor: 'skyblue', borderRadius: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                                <Text>로그인</Text>
                            </View>
                        </TouchableWithoutFeedback>

                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login;