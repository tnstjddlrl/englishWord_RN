import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    View,
} from 'react-native';

import axios from 'axios';


const chwidth = Dimensions.get('screen').width




const Register = () => {

    const [id, setId] = useState('')
    const [pwd, setPwd] = useState('')


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
            console.log({ res })
            console.log('리턴 : ' + res.data)
            if (res.data == 'login_fail') {
                Alert.alert('아이디 혹은 비밀번호 오류입니다!')
            } else if (res.data == 'login_suc') {
                setAtid(id)
                storeData(id)
                setTimeout(() => {
                    navigation.navigate('실제 메인')
                }, 300);
            }

        })
    }

    return (
        <SafeAreaView>
            <Text>Register</Text>

            <View style={{ width: chwidth, alignItems: 'center' }}>
                <View style={{ width: chwidth - 40, backgroundColor: 'gray', borderRadius: 40 }}>
                    <View style={{ margin: 20 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>아이디</Text>
                            <TextInput style={{ height: 50 }}></TextInput>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>비밀번호</Text>
                            <TextInput style={{ height: 50 }}></TextInput>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>비밀번호 확인</Text>
                            <TextInput style={{ height: 50 }}></TextInput>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>이름</Text>
                            <TextInput style={{ height: 50 }}></TextInput>
                        </View>
                    </View>

                </View>

            </View>
        </SafeAreaView>
    )
}

export default Register;