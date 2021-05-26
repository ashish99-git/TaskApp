import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Splash from './src/screens/Splash';
import Wheather from './src/screens/Wheather';

const Stack = createStackNavigator();

export default class App extends Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          animationEnabled: true, transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 500,
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 500,
              },
            },
          },
        }}>
          <Stack.Screen name="SplashScreen" component={Splash} />
          <Stack.Screen name="WheatherScreen" component={Wheather} />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}