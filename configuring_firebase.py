require("dotenv").config();
console.log(process.env);
var config = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  storageBucket: process.env.STORAGEBUCKET,
};
firebase.initializeApp(config);
