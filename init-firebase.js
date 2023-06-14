import {createFirestoreData, deleteFirestoreData, readFirestoreData, updateFirestoreData} from "/crud.js";
import {filterFirestoreDataUser} from "/filter.js";
import {googleSignInFunc, googleSignOutFunc} from "/googleAuth.js";
import {readFirebaseStorage} from "/storage.js";

//const analytics = getAnalytics(app);

document.querySelector("#google-sign-in")?.addEventListener("click", function () {
    googleSignInFunc();
});

document.querySelector('#google-sign-out')?.addEventListener("click", function () {
    googleSignOutFunc();
});


//readFirebaseStorage();

// 新增資料到 Firestore 中
//  createFirestoreData();

// 從 Firestorm 中讀取資料
// readFirestoreData();

// 更新 Firestore 的資料
//  updateFirestoreData();

// 在 Firestore 中刪除資料
//  deleteFirestoreData();

// 從 Firestorm 中讀取資料前做過濾條件
//  filterFirestoreData();