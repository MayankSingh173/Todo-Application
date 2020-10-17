import React, { Component } from 'react'
import { Text, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput, ImageBackground} from 'react-native'
import { AntDesign } from '@expo/vector-icons';

console.disableYellowBox = true

export default class TodoItem extends React.Component{

    state = {
        title: this.props.list.title,
        description: this.props.list.description,
        color: this.props.list.color
    }



    render() {
        return(
            <View style={styles.container} behavior="padding">
                <TouchableOpacity style={{ position: 'absolute', top:30, right: 32, zIndex: 10}} onPress={this.props.closeModal}>
                    <AntDesign name="close" size={24}/>
                </TouchableOpacity>

                <View style={{marginTop: 60}}>
                    <Text style={styles.title}>{this.state.title}</Text>
                </View>
                <View style={[styles.divider,{backgroundColor: this.state.color}]}></View>
                <View style={[styles.input, {height: 520}]}>
                    <TextInput
                    placeholder={this.state.description} 
                    style={styles.input}
                    multiline={true}
                    editable={false}
                    placeholderTextColor ='black'
                    />
                </View>
                <TouchableOpacity
                        style = {[styles.delete,{backgroundColor: this.state.color}]}
                        onPress = {this.props.closeModal}>
                        <Text style={{textAlign:'center',fontSize: 25, color: 'white'}}>Delete</Text>
                </TouchableOpacity>
                {/* <Text style={styles.input}>{this.state.description}</Text> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    title: {
        fontSize: 30,
        marginHorizontal: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    divider: {
        width: 340,
        height: 3,
        marginHorizontal: 20,
        marginVertical: 10
    },
    input: {
        margin: 10,
        marginLeft: 10,
        fontSize: 20,
        // fontWeight: 'bol',
        color: 'lightgrey'
    },
    delete: {
        height: 40,
        width: 330,
        borderRadius: 30,
        justifyContent: 'center',
        alignSelf: 'center',
        elevation: 8
      },
})