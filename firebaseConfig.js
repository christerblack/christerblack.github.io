import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
//"firebase-admin/app"; 

const firebaseConfig = {
    apiKey: "AIzaSyD52_JnzcDfyl-tmfQKjYA0Aw7WilxKaSQ",
    authDomain: "collocation-acd13.firebaseapp.com",
    projectId: "collocation-acd13",
    storageBucket: "collocation-acd13.appspot.com",
    messagingSenderId: "228338405560",
    appId: "1:228338405560:web:b8444f04f38295c0f7a44d",
    measurementId: "G-CZ3CP12NK3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);