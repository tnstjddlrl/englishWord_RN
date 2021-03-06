import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from 'react-native-splash-screen';
import Login from './src/login';
import Fakemain from './src/fakemain';
import CourseChoice from './src/courseChoice';
import Question from './question/question';
import { RecoilRoot } from 'recoil';
import Question9 from './question/question9';
import QuestionChoice from './question/questionChoice';
import FinalQuestion from './question/finalQuestion';
import Loading from './src/loading';
import Register from './src/register';

const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, [])

  return (
    <RecoilRoot>

      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} >
          <Stack.Screen name="로딩" component={Loading} />

          <Stack.Screen name="로그인" component={Login} />
          <Stack.Screen name="회원가입" component={Register} />

          <Stack.Screen name="가짜메인" component={Fakemain} />

          <Stack.Screen name="코스선택" component={CourseChoice} />
          <Stack.Screen name="문제개수" component={QuestionChoice} />
          <Stack.Screen name="문제풀이" component={Question} />
          <Stack.Screen name="문제풀이9" component={Question9} />
          <Stack.Screen name="최종풀이" component={FinalQuestion} />


        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  )
}



export default App;