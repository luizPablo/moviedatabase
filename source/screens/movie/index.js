import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ActivityIndicator,
    View,
    ImageBackground,
    Image,
    Text,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Feather';

import styles from './styles';
import api from '../../services/moviedb.js';
import constants from '../../services/constants.js';

const Movie = ({ route }) => {
    const movie = route.params.movie;

    const [loading, setLoading] = useState(true);
    const [movieDetail, setMovieDetail] = useState(null);
    const [actors, setActors] = useState(null);
    const [userLogged, setUserLogged] = useState(false);
    const [onWatchList, setOnWatchList] = useState(false);

    useEffect(() => {
        getMovieDetails();

        const checkUser = async () => {
            const user = await AsyncStorage.getItem(constants.DB_USER);

            if (user) {
                if (JSON.parse(user).watchList) {
                    if(JSON.parse(user).watchList.filter(el => el.id === movie.id).length > 0) {
                        setOnWatchList(true);
                    }
                }
                setUserLogged(true);
            }
        }

        checkUser();
    }, []);

    const getMovieDetails = async () => {
        try {
            const response = await api.get('/movie/' + movie.id);
            await getActors();
            setMovieDetail(response.data);
            setLoading(false);
        } catch (error) {
            alert('Something wrong! :(');
        }
    }

    const getActors = async () => {
        try {
            const response = await api.get('/movie/' + movie.id + '/credits');
            setActors(response.data.cast.slice(0, 15));
        } catch (error) {
            alert('Something wrong! :(');
        }
    }

    const setWatchList = async () => {
        const user = await AsyncStorage.getItem(constants.DB_USER);
        const objectUser = JSON.parse(user);

        const watchList = objectUser.watchList;
        if (watchList) {
            const hasMovie = watchList.filter(el => el.id === movie.id);
            const listWithoutMovie = watchList.filter(el => el.id !== movie.id);

            if (hasMovie.length > 0) {
                objectUser.watchList = listWithoutMovie;
                setOnWatchList(false);
            } else {
                objectUser.watchList.push(movie);
                setOnWatchList(true);
            }
        } else {
            objectUser.watchList = [movie];
            setOnWatchList(true);
        }

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
            <ImageBackground
                source={{ uri: constants.MOVIE_DB_IMAGE_URL + '/w1280' + movieDetail.backdrop_path }}
                blurRadius={5}
                style={styles.image}
            >
                <ScrollView style={styles.movieInfo} contentContainerStyle={{ padding: 16 }}>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Image
                                style={styles.poster}
                                source={{ uri: constants.MOVIE_DB_IMAGE_URL + '/w500' + movieDetail.poster_path }}
                            />
                            <View style={{ alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={{ color: 'white' }}>Runtime: {movieDetail.runtime} min</Text>
                                    <Text style={{ color: 'white' }}>Release: {movieDetail.release_date}</Text>
                                    <Text style={{ color: 'tomato', fontWeight: 'bold', fontSize: 18 }}>Rate: {movieDetail.vote_average}</Text>
                                </View>
                                {userLogged &&
                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={setWatchList}>
                                        <Text style={{ marginRight: 8, color: 'white' }}>On my watch list?</Text>
                                        <Icon name={onWatchList ? 'thumbs-up' : 'thumbs-down'} color={'tomato'} size={14} />
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                        <Text style={styles.movieTitle}>{movieDetail.title}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {movieDetail.genres.map((genre, index) => (
                            <Text style={styles.genre} key={index.toString()}>{genre.name}</Text>
                        ))}
                    </View>
                    <View style={{ marginTop: 16 }}>
                        <Text style={styles.movieOverview}>{movieDetail.overview}</Text>
                    </View>
                    <Text style={styles.movieTitle}>Actors</Text>
                    {
                        actors.map((actor, index) => (
                            <View key={index.toString()} style={styles.actorContainer}>
                                <Image
                                    style={styles.actor}
                                    source={{ uri: constants.MOVIE_DB_IMAGE_URL + '/w500' + actor.profile_path }}
                                />
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={{ color: 'white' }}>{actor.name}</Text>
                                    <Text style={{ color: 'white', fontSize: 8 }}>as {actor.character}</Text>
                                </View>

                            </View>
                        ))
                    }
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
};

export default Movie;