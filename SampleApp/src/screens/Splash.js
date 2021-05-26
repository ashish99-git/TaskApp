import React, { useState, useLayoutEffect } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Platform,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

let { height, width } = Dimensions.get('window');

export default function Splash(props) {
    React.useEffect(() => {
        setTimeout(() => props.navigation.navigate('WheatherScreen'), 2000);
    });
    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerShown: false,
        });
    });

    return (
        <View
            style={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Text style={{
                color: "red",
                fontSize: 26,
                fontWeight: 'bold'
            }}>Sample App</Text>
        </View>

    );
};
