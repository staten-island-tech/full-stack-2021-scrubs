import { firebase } from "@firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { APIKEY } from "./pseudo-env.js";
import { AUTHDOMAIN } from "./pseudo-env.js";
import { PROJECTID } from "./pseudo-env.js";
import { STORAGEBUCKET } from "./pseudo-env.js";
import { MESSAGINGSENDERID } from "./pseudo-env.js";
import { APPID } from "./pseudo-env.js";

var firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.firestore();
export { auth, database };
