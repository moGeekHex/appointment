import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDdg3RSXndrPq6iYnZX26RELmZEq-xeaoE",
  authDomain: "appointment-832ca.firebaseapp.com",
  databaseURL: "https://appointment-832ca.firebaseio.com",
  projectId: "appointment-832ca",
  storageBucket: "appointment-832ca.appspot.com",
  messagingSenderId: "963721858239"
};
firebase.initializeApp(config);

export default firebase;
