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
        setTimeout(() => props.navigation.navigate('PlaylistScreen'), 2000);
    });
    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerShown: false,
        });
    });

    return (
        <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1617549505261-eeaed53d514e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2733&q=80' }}
            style={{ height: '100%', width: '100%',alignItems:'center' }}
            imageStyle={{ borderRadius: 0 }}>
            <Text style={{ color: "red",marginTop:150,fontSize:26 ,fontWeight:'bold'}}>Sample App</Text>
        </ImageBackground> 

    );
};
