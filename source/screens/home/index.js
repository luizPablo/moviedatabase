import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    ActivityIndicator,
    Text,
    FlatList,
    ImageBackground,
    TextInput
} from 'react-native';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';

import api from '../../services/moviedb.js';
import styles from './styles';
import constants from '../../services/constants.js';

const Home = ({ navigation }) => {
    const [page, setPage] = useState(1);

    const [movies, setMovies] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeSearch, setActiveSearch] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getPopularMovies();
    }, []);

    useEffect(() => {
        if (movies !== null && loading) {
            setLoading(false);
        }
    }, [movies]);

    useEffect(() => {
        if (search.length === 0) {
            setActiveSearch(false);
            setLoading(true);
            setPage(1);
            getPopularMovies();
        }
    }, [search]);

    const getPopularMovies = async () => {
        try {
            const response = await api.get('/movie/popular');
            setMovies(response.data.results);
        } catch (error) {
            alert('Something wrong! :(');
        }
    }

    const searchMovies = async () => {
        if (search.length > 0) {
            setPage(1);
            setLoading(true);
            try {
                const response = await api.get('/search/movie?page=1&include_adult=false&query=' + search);
                setMovies(response.data.results);
                setActiveSearch(true)
                setPage(page + 1);
            } catch (error) {
                alert('Something wrong! :(');
            }
        }
    }

    const loadMore = async () => {
        try {
            let response;
            if (activeSearch) {
                response = await api.get('/search/movie?page=1&include_adult=false&query=' + search + '&page=' + page);
            } else {
                response = await api.get('/movie/popular?page=' + (page + 1));
            }
            setMovies([...movies, ...response.data.results]);
            setPage(page + 1);
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
            <View style={styles.searchBar}>
                <TextInput
                    value={search}
                    placeholder={'Search...'}
                    style={styles.searchInput}
                    placeholderTextColor={'#222'}
                    onChangeText={text => setSearch(text)}
                />
                <TouchableOpacity onPress={searchMovies}>
                    <Text
                        style={{
                            fontSize: 10,
                            fontWeight: 'bold',
                            color: 'white'
                        }}
                    >
                        SEARCH
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>{activeSearch ? 'Search result' : 'Popular Movies'}</Text>
            <FlatList
                style={{ width: '100%' }}
                showsVerticalScrollIndicator={false}
                data={movies}
                onEndReachedThreshold={0.1}
                onEndReached={loadMore}
                renderItem={({ item, index }) => (
                    <TouchableWithoutFeedback key={index.toString()} style={{elevation: 10}}>
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
                )}
            />
        </SafeAreaView>
    )
};

export default Home;