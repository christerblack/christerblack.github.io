import { collection, addDoc, orderBy, setDoc, onSnapshot, getDocs, updateDoc, getDoc, getFirestore, doc, query, where } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

import { app } from "/firebaseConfig.js";
import { readFirestoreData } from "./crud.js";


const firestoreDB = getFirestore(app);

var url_string = window.location.href;
var url = new URL(url_string);
var str = url.search;
str = str.slice(14);
//console.log(str);  // text id 
filterFirestoreDataUser(str);
//updateFirestoreData(str)

export async function filterFirestoreDataUser(str) {
  const textid = str;

  const citiesRef = collection(firestoreDB, "TargetText");
 
  const querySnapshot = await getDoc(doc(firestoreDB, "TargetText", `${textid}`));

  if (querySnapshot.exists()) {
    // console.log(querySnapshot.data())
  }
  else {
    console.log("No such document")
  }

  // clear
  const username = querySnapshot.data().name;
  const target = querySnapshot.data().targetText;
  const example = querySnapshot.data().ExampleSentence;
  const origin = querySnapshot.data().originText;
  const like = querySnapshot.data().like;
  const dislike = querySnapshot.data().dislike;


  document.querySelector("#username").innerHTML += username;
  document.querySelector("#targertext").innerHTML += target;
  document.querySelector("#examplesentence").innerHTML += example;
  document.querySelector("#originsentence").innerHTML += origin;
  document.getElementById('counterdislike').innerHTML = dislike;
  document.getElementById('counterlike').innerHTML = like;

}


// handle like 
let like_flag = false;
let dislike_flag = false;
function liked(event) {
  like_flag == false;
  var url_string = window.location.href;
  var url = new URL(url_string);
  var str = url.search;
  str = str.slice(14);

  // 进来网页的时候 要读取 最新的资料 like和dislike 
  let like = parseFloat(document.getElementById("counterlike").innerHTML);

  if (dislike_flag !== true) {
    if (like_flag == false) {
      like++;
      like_flag = true;
    } else {
      like--;
      like_flag = false;
    }
  }

  console.log('the button ' + 'like' + ' was pressed' + like);

  updateFirestoreDatalike(str, like)
  realtimeupdatelike(str, like)

}

// handle dislike
function disliked(event) {
  var url_string = window.location.href;
  var url = new URL(url_string);
  var str = url.search;
  str = str.slice(14);

  let dislike = parseFloat(document.getElementById('counterdislike').innerHTML);

  if (like_flag !== true) {
    if (dislike_flag == false) {
      dislike++;
      dislike_flag = true;
    }
    else {
      dislike--;
      dislike_flag = false;
    }
  }

  console.log('the button ' + 'dislike' + ' was pressed' + dislike);
  realtimeupdatedislike(str, dislike)
  updateFirestoreDatadislike(str, dislike)

  document.getElementById('counterdislike').innerText = dislike;

}


//updateFirestoreData  like 
export async function updateFirestoreDatalike(str, count) {
  const textid = str;
  const count1 = count;

  const docRef = doc(firestoreDB, "TargetText", textid);

  updateDoc(docRef, {
    like: count1,
    commentliketimestamp: new Date().getTime(),
    commentdate: new Date(),
  })

  console.log("update finished");

}

//updateFirestoreData dislike
export async function updateFirestoreDatadislike(str, count1) {
  const textid = str;
  const aaa = count1;

  const docRef = doc(firestoreDB, "TargetText", textid);

  updateDoc(docRef, {
    dislike: aaa,
    commentdisliketimestamp: new Date().getTime(),
    commentdate: new Date(),
  })

  console.log("update finished");

}

//realtimeupdate like
export async function realtimeupdatelike(str, count) {
  const textid = str;
  const countlike = count

  onSnapshot(doc(firestoreDB, "TargetText", textid), (doc) => {
    const like = doc.data().like
    console.log("Current data: ", doc.data().like, doc.data().dislike);
    const totallike = Number(Number(like) + Number(countlike))
    console.log("Total like: " + totallike)


    document.getElementById('counterlike').innerText = like;
  });

  console.log("realtime update finished");
}

//realtimeupdate dislike
export async function realtimeupdatedislike(str, count1) {
  const textid = str;
  const dislikecount = count1
  console.log(dislikecount)

  onSnapshot(doc(firestoreDB, "TargetText", textid), (doc) => {
    console.log("Current data: ", doc.data().like, doc.data().dislike);
    const dislike = doc.data().dislike


    document.getElementById('counterdislike').innerText = dislike;
  });
  console.log("realtime update finished");
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}

// reply comment of post 
document.getElementById("comment").addEventListener("click", getcomment);

async function getcomment() {
  $("#replycomment").removeAttr('style');
  const target = document.querySelector("#targertext").innerHTML;
  const strsplit = target.split(": ");

  const textinput = document.querySelector('#TextInputField').value;
  const user = localStorage.getItem("googleUser");
  const usernameUid = JSON.parse(user).uid;
  const username = JSON.parse(user).displayName;

  const datetime = formatDate(new Date());

  document.querySelector('#TextInputField').value = " ";

  const randomid = Math.floor(Math.random() * 100000);

  const newlist =
    `<div id="${randomid}">` +
    "<div class='d-flex flex-row align-items-center commented-user' >" +
    "<h5 class='mr-2' id='username'>" +
    username + "</h5>" +
    "<p id='datetimeshow'>" +
    datetime + "</p>" +
    "</div>" +
    "<div class='comment-text-sm' id='Comment Sentence'>" + textinput + "</div>" +
    "<div class='reply-section' >" +
    "<div class='d-flex flex-row align-items-center voting-icons' id='replycomment' >" +
    `<button class="btn btn-primary" id="buttonreply-${randomid}" type="button" onclick="replyspanhtml(this)" data-id="${randomid}" >Reply</button>` +
    `<div class='d-flex flex-row add-comment-section mt-4 mb-4' id='replyandreply-${randomid}' style='visibility:hidden' >` +
    `<input type='text' id='TextInputFieldUserPost-${randomid}' data-id="${randomid}" class='form-control mr-md-4' placeholder='Press Enter to reply' >` +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";
  $("#CommentCreate")[0].insertAdjacentHTML("afterbegin", newlist);

  const replyDiv = document.createElement('div');
  replyDiv.id = `ReplyDiv-${randomid}`;
  replyDiv.style = "margin-left: 15%";
  $(`#${randomid}`)[0].appendChild(replyDiv);


  const docRef = await createFirestoreData(str, strsplit[1], textinput, username, usernameUid);
  console.log(docRef.id);

  const text = document.querySelector(`#TextInputFieldUserPost-${randomid}`);
  text.addEventListener('keypress', (e) => getreplycomment(e, docRef));

  console.log("Create Finish")

}

//document.getElementById("buttonreply")?.addEventListener("click", replyspanhtml(e));
function replyspanhtml(e) {
  //console.log(e, e.dataid)
  const buttonid = e.getAttribute('data-id');
  console.log(buttonid);  // 
  $(`#replyandreply-${buttonid}`).removeAttr('style');
  $('#TextInputFieldUserPost').data('data-id', buttonid); //setter

  console.log("work!")
}

// reply comment of user comment 
async function getreplycomment(e, docRef) {
  console.log(docRef)
  console.log(e, e.target.dataset.id)
  let buttonid1 = e.target.dataset.id;
  console.log(typeof (buttonid1));
  $('#TextInputFieldUserPost').data('data-id', buttonid1); //setter
  console.log(e.keyCode);
  if (e.keyCode === 13) {
    const textinput = document.querySelector(`#TextInputFieldUserPost-${buttonid1}`).value;
    const user = localStorage.getItem("googleUser");
    const username = JSON.parse(user).displayName;
    const datetime = formatDate(new Date());

    var card = document.createElement("div");
    card.setAttribute("class", "d-flex flex-row align-items-center voting-icons"); // list
    card.setAttribute("id", "replycommentpost");
    card.setAttribute("style", "margin-left: 13px;");
    document.querySelector(`#ReplyDiv-${buttonid1}`).appendChild(card);

    var cardtitle = document.createElement("h5");
    cardtitle.setAttribute("class", "mr-2");
    cardtitle.setAttribute("id", "ReplyUsername");
    card.appendChild(cardtitle);
    var cardtitleDate = document.createElement("p");
    cardtitleDate.setAttribute("id", "Replydatetimeshow");
    card.appendChild(cardtitleDate);

    var cardbody = document.createElement("div");
    cardbody.setAttribute("class", "comment-text-sm");
    cardbody.setAttribute("id", "ReplyCommentShow");
    var cardbodycomment = document.createElement("p");
    cardbodycomment.setAttribute("id", "postcomment");
    cardbody.appendChild(cardbodycomment);
    document.querySelector(`#ReplyDiv-${buttonid1}`).appendChild(cardbody);
    $("#replycommentpost").removeAttr('style');

    cardbodycomment.innerHTML = textinput;
    cardtitleDate.innerHTML = datetime;
    cardtitle.innerHTML = username;

    const replyDiv = document.getElementById(`ReplyDiv-${buttonid1}`);
    replyDiv.appendChild(cardtitle);
    replyDiv.appendChild(cardtitleDate);
    replyDiv.appendChild(cardbody);

    const reply = { User: username, Date: datetime, Comment: textinput };

    // set data
    const docSnap = await getDoc(docRef);
    const replies = docSnap.data().replies;

    if (replies) {
      replies.push(reply);
      await updateDoc(docRef, {
        replies: replies
      });
    } else {
      await updateDoc(docRef, {
        replies: [reply]
      });
    }


    document.querySelector(`#TextInputFieldUserPost-${buttonid1}`).value = " ";
    console.log("work!")
  }
};
all(str)
async function all(str) {


  const buttonid = $("#buttonreply").attr("data-id")

  const ref = query(collection(firestoreDB, "Comments"), where("targettextid", "==", str),orderBy("datetime"));

  const querySnapshot = await getDocs(ref);

  querySnapshot.forEach((doc) => {
   
    const randomid = Math.floor(Math.random() * 100000);
    const city = doc.data();
    
    const datetime = formatDate(new Date(city.datetime.seconds * 1000));
    const newlist =
      `<div id="${randomid}">` +
      "<div class='d-flex flex-row align-items-center commented-user' >" +
      "<h5 class='mr-2' id='username'>" +
      city.username + "</h5>" +
      "<p id='datetimeshow'>" +
      datetime + "</p>" +
      "</div>" +
      "<div class='comment-text-sm' id='Comment Sentence'>" + city.comment + "</div>" +
      `<div class='reply-section' id='reply-section-${randomid}'> ` +
      "<div class='d-flex flex-row align-items-center voting-icons' id='replycomment' >" +
      `<button class="btn btn-primary" id="buttonreply-${randomid}" type="button" onclick="replyspanhtml(this)" data-id="${randomid}" >Reply</button>` +
      `<div class='d-flex flex-row add-comment-section mt-4 mb-4' id='replyandreply-${randomid}' style='visibility:hidden'  >` +
      `<input type='text' id='TextInputFieldUserPost-${randomid}' datadocid="${doc.id}" class='form-control mr-md-4' placeholder='Press Enter to reply' >` +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";

    $("#CommentCreate")[0].insertAdjacentHTML("afterbegin", newlist);
    const text = document.querySelector(`#TextInputFieldUserPost-${randomid}`);

    text.addEventListener('keypress', (e) => addreply(e,randomid));


    var card = document.createElement("div");
    card.setAttribute("class", "d-flex flex-row align-items-center voting-icons"); 
    card.setAttribute("id", "replycommentpost");
    card.setAttribute("style", "margin-left: 13px;");
   

    var cardtitle = document.createElement("h5");
    cardtitle.setAttribute("class", "mr-2");
    cardtitle.setAttribute("id", "ReplyUsername");
    card.appendChild(cardtitle);
    var cardtitleDate = document.createElement("p");
    cardtitleDate.setAttribute("id", "Replydatetimeshow");
    card.appendChild(cardtitleDate);

    var cardbody = document.createElement("div");
    cardbody.setAttribute("class", "comment-text-sm");
    cardbody.setAttribute("id", "ReplyCommentShow");
    var cardbodycomment = document.createElement("p");
    cardbodycomment.setAttribute("id", "postcomment");
    cardbody.appendChild(cardbodycomment);
  
    for (var key in city.replies) {
      const newreplylist =
        `<div id="ReplyDiv-${randomid}" style="margin-left: 15%"; >` +
        "<div class='d-flex flex-row align-items-center commented-user' >" +
        "<h5 class='mr-2' id='username'>" +
        city.replies[key].User + "</h5>" +
        "<p id='datetimeshow'>" +
        city.replies[key].Date + "</p>" +
        "</div>" +
        "<div class='comment-text-sm' id='Comment Sentence'>" + city.replies[key].Comment + "</div>" +
        "<div class='reply-section' >" +
        "<div class='d-flex flex-row align-items-center voting-icons' id='replycomment' >" +
        "</div>" +
        "</div>" +
        "</div>";
      $(".reply-section")[0].insertAdjacentHTML("afterend", newreplylist);

    }
  });
}

async function addreply(e,randomid) {
  if (e.keyCode === 13) {
    console.log(e);
    console.log(`#TextInputFieldUserPost-${randomid}`);
    const text = document.querySelector(`#TextInputFieldUserPost-${randomid}`).value;
    const user = localStorage.getItem("googleUser");
    const username = JSON.parse(user).displayName;
    const datetime = formatDate(new Date());
    console.log(text, username, datetime)
    console.log(`${randomid}`)

    const newreplylist =
    `<div id='ReplyDiv-${randomid}' style='margin-left: 15%'; >` +
    "<div class='d-flex flex-row align-items-center commented-user' >" +
    "<h5 class='mr-2' id='username'>" +
    username + "</h5>" +
    "<p id='datetimeshow'>" +
    datetime + "</p>" +
    "</div>" +
    "<div class='comment-text-sm' id='Comment Sentence'>" + text + "</div>" +
    "<div class='reply-section' >" +
    "<div class='d-flex flex-row align-items-center voting-icons' id='replycomment' >" +
    "</div>" +
    "</div>" +
    "</div>";
    console.log(`.reply-section-${randomid}`)
  $(`#reply-section-${randomid}`)[0].insertAdjacentHTML("afterend", newreplylist);

  document.querySelector(`#TextInputFieldUserPost-${randomid}`).value = "";

    const reply = { User: username, Date: datetime, Comment: text };
    const docid = document.querySelector(`#TextInputFieldUserPost-${randomid}`).getAttribute("datadocid") // fwDThOEygpzmvQ9JSjFz 
   
    const docRef = doc(firestoreDB, "Comments", `${docid}`);
   
    // update data
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    console.log(data);
    const replies = docSnap.data().replies;

    if (replies) {
      replies.push(reply);
      await updateDoc(docRef, {
        replies: replies
      });
    } else {
      await updateDoc(docRef, {
        replies: [reply]
      });
    }

  }
}

// Create Data
async function createFirestoreData(textid, targetText, comment, username, useruid) {
  console.log(textid, comment, username, useruid)
  // const citiesRef = collection(firestoreDB, "Comments");

  const a = await addDoc(collection(firestoreDB, "Comments"), {
    useruid: useruid,
    targettextid: textid,
    targettext: targetText,
    username: username,
    comment: comment,
    timestamp: new Date().getTime(),
    datetime: new Date(),
  });
  console.log("create comments success");
  return a;
}
// Read User Data Self collocation list
async function readUserData(uid) {
  console.log(uid)
  const user = localStorage.getItem("googleUser");
  const usernameUid = uid //JSON.parse(user).uid;
  const q = query(collection(firestoreDB, "TargetText"), where("useruid", "==", usernameUid));
  const querySnapshot = await getDocs(q);
  // clear
  console.log("All firestore order by username how many document filter out: " + querySnapshot.size);
  document.querySelector("#listgroup").innerHTML = "";
  querySnapshot.forEach((doc) => {

    const target = `${doc.data().targetText}`;
    const videotime = `${doc.data().videotimestamp}`;
    const videoEP = `${doc.data().video}`;

    var card = document.createElement("li");
    card.setAttribute("class", "list-group-item"); // list
    card.setAttribute("id", "list-Item");
    card.setAttribute("style", "max-width: 70rem;");
    document.querySelector("#listgroup").appendChild(card); // ul 包住 li
    card.innerHTML = "TargetText: " + target;

    var videotimestamp = document.createElement("p");
    videotimestamp.innerHTML = "Collocations exist on video " + videoEP + " time is: " + videotime;
    card.appendChild(videotimestamp);

  });
}

window.disliked = disliked;
window.liked = liked;
window.replyspanhtml = replyspanhtml;
window.getreplycomment = getreplycomment;

export { createFirestoreData, readUserData };
