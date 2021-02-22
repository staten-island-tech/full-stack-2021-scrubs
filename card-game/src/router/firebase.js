import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBQ2s-OVvFfRHB8z8X6dxjqfkV3MRzdocU",
    authDomain: "apcompscicardgame.firebaseapp.com",
    projectId: "apcompscicardgame",
    storageBucket: "apcompscicardgame.appspot.com",
    messagingSenderId: "880409666274",
    appId: "1:880409666274:web:2d2460831bc4da788234bb",
    measurementId: "G-Q4NTPMJF1Z"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  // some consts to use as references for future coding - makes life easier
const database = firebase.firestore()
const auth = firebase.auth()

export {
    database,
    auth
}