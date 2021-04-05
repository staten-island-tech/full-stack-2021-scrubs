import {
  firebase
} from '@firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyCQX_kaqDARgdz6veKLJYImO61f5a1yDug",
  authDomain: "card-game-9455b.firebaseapp.com",
  databaseURL: "https://card-game-9455b-default-rtdb.firebaseio.com",
  projectId: "card-game-9455b",
  storageBucket: "card-game-9455b.appspot.com",
  messagingSenderId: "676118164486",
  appId: "1:676118164486:web:66900cb4ab9fcd601f7f87"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// some consts to use as references for future coding - makes life easier
const db = firebase.firestore()
const auth = firebase.auth()

export {
  db,
  auth
}