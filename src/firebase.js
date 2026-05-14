import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyCU3mmUgQy-IcIU5u6-pGhmPJRVfWtSJvo",
    authDomain: "testing-bfc9f.firebaseapp.com",
    projectId: "testing-bfc9f",
    storageBucket: "testing-bfc9f.firebasestorage.app",
    messagingSenderId: "1089308197638",
    appId: "1:1089308197638:web:c7bdbddd3101ff97a09487",
    measurementId: "G-4BTC050HE1"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();
