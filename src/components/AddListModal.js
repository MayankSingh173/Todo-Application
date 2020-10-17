import React, { Component } from 'react'
import { Text, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput, Alert, ImageBackground} from 'react-native'
import { AntDesign } from '@expo/vector-icons';

console.disableYellowBox = true

export default class AddListModal extends Component {

    backgroundColors = ["#5CD859","#24A6D9","red","#8022D9","pink","#ff00ff","#F4A460","gold"];

    state = {
        name: '',
        color: randomRgb(),
        description: ''
    };

    createTodo() {
        const {name: title, color, description} = this.state;

        if(title == "" || description == ""){
            Alert.alert("Name or Description can't be empty")
            return;
        }
        
        const list = {title, color, description}

        this.props.addList(list);

        this.setState({name: '', description: ''})
        this.props.closeModal();
    }

    renderColors(){
        return this.backgroundColors.map(color => {
            return (
                <TouchableOpacity
                  key={color}
                  style={[styles.colorSelect, {backgroundColor: color}]}
                  onPress={() => this.setState({ color })}
                />
            );
        });
    }

    render() {
        return (
            <ImageBackground source={require('../Images/pencil.png')} style={styles.container} behavior="padding">
                <TouchableOpacity style={{ position: 'absolute', top:30, right: 32}} onPress={this.props.closeModal}>
                    <AntDesign name="close" size={24}/>
                </TouchableOpacity>

                <View style={{ alignSelf: 'stretch', marginHorizontal: 32}}>
                    <Text style={styles.title}>Create Todo List</Text>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Title</Text>
                    <TextInput
                      style={styles.input} 
                      placeholder="Enter ToDo"
                      onChangeText={(text) => this.setState({ name: text })}
                      value={this.state.name}
                    />

                    <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 20}}>Description</Text>
                    <TextInput 
                      style={styles.input} 
                      placeholder="Enter description "
                      onChangeText={(text) => this.setState({ description: text })}
                      value={this.state.description}
                    />
                    
                    <View style = {{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                        {this.renderColors()}
                    </View>

                    <TouchableOpacity 
                       style={[styles.create, {backgroundColor: this.state.color} ]} 
                       onPress={() => this.createTodo()}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Create</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

const randomRgb = () => {
    const red = Math.floor(Math.random()*256);
    const green = Math.floor(Math.random()*256);
    const blue = Math.floor(Math.random()*256);

    return `rgb(${red},${green},${blue})`;
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 16,
    },
    input: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 6,
        height: 50,
        paddingHorizontal: 16,
        marginTop: 8,
        fontSize: 18,
    },
    create: {
        marginTop: 24,
        height: 50,
        alignItems: 'center',
        borderRadius: 6,
        justifyContent: 'center',
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 6
    }    
});
