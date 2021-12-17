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
import { useNavigation } from '@react-navigation/core';
import AutoHeightImage from 'react-native-auto-height-image';


const chwidth = Dimensions.get('screen').width

const loginPicture = require('../img/loginPicture.png')


const Register = () => {
    const navigation = useNavigation()

    const [id, setId] = useState('')
    const [pwd, setPwd] = useState('')
    const [pwdCheck, setPwdCheck] = useState('')

    const [phone, setPhone] = useState('')
    const [parentPhone, setParentPhone] = useState('')

    const [name, setName] = useState('')


    const request = async () => {
        console.log(id + pwd)
        await axios.get('https://hjong0108.cafe24.com/bbs/post.php', {
            params: {
                type: 'register',
                id: id,
                pw: pwd,
                hp: phone,
                parent_hp: parentPhone,
                name: name,
            },
        }).catch((err) => {
            console.log(err)
        }).then(async (res) => {
            console.log({ res })
            console.log('리턴 : ' + res.data)
            if (res.data == 'return') {
                Alert.alert('중복 아이디가 존재합니다!')
            } else if (res.data == 'register_success') {
                Alert.alert('회원가입이 완료되었습니다.', '로그인 후 이용해주세요.')
                setTimeout(() => {
                    navigation.navigate('로그인')
                }, 300);
            }
        })
    }

    function pwdcheck(params) {
        if (id && pwd && pwdCheck && phone && name) {
            if (pwd == pwdCheck) {
                // Alert.alert('회원가입완료!')
                request()
            } else {
                Alert.alert('비밀번호를 확인해주세요!')
            }
        } else {
            Alert.alert('비어있는 칸이 있습니다!')
        }
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(241,241,241)' }}>
            <TouchableWithoutFeedback onPress={() => {
                navigation.goBack()
            }}>
                <View style={{ backgroundColor: 'black', padding: 10, width: 80, borderRadius: 20, margin: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontFamily: 'Jua-Regular' }}>뒤로가기</Text>
                </View>
            </TouchableWithoutFeedback>

            <ScrollView style={{ flex: 1 }}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: 90, height: 90, borderRadius: 45, backgroundColor: 'white', marginBottom: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <AutoHeightImage source={loginPicture} width={75}></AutoHeightImage>
                    </View>
                </View>

                <View style={{ width: chwidth, alignItems: 'center' }}>
                    <View style={{ margin: 0 }}>
                        <View style={{ backgroundColor: 'white', borderRadius: 8, elevation: 5, marginBottom: 18 }}>
                            <TextInput
                                style={{ height: 50, width: chwidth - 70, borderColor: 'gray', marginLeft: 10 }}
                                placeholder={'아이디'}
                                onChangeText={setId}
                                placeholderTextColor={'gray'}
                            ></TextInput>
                        </View>

                        <View style={{ backgroundColor: 'white', borderRadius: 8, elevation: 5, marginBottom: 18 }}>
                            <TextInput
                                style={{ height: 50, width: chwidth - 70, borderColor: 'gray', marginLeft: 10 }}
                                placeholder={'비밀번호'}
                                onChangeText={setPwd}
                                secureTextEntry={true}
                                placeholderTextColor={'gray'}
                            ></TextInput>
                        </View>

                        <View style={{ backgroundColor: 'white', borderRadius: 8, elevation: 5, marginBottom: 18 }}>
                            <TextInput
                                style={{ height: 50, width: chwidth - 70, borderColor: 'gray', marginLeft: 10 }}
                                placeholder={'비밀번호 확인'}
                                onChangeText={setPwdCheck}
                                secureTextEntry={true}
                                placeholderTextColor={'gray'}
                            ></TextInput>
                        </View>

                        <View style={{ backgroundColor: 'white', borderRadius: 8, elevation: 5, marginBottom: 18 }}>
                            <TextInput
                                style={{ height: 50, width: chwidth - 70, borderColor: 'gray', marginLeft: 10 }}
                                placeholder={'이름'}
                                onChangeText={setName}
                                placeholderTextColor={'gray'}
                            ></TextInput>
                        </View>

                        <View style={{ backgroundColor: 'white', borderRadius: 8, elevation: 5, marginBottom: 18 }}>
                            <TextInput
                                style={{ height: 50, width: chwidth - 70, borderColor: 'gray', marginLeft: 10 }}
                                placeholder={'본인 연락처'}
                                onChangeText={setPhone}
                                placeholderTextColor={'gray'}
                            ></TextInput>
                        </View>

                        <View style={{ backgroundColor: 'white', borderRadius: 8, elevation: 5, marginBottom: 18 }}>
                            <TextInput
                                style={{ height: 50, width: chwidth - 70, borderColor: 'gray', marginLeft: 10 }}
                                placeholder={'학부모 연락처(선택)'}
                                onChangeText={setParentPhone}
                                placeholderTextColor={'gray'}
                            ></TextInput>
                        </View>

                    </View>
                </View>
            </ScrollView>

            <View style={{ marginLeft: 30, marginBottom: 10 }}>
                <TouchableWithoutFeedback onPress={() => { pwdcheck() }}>
                    <View style={{ width: chwidth - 60, height: 50, backgroundColor: 'white', borderWidth: 2, borderColor: 'rgb(53,93,194)', borderRadius: 10, marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'Jua-Regular', color: 'rgb(53,93,194)', fontSize: 20 }}>회원가입</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>

        </SafeAreaView>
    )
}

export default Register;