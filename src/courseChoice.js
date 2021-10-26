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

const CourseChoice = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ backgroundColor: 'skyblue', width: '80%', height: 50, borderRadius: 15, margin: 20 }}></View>
                <View style={{ backgroundColor: 'skyblue', width: '80%', height: 50, borderRadius: 15, margin: 20 }}></View>
                <View style={{ backgroundColor: 'skyblue', width: '80%', height: 50, borderRadius: 15, margin: 20 }}></View>
                <View style={{ backgroundColor: 'skyblue', width: '80%', height: 50, borderRadius: 15, margin: 20 }}></View>
                <View style={{ backgroundColor: 'skyblue', width: '80%', height: 50, borderRadius: 15, margin: 20 }}></View>
            </View>
        </SafeAreaView>
    )
}

export default CourseChoice;