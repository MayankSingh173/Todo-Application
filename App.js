import React from 'react';
import { StyleSheet, Text, View, FlatList, Modal, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';
import SearchBar from './src/components/SearchBar';
import AddListModal from './src/components/AddListModal';
import HomoTodoDisplay from './src/components/HomeTodoDisplay';
import Fire from './src/Fire';

console.disableYellowBox = true

export default class App extends React.Component {

    state = {
      addTodoVisible: false,
      lists: [],
      user: {},
      loading: true
    };

    componentDidMount(){
      firebase = new Fire((error, user) => {
        if(error){
          return alert("Something went wrong");
        }

        firebase.getLists(lists => {
          this.setState({lists, user},() => {
            this.setState({loading: false})
          })
        })
        this.setState({user})
      });
    }

    

    toggleAddTodoModal() {
      this.setState({addTodoVisible: !this.state.addTodoVisible})
    }

    //Call back function to add list
    addList = list => {
      firebase.addList({
        title: list.title,
        color: list.color,
        description: list.description,
        completed: false,
      })
    }
    
    updateList = list => {
      list.completed = !list.completed;
      firebase.updateList(list)
    }

   render() {
     if(this.state.loading){
       return(
         <View style={[styles.container,{justifyContent: 'center'}]}>
           <ActivityIndicator size="large" color= 'red' />
         </View>
       );
     }
     const completedCount = this.state.lists.filter(todo => todo.completed).length;
     const remainingCount = this.state.lists.filter(todo => !todo.completed).length;
    return (
      <View style={styles.container}>

        <Modal 
          animationType='slide' 
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}>
          <AddListModal closeModal={() => this.toggleAddTodoModal()} addList = {this.addList}/>
        </Modal>

        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title}>
            Todo <Text style={{ fontWeight: '500', color: 'rgb(53,225,197)'}}>Lists</Text>
          </Text>
          <View style={styles.divider}></View>
        </View>

        <SearchBar updateList={this.updateList}/>

        <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
          <View style={[styles.status, {backgroundColor: '#4dffb8'}]}>
            <Text style={styles.statusText}>Completed : {completedCount}</Text>
          </View>
          <View style={{width: 10}}></View>
          <View style={[styles.status, {backgroundColor: 'tomato'}]}>
            <Text style={styles.statusText}>Remaining : {remainingCount}</Text>
          </View>
        </View>
        <ImageBackground source={require('./src/Images/todoBack.png')} style={{margin: 10, height: 480}}>
          <View style={styles.line}></View>
          { (this.state.lists.length <= 0) ? <View  style={{margin: 10, height: 430, justifyContent: 'center'}}><Text style={styles.textStyle}>Your ToDo list is Empty...Please Add todos!!😊</Text></View> : 
            <FlatList 
              data={this.state.lists}
              keyExtractor = {(item) => item.id.toString()}
              showsVerticalScrollIndicator= {false}
              renderItem= {({item}) => {
                return <HomoTodoDisplay list={item} updateList={this.updateList}/>
              }}
            />
          }
          <View style={styles.line}></View>
        </ImageBackground>
        <TouchableOpacity
          style = {styles.add}
          onPress = {() => this.toggleAddTodoModal()}>
          <Text style={{textAlign:'center',fontSize: 25, color: 'white'}}>Add</Text>
        </TouchableOpacity>

      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  divider: {
    backgroundColor: 'rgb(53,225,197)',
    flex: 1,
    height: 2,
    alignSelf: 'flex-start',
    marginTop: 70
  },
  title: {
    fontSize: 38,
    color: 'black',
    marginTop: 43,
    fontWeight: 'bold',
    paddingHorizontal: 20
  },
  status: {
    height: 40,
    width: 155,
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    elevation: 5
  },
  statusText: {
    alignSelf: "center",
    fontSize: 17,
    fontWeight: 'bold',
    // color: 'white'
  },
  add: {
    height: 40,
    width: 320,
    backgroundColor: 'green',
    borderRadius: 5,
    justifyContent: 'center',
    elevation: 8
  },
  line: {
    backgroundColor: 'black',
    height: 2,
    width: 300,
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: 35
  }
})

