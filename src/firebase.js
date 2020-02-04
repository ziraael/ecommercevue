import firebase from 'firebase'
require("firebase/firestore");
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDkqaIFTqx6drKvigXoP1UOQPfbR6vMH2A",
  authDomain: "e-commerce-shop-96eae.firebaseapp.com",
  databaseURL: "https://e-commerce-shop-96eae.firebaseio.com",
  projectId: "e-commerce-shop-96eae",
  storageBucket: "e-commerce-shop-96eae.appspot.com",
  messagingSenderId: "88264686656",
  appId: "1:88264686656:web:f58ed96ea9e225c10b73a5"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export{fb,db};
