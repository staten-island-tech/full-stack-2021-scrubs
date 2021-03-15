import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCJbc-hpm9TgE4UAJv1CPqm784EwwGessY",
    authDomain: "auth-46878.firebaseapp.com",
    projectId: "auth-46878",
    storageBucket: "auth-46878.appspot.com",
    messagingSenderId: "1070842963615",
    appId: "1:1070842963615:web:6e9206051334e0080364aa"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
const db = firebase.firestore()

db.settings({
    timestampsInSnapshots: true
})

export default db;