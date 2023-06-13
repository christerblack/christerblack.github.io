import { getDownloadURL, getStorage, ref } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

import { app } from "/firebaseConfig.js";

const auth = getAuth(app);
const user = auth.currentUser;

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

const videoID = "1_1.mp4";
function loadVideoandsrt(e) {

    let data_video = $(e).attr("data-video");
    const data_srt = $(e).attr("datasrt");
    const srtSrc = document.getElementById("srtSrc1");
   
    if (srtSrc !== null) {
    srtSrc.setAttribute("src", data_srt);
    
    }

    readFirebaseStorage(data_video);
}

export function readFirebaseStorage(data_video) {
    videoID = `${data_video}`;

    var videoID
    if (videoID == "undefined") {
        videoID = "1_1.mp4";
        //console.log("Please choose a video to play");

    } else {
        videoID = `${data_video}`;

    }
    //if (auth.currentUser.uid) {
    // Create a storage reference from our storage service
    getDownloadURL(ref(storage, videoID))

        .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'
            // This can be downloaded directly:
            const xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = function (event) {
                const blob = xhr.response;
                console.log(blob);
            };
            xhr.open("GET", url);

            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*'); // localhost 本来是 * allow anywhere
            xhr.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xhr.setRequestHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            xhr.setRequestHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
           // xhr.send(null);

            // Or inserted into an <img> element
            const video = document.getElementById("video1");

            video.setAttribute("src", url);
            console.log(url)


        })


        .catch((error) => {
            console.log(error);
        });


}

window.loadVideoandsrt = loadVideoandsrt;
