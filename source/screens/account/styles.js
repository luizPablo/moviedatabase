import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222',
        padding: 16,
    },

    textCall: {
        fontSize: 18,
        color: 'white'
    },

    formBox: {
        backgroundColor: '#444',
        marginTop: 16,
        borderRadius: 10,
        width: '90%',
        padding: 16
    },

    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 0,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 10,
        marginBottom: 16,
        height: 40,
        color: 'white'
    },

    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 10,
        backgroundColor: 'tomato'
    },

    switchButton: {
        marginTop: 16,
        justifyContent: 'center',
        alignItems: 'center',
    }
});