import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from 'react-native-splash-screen';
import Login from './src/login';
import Fakemain from './src/fakemain';
import CourseChoice from './src/courseChoice';
import Question from './question/question';
import { RecoilRoot } from 'recoil';

const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 100);
  }, [])

  return (
    <RecoilRoot>

      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} >
          <Stack.Screen name="가짜메인" component={Fakemain} />


          <Stack.Screen name="로그인" component={Login} />

          <Stack.Screen name="코스선택" component={CourseChoice} />
          <Stack.Screen name="문제풀이" component={Question} />


        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  )
}



export default App;