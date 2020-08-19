import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ActivityIndicator,
    View,
    ImageBackground,
    Image,
    Text,
} from 'react-native';

import styles from './styles';
import api from '../../services/moviedb.js';
import constants from '../../services/constants.js';

const Movie = ({ route }) => {
    const movie = route.params.movie;

    const [loading, setLoading] = useState(true);
    const [movieDetail, setMovieDetail] = useState(null);

    useEffect(() => {
        getMovieDetails();
    }, []);

    const getMovieDetails = async () => {
        try {
            const response = await api.get('/movie/' + movie.id);
            setMovieDetail(response.data);
            setLoading(false);
        } catch (error) {
            alert('Something wrong! :(');
        }
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
                <View style={styles.movieInfo}>
                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Image
                                style={styles.poster}
                                source={{ uri: constants.MOVIE_DB_IMAGE_URL + '/w500' + movieDetail.poster_path }}
                            />
                            <View style={{alignItems: 'flex-end', justifyContent: 'center'}}>
                                <Text style={{color: 'white'}}>Runtime: {movieDetail.runtime} min</Text>
                                <Text style={{color: 'white'}}>Release: {movieDetail.release_date}</Text>
                                <Text style={{color: 'tomato', fontWeight: 'bold', fontSize: 18}}>Rate: {movieDetail.vote_average}</Text>
                            </View>
                        </View>
                        <Text style={styles.movieTitle}>{movieDetail.title}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        {movieDetail.genres.map((genre, index) => (
                            <Text style={styles.genre} key={index.toString()}>{genre.name}</Text>
                        ))}
                    </View>
                    <View style={{marginTop: 16}}>
                        <Text style={styles.movieOverview}>{movieDetail.overview}</Text>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
};

export default Movie;