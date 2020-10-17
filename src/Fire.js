import firebase from 'firebase';
import '@firebase/firestore';

console.disableYellowBox = true
const firebaseConfig = {
    apiKey: "AIzaSyAGhZkf2SHOPmzQGbgshhPgbf-wXVStW8s",
    authDomain: "todo-app-258ba.firebaseapp.com",
    databaseURL: "https://todo-app-258ba.firebaseio.com",
    projectId: "todo-app-258ba",
    storageBucket: "todo-app-258ba.appspot.com",
    messagingSenderId: "990914433924",
    appId: "1:990914433924:web:da630df92864d3ab5543d1",
    measurementId: "G-LRE5P15XG1"
  };
//   Initialize Firebase
  firebase.initializeApp(firebaseConfig);
let lists = []

class Fire {

    constructor(callback){
        this.init(callback);
    }

    init(callback) {
        // if(!firebase.app.length){
        //     firebase.initializeApp(firebaseConfig);
        // }
        firebase.auth().onAuthStateChanged( user => {
            if(user){
                callback(null, user);
            }
            else{
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error => {
                        callback(error)
                    });
            }
        })
    }


    getLists(callback){

        let ref = this.ref.orderBy('title')
        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = []
            snapshot.forEach(doc => {
                lists.push({id: doc.id, ...doc.data()})
            });
            callback(lists)
        })
    }

    addList(list){
        let ref = this.ref;
        ref.add(list);
    }

    updateList(list){
        let ref = this.ref;
        ref.doc(list.id).update(list);
    }

    get userId(){
        return firebase.auth().currentUser.uid;
    }

    get ref(){
        return firebase.firestore().collection('users').doc(this.userId).collection('Lists');
    }
    
    detach(){
        this.unsubscribe()
    }

}

export default Fire