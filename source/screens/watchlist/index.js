import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    ActivityIndicator,
    Text,
    FlatList,
    ImageBackground,
} from 'react-native';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import constants from '../../services/constants.js';

const WatchList = ({ navigation }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getWatchList = async () => {
            const user = await AsyncStorage.getItem(constants.DB_USER);
            const objectUser = JSON.parse(user);

            if (objectUser.watchList) {
                setMovies(objectUser.watchList);
                setLoading(false);
            }
        }

        getWatchList()
    }, []);

    const removeMovie = async movie => {
        const newMovies = movies.filter(el => el.id !== movie.id);
        setMovies(newMovies);

        const user = await AsyncStorage.getItem(constants.DB_USER);
        const objectUser = JSON.parse(user);
        objectUser.watchList = newMovies;
        await AsyncStorage.setItem(constants.DB_USER, JSON.stringify(objectUser));
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#222' }}>
                <ActivityIndicator size={'small'} color={'tomato'} />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {movies.length === 0 &&
                <Text style={{ color: 'white', fontSize: 18 }}>Your watch list is empty!</Text>
            }
            <FlatList
                style={{ width: '100%' }}
                showsVerticalScrollIndicator={false}
                data={movies}
                renderItem={({ item, index }) => (
                    <>
                        <TouchableOpacity style={styles.removeButton} onPress={() => removeMovie(item)}>
                            <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>Remove from Watch List</Text>
                        </TouchableOpacity>
                        <TouchableWithoutFeedback
                            key={index.toString()}
                            style={{ elevation: 10 }}
                            onPress={() => navigation.navigate('Movie', { movie: item })}
                        >
                            <ImageBackground
                                source={{ uri: constants.MOVIE_DB_IMAGE_URL + '/w780' + item.backdrop_path }}
                                style={styles.image}
                                imageStyle={{ borderRadius: 10 }}
                            >
                                <View style={styles.movieRate}>
                                    <Text style={styles.rateText}>Rate</Text>
                                    <Text style={styles.rate}>{item.vote_average}</Text>
                                </View>
                                <View style={styles.movieDescription}>
                                    <Text style={styles.movieTitle}>{item.title}</Text>
                                    <Text style={styles.movieOverview}>
                                        {item.overview.substring(0, 100) + '...'}
                                    </Text>
                                </View>
                            </ImageBackground>
                        </TouchableWithoutFeedback>
                    </>
                )}
            />
        </SafeAreaView>
    )
};

export default WatchList;