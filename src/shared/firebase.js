// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBSM4oKzMhwsQ3GMsd7grz40zYVIKQyfpc",
    authDomain: "mini-project-week6.firebaseapp.com",
    projectId: "mini-project-week6",
    storageBucket: "mini-project-week6.appspot.com",
    messagingSenderId: "377733468644",
    appId: "1:377733468644:web:3b8e288ddc1e763890b7f1",
    measurementId: "G-LV50LZP4RN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const storage = getStorage(app);
export default app;