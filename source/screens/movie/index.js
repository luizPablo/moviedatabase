import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Button
} from 'react-native';

const Movie = ({ navigation }) => {
    return (
        <SafeAreaView>
            <View>
                <Text>Movie Screen</Text>
                <Button
                    title='Go to Home'
                    onPress={() => navigation.popToTop()}
                />
            </View>
        </SafeAreaView>
    )
};

export default Movie;