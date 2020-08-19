import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#222',
    },

    image: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderRadius: 10,
        backgroundColor: '#222',
    },

    movieInfo: {
        flex: 1,
        width: '100%',
        height: 300,
        padding: 16,
        backgroundColor: '#222A'
    },

    movieTitle: {
        color: 'white',
        fontSize: 18,
        marginTop: 16,
        fontWeight: 'bold'
    },

    movieOverview: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'normal',
    },

    genre: {
        backgroundColor: 'tomato',
        padding: 2,
        paddingLeft: 8,
        paddingRight: 8,
        marginRight: 4,
        marginTop: 8,
        borderRadius: 10,
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold'
    },

    poster: {
        width: 150,
        height: 220,
        resizeMode: 'cover',
        borderRadius: 10,
        backgroundColor: '#222',
    },
});