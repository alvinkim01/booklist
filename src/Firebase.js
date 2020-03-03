import * as firebase from 'firebase';
// import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};
const config = {
    apiKey: "AIzaSyB8HqHKGxyyha89S0QB3M26KXGyPJl_JHE",
    authDomain: "phone-book-66a5b.firebaseapp.com",
    databaseURL: "https://phone-book-66a5b.firebaseio.com",
    projectId: "phone-book-66a5b",
    storageBucket: "phone-book-66a5b.appspot.com",
    messagingSenderId: "77221388781",
    appId: "1:77221388781:web:9b34afda4aaee7a108c7e4",
    measurementId: "G-82X62HX4JE"
  };

  firebase.initializeApp(config);

  firebase.firestore().settings(settings);
  
  export default firebase;