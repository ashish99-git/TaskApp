import React, { useState, useLayoutEffect, useEffect } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Platform,
    Dimensions,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import Feather from 'react-native-vector-icons/Feather';

let { height, width } = Dimensions.get('window');

export default function PlayList(props) {
    const [data, setData] = React.useState([]);
    const [isLoading, setisLoading] = React.useState(false);
    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerShown: true,
            title: 'SONGS',
            headerTitleAlign: 'center',
            headerLeft: null,
            headerStyle: {
                backgroundColor: '#3889CD',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'normal',
            },
        });
    });

    useEffect(() => {
        loadData();
        setisLoading(true)
    }, []);

    const loadData = () => {
        fetch('https://itunes.apple.com/search?term=Michael+jackson')
            .then((response) => response.json()).then((json) => {
                console.log(json.resultCount);
                setisLoading(false)
                setData(json.results)
            }).catch((error) => {
                console.error(error);
                setisLoading(false)
            });
    }

    const renderPlaylistData = (item) => {
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('PlayListDetailsScreen',{data:item})}>
                <View style={{
                    flexDirection: 'row',
                    width: '97%',
                    margin: 5,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'grey',
                    paddingVertical: 10,
                    backgroundColor: 'white'
                    //   height:100
                }}>
                    <View style={{ width: '30%', alignItems: 'center' }}>
                        <ImageBackground
                            source={{ uri: 'https://is3-ssl.mzstatic.com/image/thumb/Music/a8/8e/ca/mzi.kjbhfpij.jpg/100x100bb.jpg' }}
                            style={styles.img_view}
                            imageStyle={{ borderRadius: 0 }}></ImageBackground>
                    </View>

                    <View style={{ width: '65%', justifyContent: 'center', marginLeft: 5 }}>
                        <Text style={{ color: '#3889CD', fontSize: 18 }} numberOfLines={3}>{item.collectionName}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10, width: '100%' }}>
                            <Text style={{ fontWeight: 'bold', color: '#3889CD' }}>Artist Name: </Text>
                            <Text style={{ color: '#3889CD', width: '58%' }} numberOfLines={2}>{item.artistName}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <>
            {isLoading ?
                <View style={{
                    height: height,
                    width: width,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'lightblue',
                }}>
                    <ActivityIndicator size="large" color="#3889CD" />
                    <Text style={{ color: '#3889CD', marginTop: 5 }}>Please wait...</Text>
                </View>
                :
                <View style={{
                    height: height,
                    width: width,
                    alignItems: 'center',
                    backgroundColor: 'white',
                    paddingTop: 10,
                    //paddingBottom:100
                }}>
                    <FlatList
                        style={{ marginBottom: 70 }}
                        data={data}
                        scrollEnabled
                        renderItem={({ item, index }) => renderPlaylistData(item)}
                        numColumns={1}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            }
        </>
    );
};
const styles = StyleSheet.create({
    img_view: {
        height: 100,
        width: 100,
    },
})