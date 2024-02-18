import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAuX4VUPoSMCMCWx5cqC2aiQnafn3YK6oY",
    authDomain: "jun-website.firebaseapp.com",
    projectId: "jun-website",
    storageBucket: "jun-website.appspot.com",
    messagingSenderId: "535064904163",
    appId: "1:535064904163:web:80971aa75e0ea9f57e20d6"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
