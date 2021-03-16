import { firebase } from '@firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBap8JR98WjEzNPrhd8JqhKfNdMZK44J_g",
    authDomain: "deckofcardstest.firebaseapp.com",
    projectId: "deckofcardstest",
    storageBucket: "deckofcardstest.appspot.com",
    messagingSenderId: "1097262054592",
    appId: "1:1097262054592:web:89107de12ce2847c790125"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // some consts to use as references for future coding - makes life easier
const database = firebase.firestore()
const auth = firebase.auth()

export {
    database,
    auth
}