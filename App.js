import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
    StatusBar,
    SafeAreaView,
    View, Text
} from 'react-native';

import Home from './source/screens/home';
import Movie from './source/screens/movie';

const Stack = createStackNavigator();

const App = () => {
    return (
        <>
            <StatusBar barStyle='light-content' />
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='Home' component={Home} options={{
                        title: 'Movie Database',
                        headerStyle: {
                            backgroundColor: '#333'
                        },
                        headerTintColor: '#fff'
                    }} />
                    <Stack.Screen name='Movie' component={Movie} options={{
                        title: 'Details',
                        headerStyle: {
                            backgroundColor: '#777'
                        },
                        headerTintColor: '#fff'
                    }} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

export default App;
