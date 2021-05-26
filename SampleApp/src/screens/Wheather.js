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
    PermissionsAndroid,
    Animated,
    Easing,
    Alert,
} from 'react-native';
import moment from "moment";
import GetLocation from 'react-native-get-location';
import LottieView from 'lottie-react-native';

let { height, width } = Dimensions.get('window');

export default function Wheather(props) {
    const [data, setData] = React.useState([]);
    const [isLoading, setisLoading] = React.useState(true);
    const [temp, settemp] = React.useState('');
    const [day, setday] = React.useState('');
    const progress = new Animated.Value(0);
    useLayoutEffect(() => {
        Animated.timing(progress, {
            toValue: 1,
            duration: 5000,
            easing: Easing.linear,
          }).start();
        props.navigation.setOptions({
            headerShown: true,
            title: day,
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
       requestPermission();
    }, []);

    async function requestPermission(){
        try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 15000,
            })
            .then(location => {
                console.log(location);
                setTimeout(() => {
                    loadData(location.latitude , location.longitude);
                }, 500);
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
            } else {
              alert("Location permission denied")
            }
          } catch (err) {
            console.warn(err)
          }
    }

    const loadData = (lat,long) => {
        fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&units=metric&lon='+long+'&appid=76b679f4a081657181f4cfdedef73e9f')
            .then((response) => response.json()).then((json) => {
                console.log(json);

                if (json.cod == 200) {
                    console.log(json.list.length);
                    var datalist = [];
                    for (var i = 0; i < json.list.length; i++) {
                        if (i == 2 || i == 9 || i == 17 || i == 25 || i == 33) {
                            datalist.push(json.list[i]);
                        }
                    }
                    setData(datalist);
                    settemp(datalist[0].main.temp)
                    setday(DayFromDate(datalist[0].dt_txt));
                    console.log(datalist.length);
                }
                setisLoading(false)
                // setData(json.results)
            }).catch((error) => {
                console.error(error);
                setisLoading(false)
            });
    }

    const DayFromDate = (dateString) => {
        var dt = moment(dateString, "YYYY-MM-DD HH:mm:ss")
        return dt.format('dddd');
    }

    const setWhetherData=(temp, day)=>{
        setday(DayFromDate(day));
        settemp(temp)
    }

    const renderPlaylistData = (item, index) => {
        return (
            <TouchableOpacity onPress={() => setWhetherData(item.main.temp, item.dt_txt)}>
                <View style={{
                    width: width,
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderBottomColor: 'grey',
                    paddingVertical: 20,
                    paddingHorizontal: 20,
                    backgroundColor: 'white',
                    borderTopColor: 'grey',
                    borderTopWidth: index == 0 ? 1 : 0
                    //   height:100
                }}>
                    <Text style={{ fontWeight: 'bold', flex: 1, fontSize: 20 }}>{DayFromDate(item.dt_txt)}</Text>
                    <Text style={{ fontSize: 20 }}>{item.main.temp}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <>
            {isLoading ?
                <View style={{
                    flex: 1,
                    height: height,
                    width: width,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                }}>
                    {/* <ActivityIndicator size="large" color="#3889CD" /> */}
                    <LottieView source={require('../raw/splashy_loader.json')} progress={progress}  />
                    <Text style={{ color: '#3889CD', marginTop: 5 }}>Please wait...</Text>
                </View>
                :
                <View style={{

                    height: height,
                    width: width,
                    alignItems: 'center',
                    backgroundColor: 'white',
                    paddingTop: 10,
                }}>
                    <View style={{
                        width: width,
                        height: height / 2.5,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={{ fontSize: 40 }}>{temp}</Text>
                        <Text style={{ fontSize: 18 }}>Temperature</Text>
                    </View>
                    <FlatList
                        style={{ marginBottom: 70 }}
                        data={data}
                        scrollEnabled
                        renderItem={({ item, index }) => renderPlaylistData(item, index)}
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