import React from 'react';
import { View, Text, StyleSheet, TextInput} from 'react-native';
import { Feather } from '@expo/vector-icons';

console.disableYellowBox = true

const SearchBar = ({}) => {

    return (
        <View style={styles.backgroundStyle}>
            <Feather name="search" style={styles.iconSize}/>
            <TextInput 
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.inputStyle} 
              placeholder="Search"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: 'white',
        height: 45,
        borderRadius: 5,
        marginVertical: 15,
        marginHorizontal: 15,
        flexDirection: 'row',
        borderWidth: 1,
    },
    inputStyle: {
        flex: 1,
        fontSize: 18,
        marginRight: 20,
        fontWeight: 'bold'
    },
    iconSize: {
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 10,
    }
});

export default SearchBar;