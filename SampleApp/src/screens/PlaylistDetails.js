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
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ProgressBar } from '@react-native-community/progress-bar-android';


let { height, width } = Dimensions.get('window');

export default function PlayListDetails(props) {
    const [songName, setsongName] = React.useState(props.route.params.data.collectionName);
    const [artistName, setartistName] = React.useState(props.route.params.data.artistName);
    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerShown: true,
            title: 'NOW PLAYING',
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: '#3889CD',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'normal',
            },
        });
    });

    return (
        <ImageBackground
            source={{ uri: 'https://lh3.googleusercontent.com/proxy/uJZKtyVXjIwzsCp-Jm5cv8vmPAxHYWN5sJQL3-FRMHmf_o6Em2WsmL5DcilPZomrdvkoAN3lCWIGb2WxKyCkNVzYdV8amQbmXHz5ee7-PtkuMSnk7sC_gjBY9aET_60' }}
            style={{ height: '100%', width: '100%', alignItems: 'center' }}
            resizeMode='stretch'
            imageStyle={{ borderRadius: 0 }}>

            <View style={{ height: '100%', width: '100%', alignItems: 'center', opacity: 0.6, backgroundColor: 'black' }}>
            </View>
            <View style={{ position: 'absolute', height: '100%', width: '100%', alignItems: 'center', marginTop: 60 }}>
                <ImageBackground
                    source={{ uri: 'https://image.winudf.com/v2/image1/Y29tLnh1YW50cnVvbmcubWljaGFlbGphY2tzb25vZmZsaW5lYWxidW1zX3NjcmVlbl80XzE1Nzg4NzIzNTJfMDEx/screen-4.jpg?fakeurl=1&type=.jpg' }}
                    style={{ height: 200, width: 200, alignItems: 'center' }}
                    resizeMode='stretch'
                    imageStyle={{ borderRadius: 100 }}>
                </ImageBackground>

                <Text style={{ width: '70%', textAlign: 'center', color: 'white', fontSize: 22 ,marginTop:10}}>{songName}</Text>
                <Text style={{ marginTop: 5, color: 'white', fontWeight: 'bold' }}>{artistName}</Text>

                <View style={{ width: '85%', marginTop: 50 }}>
                    <ProgressBar
                        styleAttr="Horizontal"
                        indeterminate={false}
                        progress={0.5}
                        color='white'
                    />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text style={{ color: 'white' }}>3:15</Text>
                        <Text style={{ color: 'white' }}>{'-3:20'}</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        marginTop:50
                    }}>
                        <AntDesign
                         name="banckward" 
                         size={30}
                          color="#fff" 
                          />
                        <AntDesign 
                        name="playcircleo" 
                        size={50}
                         color="#fff" 
                         />
                        <AntDesign 
                        name="forward" 
                        size={30} 
                        color="#fff" 
                        />
                    </View>
                    
                </View>

            </View>
            <View style={{alignItems:'center',position:'absolute',bottom:10}}>
                    <AntDesign 
                        name="up" 
                        size={30} 
                        color="#fff" 
                        />
                        <Text style={{color:'white',fontSize:18}}>Song Details</Text>
                    </View>

        </ImageBackground>
    );
};
