// src/firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBrgyBvuhEWfgcF9WQAvCZt4yjWSuWhi2A",
    authDomain: "taskxpert-b038c.firebaseapp.com",
    projectId: "taskxpert-b038c",
    storageBucket: "taskxpert-b038c.firebasestorage.app",
    messagingSenderId: "239313087527",
    appId: "1:239313087527:web:d0c61aad5c0696c856b202",
    measurementId: "G-1XN90JBSY7"
};

export const app = initializeApp(firebaseConfig);


// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyBrgyBvuhEWfgcF9WQAvCZt4yjWSuWhi2A",
//     authDomain: "taskxpert-b038c.firebaseapp.com",
//     projectId: "taskxpert-b038c",
//     storageBucket: "taskxpert-b038c.firebasestorage.app",
//     messagingSenderId: "239313087527",
//     appId: "1:239313087527:web:d0c61aad5c0696c856b202",
//     measurementId: "G-1XN90JBSY7"
// };

// // Initialize Firebase app
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// export { app, auth };
