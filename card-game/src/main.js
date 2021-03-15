import Vue from "vue";
import App from "./App.vue";
import router from "./router";
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
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");