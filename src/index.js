import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0xwhq3gu3Ds5Hr5kjbei3SHXsBMdHjJM",
  authDomain: "elaisa-a5e5d.firebaseapp.com",
  projectId: "elaisa-a5e5d",
  storageBucket: "elaisa-a5e5d.appspot.com",
  messagingSenderId: "801362232037",
  appId: "1:801362232037:web:222cb50ae1ba2871acca0c",
  measurementId: "G-SWRL28XWHT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
