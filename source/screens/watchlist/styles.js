import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222',
    },

    searchBar: {
        height: 40,
        width: '100%',
        backgroundColor: '#444',
        borderRadius: 10,
        marginBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },

    searchInput: {
        padding: 0,
        margin: 0,
        color: 'white',
        width: '80%'
    },

    title: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 16,
    },

    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 8,
        marginBottom: 32,
        borderRadius: 10,
        backgroundColor: '#222'
    },

    movieDescription: {
        height: 80,
        width: '100%',
        backgroundColor: '#000A',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        padding: 8,
    },

    movieTitle: {
        color: '#fff',
        fontWeight: 'bold',
    },

    movieOverview: {
        color: '#fff',
        fontWeight: '100',
        fontSize: 8,
    },

    movieRate: {
        margin: 8,
        height: 50,
        width: 50,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000A',
        borderRadius: 10,
    },

    rateText: {
        color: '#fff',
        fontSize: 8,
    },

    rate: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'tomato'
    },

    removeButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: '100%',
        borderRadius: 10,
        backgroundColor: 'tomato'
    }
});