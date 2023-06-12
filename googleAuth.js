// Firebase Authentication
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

import {app} from "/firebaseConfig.js";

// Auth
const auth = getAuth(app);
const providerGoogle = new GoogleAuthProvider();

export function googleSignInFunc() {
    signInWithPopup(auth, providerGoogle)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            /**
             * After Sign in we can get infomation from firebase
             * 1. Google provider credential
             * 2. token
             * 3. user info, google name, google profile picture.
             * i save all info to local storage.
             */
            localStorage.setItem("googleCredential", JSON.stringify(credential));
            localStorage.setItem("googleToken", token);
            localStorage.setItem("googleUser", JSON.stringify(user));
            //console.log(credential);
            //console.log(token);
            //console.log(user);
            //console.log(user.uid + user.displayName);
            window.location.href = "home1.html";
            createFirestoreData(user.uid, user.displayName);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
}

export function googleSignOutFunc() {
    //console.log("googleSignOutFunc");
    signOut(auth)
        .then(() => {
            // removeItem
            localStorage.removeItem("googleCredential");
            localStorage.removeItem("googleToken");
            localStorage.removeItem("googleUser");
            window.location.href = "index.html";
        })
        .catch((error) => {
            // An error happened.
        });
}


import {
    collection,
    query,
    where,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    setDoc,
    addDoc,
    updateDoc,
    writeBatch
  } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
  
  
  const firestoreDB = getFirestore(app);
  
  // Create Data
  async function createFirestoreData(useruid, userdisplayname) {
    // const citiesRef = collection(firestoreDB, "users");
  
    //const user = localStorage.getItem("googleUser");
    const usernameUid =useruid;
    const username = userdisplayname;
    
    await addDoc(collection(firestoreDB, "AllUsers"), {
      useruid: `${usernameUid}`,
      name: `${username}`,
      timestamp: new Date().getTime(),
      datetime: new Date(),
    });
    console.log("Record users success");
  }