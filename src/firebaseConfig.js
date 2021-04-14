import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyD-aO86MWraXkc3BWnwKraUoTxED3kT3Ys",
  authDomain: "todo-app-neogcamp.firebaseapp.com",
  projectId: "todo-app-neogcamp",
  storageBucket: "todo-app-neogcamp.appspot.com",
  messagingSenderId: "325578282408",
  appId: "1:325578282408:web:f5c2a9b76cd43e2ccaf99d",
  measurementId: "G-MTSPPZPW5L",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { db };
