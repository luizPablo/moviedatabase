import React, { useState, useEffect } from 'react';

import {
    SafeAreaView,
    Text,
    View,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import constants from '../../services/constants';

const Account = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(false);
    const [userLogged, setUserLogged] = useState(false);
    const [objectUser, setObjectUser] = useState({});

    useEffect(() => {
        const checkUser = async () => {
            const user = await AsyncStorage.getItem(constants.DB_USER);

            if (user) {
                setObjectUser(JSON.parse(user));
                setUserLogged(true);
            }

            setLoading(false);
        }

        checkUser();
    }, []);

    const createAccount = async () => {
        const stringUsers = await AsyncStorage.getItem(constants.DB_USERS);
        let users;

        if (stringUsers) {
            users = JSON.parse(stringUsers);
        }

        if (users) {
            users.push({
                email,
                password,
            })
        } else {
            users = [{
                email,
                password,
            }]
        }

        await AsyncStorage.setItem(constants.DB_USERS, JSON.stringify(users));
        alert('Success! You can now sign in');
        setNewAccount(false);
    }

    const signin = async () => {
        const stringUsers = await AsyncStorage.getItem(constants.DB_USERS);
        let users = [];

        if (stringUsers) {
            users = JSON.parse(stringUsers);
        }

        if (email.length === 0 || password.length === 0) {
            alert('All fields are required!');
            return;
        }

        if (!users) {
            alert('Incorrect email or password!');
            return;
        }

        const foundUser = users.filter(el => el.email === email && el.password === password);
        if (foundUser.length > 0) {
            await AsyncStorage.setItem(constants.DB_USER, JSON.stringify(foundUser[0]));
            setObjectUser(foundUser[0]);
            setUserLogged(true);
            setEmail('');
            setPassword('');
        } else {
            alert('Incorrect email or password!');
            return;
        }
    }

    const signout = async () => {
        await AsyncStorage.removeItem(constants.DB_USER);
        setUserLogged(false);
        setObjectUser({});
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#222' }}>
                <ActivityIndicator size={'small'} color={'tomato'} />
            </View>
        )
    }

    if (userLogged) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.textCall}>Welcome, {objectUser.email}</Text>
                <TouchableOpacity
                    style={[styles.button, { width: 300, marginTop: 16 }]}
                    onPress={() => navigation.navigate('WatchList')}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        MY WATCH LIST
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { width: 300, marginTop: 8 }]}
                    onPress={signout}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        SIGN OUT
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.textCall}>Welcome to the Movie Database!</Text>
            <View style={styles.formBox}>
                <Text style={{ color: 'white', marginBottom: 8 }}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder={'Email'}
                    placeholderTextColor={'gray'}
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Text style={{ color: 'white', marginBottom: 8 }}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder={'Password'}
                    placeholderTextColor={'gray'}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => newAccount ? createAccount() : signin()}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        {newAccount ? 'CREATE ACCOUNT' : 'SIGN IN'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.switchButton}
                    onPress={() => setNewAccount(!newAccount)}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', textDecorationLine: 'underline' }}>
                        {newAccount ? 'Already user? Sign In!' : 'Not an user? Create!'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Account;