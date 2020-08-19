import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
    StatusBar,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

import Home from './source/screens/home';
import Movie from './source/screens/movie';
import Account from './source/screens/account';
import WatchList from './source/screens/watchlist';

const Stack = createStackNavigator();

const App = () => {
    return (
        <>
            <StatusBar barStyle='light-content' />
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='Home' component={Home} options={({ navigation }) => ({
                        title: 'Movie Database',
                        headerStyle: {
                            backgroundColor: '#333'
                        },
                        headerRight: () => (
                            <TouchableOpacity 
                                style={{ paddingRight: 16, paddingLeft: 16 }}
                                onPress={() => navigation.navigate('Account')}
                            >
                                <Icon name={'user'} size={24} color={'#fff'} />
                            </TouchableOpacity>
                        ),
                        headerTintColor: '#fff'
                    })} />
                    <Stack.Screen name='Movie' component={Movie} options={{
                        title: 'Details',
                        headerStyle: {
                            backgroundColor: '#777'
                        },
                        headerTintColor: '#fff'
                    }} />
                    <Stack.Screen name='Account' component={Account} options={{
                        title: 'Account',
                        headerStyle: {
                            backgroundColor: '#777'
                        },
                        headerTintColor: '#fff'
                    }} />
                    <Stack.Screen name='WatchList' component={WatchList} options={{
                        title: 'My Watch List',
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
