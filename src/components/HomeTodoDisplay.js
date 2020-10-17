import React, { useState} from 'react'
import { Text, View, StyleSheet, CheckBox, TouchableOpacity, Modal} from 'react-native'
import TodoItem from '../components/TodoItem';

console.disableYellowBox = true

export default HomeTodoDisplay = ({list, updateList}) => {
    const initial = list.completed;
    const [isSelected, setSelection] = useState(initial);

    const [showListVisible, setVisible] = useState(false);

    function check(isSelected){
        setSelection(!isSelected);
        list.completed = isSelected;
        updateList(list);
    }

    return (
        <View>
            <Modal 
                animationType='slide' 
                visible={showListVisible}
                onRequestClose={() => setVisible(!showListVisible)}>

                <TodoItem list = {list} closeModal={() => setVisible(!showListVisible)} />
            </Modal>
            <TouchableOpacity 
              style={[styles.container, {backgroundColor: list.color}]}
              onPress={() => setVisible(!showListVisible)}>
                <CheckBox 
                style={styles.checkbox}
                value={isSelected}
                onValueChange={() => check(isSelected)}
                />
                <Text style={styles.title}>{list.title}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignContent: 'center',
      height: 50,
      width: 325,
      margin: 10,
      marginVertical: 8,
      borderRadius: 30,
      flexDirection: 'row',
      borderWidth: 1
    },
    title: {
        fontSize: 18,
        alignSelf: 'center',
        marginRight: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    checkbox: {
        fontSize: 20,
        alignSelf: 'center',
        marginLeft: 15,
        marginRight: 10,
    }
})