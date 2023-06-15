import { collection, getDocs, getFirestore, limit, query, orderBy, where } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

import { app } from "/firebaseConfig.js";
import { readFirestoreData } from "./crud.js";

const firestoreDB = getFirestore(app);

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


// Filter data username
export async function filterFirestoreDataUser() {
  var DATAATTR = dropdownWordType.getAttribute("dataAttr"); //getter
  var wordType = where("type", "==", DATAATTR);
  const citiesRef = collection(firestoreDB, "TargetText");
  //console.log(wordType)
  const qCondition = query(citiesRef, wordType, orderBy("name"));
  const querySnapshot = await getDocs(qCondition);
  
  // clear
  document.querySelector("#containerdis").innerHTML = "";
  querySnapshot.forEach((doc) => {
    var eventdata = doc.data();
    const username = `${doc.data().name}`;
    const type = `${doc.data().type}`;
    const target = `${doc.data().targetText}`;
    const example = `${doc.data().ExampleSentence}`;
    const origin = `${doc.data().originText}`;
    const like = `${doc.data().like}`;
    const dislike = `${doc.data().dislike}`;
    const translate = `${doc.data().translate}`;
    const datetime = `${doc.data().datetime}`;
    const datetime12 = formatDate(new Date(doc.data().datetime.seconds * 1000));
   
    var card = document.createElement("div");
    card.setAttribute("class", "card bg-light border-dark mb-3");
    card.setAttribute("id", "card-container");
    card.setAttribute("style", "max-width: 70rem;");
    document.querySelector("#containerdis").appendChild(card);

    var cardheader = document.createElement("div");
    cardheader.setAttribute("class", "card-header");
    card.appendChild(cardheader);

    var cardbody = document.createElement("div");
    cardbody.setAttribute("class", "card-body");
    card.appendChild(cardbody);

    var cardtitle = document.createElement("h5");
    cardtitle.setAttribute("class", "card-title");
    document.querySelector(".card-body").appendChild(cardtitle);

    var userName = document.createElement("h5");
    var targettext = document.createElement("p");
    var exampleSentence = document.createElement("p");
    var originSentence = document.createElement("p");
    var like1 = document.createElement("p");
    var dislike1 = document.createElement("p");
    var translate1 = document.createElement("p");
    var datetime1 = document.createElement("p");
    userName.innerHTML = "Username: " + username;
    targettext.innerHTML = "TargetText: " + target;
    exampleSentence.innerHTML = "Example Sentence: " + example; // added this
    originSentence.innerHTML = "Origin Sentence: " + origin;
    translate1.innerHTML = "Translate: " + translate;
    like1.innerHTML = "Like: " + like;
    dislike1.innerHTML = "Dislike: " + dislike;
    datetime1.innerHTML = "Date: " + datetime12;

    card.appendChild(cardheader);
    card.appendChild(cardbody);
    cardheader.appendChild(userName);
    cardbody.appendChild(targettext);
    cardbody.appendChild(exampleSentence);
    cardbody.appendChild(originSentence);
    cardbody.appendChild(translate1);
    cardbody.appendChild(like1);
    cardbody.appendChild(dislike1);
    cardbody.appendChild(datetime1);
   
    card.addEventListener("click", () => {
      window.location.assign("Comments.html" + "?targetTextId=" + doc.id);
    });
    card.classList.add("text");
  });

}

// Filter data sort like
export async function filterFirestoreDataSortlike() {
  var DATAATTR = dropdownWordType.getAttribute("dataAttr"); //getter
  var wordType = where("type", "==", DATAATTR);
  const citiesRef = collection(firestoreDB, "TargetText");
 
  const qCondition = query(citiesRef, wordType, orderBy("like","desc"));
  const querySnapshot = await getDocs(qCondition);  
  // clear
  document.querySelector("#containerdis").innerHTML = "";
  querySnapshot.forEach((doc) => {
    var eventdata = doc.data();
    const username = `${doc.data().name}`;
    const type = `${doc.data().type}`;
    const target = `${doc.data().targetText}`;
    const example = `${doc.data().ExampleSentence}`;
    const origin = `${doc.data().originText}`;
    const like = `${doc.data().like}`;
    const dislike = `${doc.data().dislike}`;
    const translate = `${doc.data().translate}`;
    const datetime = `${doc.data().datetime}`;
    const datetime12 = formatDate(new Date(doc.data().datetime.seconds * 1000));
   
    var card = document.createElement("div");
    card.setAttribute("class", "card bg-light border-dark mb-3");
    card.setAttribute("id", "card-container");
    card.setAttribute("style", "max-width: 70rem;");
    document.querySelector("#containerdis").appendChild(card);

    var cardheader = document.createElement("div");
    cardheader.setAttribute("class", "card-header");
    card.appendChild(cardheader);

    var cardbody = document.createElement("div");
    cardbody.setAttribute("class", "card-body");
    card.appendChild(cardbody);

    var cardtitle = document.createElement("h5");
    cardtitle.setAttribute("class", "card-title");
    document.querySelector(".card-body").appendChild(cardtitle);

    var userName = document.createElement("h5");
    var targettext = document.createElement("p");
    var exampleSentence = document.createElement("p");
    var originSentence = document.createElement("p");
    var like1 = document.createElement("p");
    var dislike1 = document.createElement("p");
    var translate1 = document.createElement("p");
    var datetime1 = document.createElement("p");
    userName.innerHTML = "Username: " + username;
    targettext.innerHTML = "TargetText: " + target;
    exampleSentence.innerHTML = "Example Sentence: " + example; // added this
    originSentence.innerHTML = "Origin Sentence: " + origin;
    translate1.innerHTML = "Translate: " + translate;
    like1.innerHTML = "Like: " + like;
    dislike1.innerHTML = "Dislike: " + dislike;
    datetime1.innerHTML = "Date: " + datetime12;

    card.appendChild(cardheader);
    card.appendChild(cardbody);
    cardheader.appendChild(userName);
    cardbody.appendChild(targettext);
    cardbody.appendChild(exampleSentence);
    cardbody.appendChild(originSentence);
    cardbody.appendChild(translate1);
    cardbody.appendChild(like1);
    cardbody.appendChild(dislike1);
    cardbody.appendChild(datetime1);
   
    card.addEventListener("click", () => {
      window.location.assign("Comments.html" + "?targetTextId=" + doc.id);
    });
    card.classList.add("text");
  });
}

// Filter data sort like
export async function filterFirestoreDataSortdislike() {
  var DATAATTR = dropdownWordType.getAttribute("dataAttr"); //getter
  var wordType = where("type", "==", DATAATTR);
  const citiesRef = collection(firestoreDB, "TargetText");
 
  const qCondition = query(citiesRef, wordType, orderBy("dislike","desc"));
  const querySnapshot = await getDocs(qCondition);  
  // clear
  document.querySelector("#containerdis").innerHTML = "";
  querySnapshot.forEach((doc) => {
    var eventdata = doc.data();
    const username = `${doc.data().name}`;
    const type = `${doc.data().type}`;
    const target = `${doc.data().targetText}`;
    const example = `${doc.data().ExampleSentence}`;
    const origin = `${doc.data().originText}`;
    const like = `${doc.data().like}`;
    const dislike = `${doc.data().dislike}`;
    const translate = `${doc.data().translate}`;
    const datetime = `${doc.data().datetime}`;
    const datetime12 = formatDate(new Date(doc.data().datetime.seconds * 1000));
   
    var card = document.createElement("div");
    card.setAttribute("class", "card bg-light border-dark mb-3");
    card.setAttribute("id", "card-container");
    card.setAttribute("style", "max-width: 70rem;");
    document.querySelector("#containerdis").appendChild(card);

    var cardheader = document.createElement("div");
    cardheader.setAttribute("class", "card-header");
    card.appendChild(cardheader);

    var cardbody = document.createElement("div");
    cardbody.setAttribute("class", "card-body");
    card.appendChild(cardbody);

    var cardtitle = document.createElement("h5");
    cardtitle.setAttribute("class", "card-title");
    document.querySelector(".card-body").appendChild(cardtitle);

    var userName = document.createElement("h5");
    var targettext = document.createElement("p");
    var exampleSentence = document.createElement("p");
    var originSentence = document.createElement("p");
    var like1 = document.createElement("p");
    var dislike1 = document.createElement("p");
    var translate1 = document.createElement("p");
    var datetime1 = document.createElement("p");
    userName.innerHTML = "Username: " + username;
    targettext.innerHTML = "TargetText: " + target;
    exampleSentence.innerHTML = "Example Sentence: " + example; // added this
    originSentence.innerHTML = "Origin Sentence: " + origin;
    translate1.innerHTML = "Translate: " + translate;
    like1.innerHTML = "Like: " + like;
    dislike1.innerHTML = "Dislike: " + dislike;
    datetime1.innerHTML = "Date: " + datetime12;

    card.appendChild(cardheader);
    card.appendChild(cardbody);
    cardheader.appendChild(userName);
    cardbody.appendChild(targettext);
    cardbody.appendChild(exampleSentence);
    cardbody.appendChild(originSentence);
    cardbody.appendChild(translate1);
    cardbody.appendChild(like1);
    cardbody.appendChild(dislike1);
    cardbody.appendChild(datetime1);
   
    card.addEventListener("click", () => {
      window.location.assign("Comments.html" + "?targetTextId=" + doc.id);
    });
    card.classList.add("text");
  });
}


// Filter data frequency
export async function filterFirestoreDataFrequency(WordTypeFreq) {
  const wordtype = WordTypeFreq;

  const citiesRef = collection(firestoreDB, "TargetText");
  const qCondition = query(citiesRef, wordtype, orderBy("targetText"));
  const querySnapshot = await getDocs(qCondition);
  console.log("All firestore order by targettext and wordtype how many document filter out: " + querySnapshot.size); // how many document filter out

  // clear
  document.querySelector("#containerdis").innerHTML = "";
  querySnapshot.forEach((doc) => {
    
  });
}

// Filter data Verb+Noun
export async function filterFirestoreDataVN() {

  const citiesRef = collection(firestoreDB, "TargetText");
  const VN = query(citiesRef, where("type", "==", "Verb + Noun"));
  const querySnapshot1 = await getDocs(VN);
  //console.log("V+N how many document filter out: " + querySnapshot1.size); // how many document filter out

  document.querySelector("#containerdis").innerHTML = "";
  const allEventData = [];
  querySnapshot1.forEach((doc) => {
    var eventdata = doc.data();

    allEventData.push(eventdata);
    const username = `${doc.data().name}`;
    const target = `${doc.data().targetText}`;
    const example = `${doc.data().ExampleSentence}`;
    const origin = `${doc.data().originText}`;

    var card = document.createElement("div");
    card.setAttribute("class", "card bg-light mb-3");
    card.setAttribute("id", "card-container");
    card.setAttribute("style", "max-width: 70rem;");
    document.querySelector("#containerdis").appendChild(card);

    var cardheader = document.createElement("div");
    cardheader.setAttribute("class", "card-header");
    card.appendChild(cardheader);

    var cardbody = document.createElement("div");
    cardbody.setAttribute("class", "card-body");
    card.appendChild(cardbody);

    var cardtitle = document.createElement("h5");
    cardtitle.setAttribute("class", "card-title");
    document.querySelector(".card-body").appendChild(cardtitle);

    var userName = document.createElement("h5");
    var targettext = document.createElement("p");
    var exampleSentence = document.createElement("p");
    var originSentence = document.createElement("p");

    const like = `${doc.data().like}`;
    const dislike = `${doc.data().dislike}`;
    const translate = `${doc.data().translate}`;
    const datetime = `${doc.data().datetime}`;
    const datetime12 =  formatDate(new Date(doc.data().datetime.seconds * 1000));
    var like1 = document.createElement("p");
    var dislike1 = document.createElement("p");
    var translate1 = document.createElement("p");
    var datetime1 = document.createElement("p");
    translate1.innerHTML = "Translate: " + translate;
    like1.innerHTML = "Like: " + like;
    dislike1.innerHTML = "Dislike: " + dislike;
    datetime1.innerHTML = "Date: " + datetime12;
    cardbody.appendChild(translate1);
    cardbody.appendChild(like1);
    cardbody.appendChild(dislike1);
    cardbody.appendChild(datetime1);



    userName.innerHTML = "Username: " + username;
    userName.addEventListener("click", () => {
      // clear container
      document.querySelector("#containerdis").innerHTML = "";

    });
    targettext.innerHTML = "TargetText: " + target;
    exampleSentence.innerHTML = "Example Sentence: " + example; // added this
    originSentence.innerHTML = "Origin Sentence: " + origin;
    translate1.innerHTML = "Translate: " + translate;
    like1.innerHTML = "Like: " + like;
    dislike1.innerHTML = "Dislike: " + dislike;
    datetime1.innerHTML = "Date: " + datetime12;
    
    card.appendChild(cardheader);
    card.appendChild(cardbody);
    cardheader.appendChild(userName);
    cardbody.appendChild(targettext);
    cardbody.appendChild(exampleSentence);
    cardbody.appendChild(originSentence);
    cardbody.appendChild(translate1);
    cardbody.appendChild(like1);
    cardbody.appendChild(dislike1);
    cardbody.appendChild(datetime1);
   



    card.addEventListener("click", () => {
      window.location.assign("Comments.html" + "?targetTextId=" + doc.id);
    });
    card.classList.add("text");
  });
}





// Filter data Verb+Prep
export async function filterFirestoreDataVPrep() {
  //const userna = username;
  //const displayna = displayname;
  const citiesRef = collection(firestoreDB, "TargetText");
  const VP = query(citiesRef, where("type", "==", "Verb + Prep"));
  const querySnapshot1 = await getDocs(VP);
  //console.log("V+P how many document filter out: " + querySnapshot1.size); // how many document filter out

  document.querySelector("#containerdis").innerHTML = "";
  const allEventData = [];
  querySnapshot1.forEach((doc) => {
    var eventdata = doc.data();
    //console.log("abc>>"+doc.id + doc.data())
    allEventData.push(eventdata);
    const username = `${doc.data().name}`;
    const target = `${doc.data().targetText}`;
    const example = `${doc.data().ExampleSentence}`;
    const origin = `${doc.data().originText}`;
    //const filterResultObj = { username, example };

    var card = document.createElement("div");
    card.setAttribute("class", "card bg-light mb-3");
    card.setAttribute("id", "card-container");
    card.setAttribute("style", "max-width: 70rem;");
    document.querySelector("#containerdis").appendChild(card);

    var cardheader = document.createElement("div");
    cardheader.setAttribute("class", "card-header");
    card.appendChild(cardheader);

    var cardbody = document.createElement("div");
    cardbody.setAttribute("class", "card-body");
    card.appendChild(cardbody);

    var cardtitle = document.createElement("h5");
    cardtitle.setAttribute("class", "card-title");
    document.querySelector(".card-body").appendChild(cardtitle);

    var userName = document.createElement("h5");
    var targettext = document.createElement("p");
    var exampleSentence = document.createElement("p");
    var originSentence = document.createElement("p");

    const like = `${doc.data().like}`;
    const dislike = `${doc.data().dislike}`;
    const translate = `${doc.data().translate}`;
    const datetime = `${doc.data().datetime}`;
    const datetime12 =  formatDate(new Date(doc.data().datetime.seconds * 1000));
    var like1 = document.createElement("p");
    var dislike1 = document.createElement("p");
    var translate1 = document.createElement("p");
    var datetime1 = document.createElement("p");
    translate1.innerHTML = "Translate: " + translate;
    like1.innerHTML = "Like: " + like;
    dislike1.innerHTML = "Dislike: " + dislike;
    datetime1.innerHTML = "Date: " + datetime12;
    cardbody.appendChild(translate1);
    cardbody.appendChild(like1);
    cardbody.appendChild(dislike1);
    cardbody.appendChild(datetime1);


    userName.innerHTML = "Username: " + username;
    userName.addEventListener("click", () => {
      // clear container
      document.querySelector("#containerdis").innerHTML = "";
    });
    targettext.innerHTML = "TargetText: " + target;
    exampleSentence.innerHTML = "Example Sentence: " + example; // added this
    originSentence.innerHTML = "Origin Sentence: " + origin;
    translate1.innerHTML = "Translate: " + translate;
    like1.innerHTML = "Like: " + like;
    dislike1.innerHTML = "Dislike: " + dislike;
    datetime1.innerHTML = "Date: " + datetime12;

    card.appendChild(cardheader);
    card.appendChild(cardbody);
    cardheader.appendChild(userName);
    cardbody.appendChild(targettext);
    cardbody.appendChild(exampleSentence);
    cardbody.appendChild(originSentence);
    cardbody.appendChild(translate1);
    cardbody.appendChild(like1);
    cardbody.appendChild(dislike1);
    cardbody.appendChild(datetime1);

    card.addEventListener("click", () => {
      window.location.assign("Comments.html" + "?targetTextId=" + doc.id);
    });
    card.classList.add("text");
  });
}

// Filter data Verb+Adv
export async function filterFirestoreDataVAdv() {
  //const userna = username;
  //const displayna = displayname;
  const citiesRef = collection(firestoreDB, "TargetText");
  const VA = query(citiesRef, where("type", "==", "Verb + Adv"));
  const querySnapshot1 = await getDocs(VA);
  //console.log("V+Adv how many document filter out: " + querySnapshot1.size); // how many document filter out

  document.querySelector("#containerdis").innerHTML = "";
  const allEventData = [];
  querySnapshot1.forEach((doc) => {
    var eventdata = doc.data();
    //console.log("abc>>"+doc.id + doc.data())
    allEventData.push(eventdata);
    const username = `${doc.data().name}`;
    const target = `${doc.data().targetText}`;
    const example = `${doc.data().ExampleSentence}`;
    const origin = `${doc.data().originText}`;
    //const filterResultObj = { username, example };

    var card = document.createElement("div");
    card.setAttribute("class", "card bg-light mb-3");
    card.setAttribute("id", "card-container");
    card.setAttribute("style", "max-width: 70rem;");
    document.querySelector("#containerdis").appendChild(card);

    var cardheader = document.createElement("div");
    cardheader.setAttribute("class", "card-header");
    card.appendChild(cardheader);

    var cardbody = document.createElement("div");
    cardbody.setAttribute("class", "card-body");
    card.appendChild(cardbody);

    var cardtitle = document.createElement("h5");
    cardtitle.setAttribute("class", "card-title");
    document.querySelector(".card-body").appendChild(cardtitle);

    var userName = document.createElement("h5");
    var targettext = document.createElement("p");
    var exampleSentence = document.createElement("p");
    var originSentence = document.createElement("p");

    const like = `${doc.data().like}`;
    const dislike = `${doc.data().dislike}`;
    const translate = `${doc.data().translate}`;
    const datetime = `${doc.data().datetime}`;
    const datetime12 =  formatDate(new Date(doc.data().datetime.seconds * 1000));
    var like1 = document.createElement("p");
    var dislike1 = document.createElement("p");
    var translate1 = document.createElement("p");
    var datetime1 = document.createElement("p");
    translate1.innerHTML = "Translate: " + translate;
    like1.innerHTML = "Like: " + like;
    dislike1.innerHTML = "Dislike: " + dislike;
    datetime1.innerHTML = "Date: " + datetime12;
    
    cardbody.appendChild(translate1);
    cardbody.appendChild(like1);
    cardbody.appendChild(dislike1);
    cardbody.appendChild(datetime1);

    userName.innerHTML = "Username: " + username;
    userName.addEventListener("click", () => {
      // clear container
      document.querySelector("#containerdis").innerHTML = "";
    });
    targettext.innerHTML = "TargetText: " + target;
    exampleSentence.innerHTML = "Example Sentence: " + example; // added this
    originSentence.innerHTML = "Origin Sentence: " + origin;
    translate1.innerHTML = "Translate: " + translate;
    like1.innerHTML = "Like: " + like;
    dislike1.innerHTML = "Dislike: " + dislike;
    datetime1.innerHTML = "Date: " + datetime12;
    card.appendChild(cardheader);
    card.appendChild(cardbody);
    cardheader.appendChild(userName);
    cardbody.appendChild(targettext);
    cardbody.appendChild(exampleSentence);
    cardbody.appendChild(originSentence);
    cardbody.appendChild(translate1);
    cardbody.appendChild(like1);
    cardbody.appendChild(dislike1);
    cardbody.appendChild(datetime1);

    card.addEventListener("click", () => {
      window.location.assign("Comments.html" + "?targetTextId=" + doc.id);
    });
    card.classList.add("text");
  });
}

//sort V+N and listen to sort by username
const sortVerbNoun = document.querySelector('[data-link="sortVerbNoun"]');
sortVerbNoun?.addEventListener("click", () => {
  filterFirestoreDataVN();
});

//sort V+Prep and listen to sort by username
const sortVerbPrep = document.querySelector('[data-link="sortVerbPrep"]');
sortVerbPrep?.addEventListener("click", () => {
  filterFirestoreDataVPrep();
});

//sort V+Adv and listen to sort by username
const sortVerbAdv = document.querySelector('[data-link="sortVerbAdv"]');
sortVerbAdv?.addEventListener("click", () => {
  filterFirestoreDataVAdv();
});

// //only sort user but nt need to do anythings
const sortUser = document.querySelector('[data-link="sortUser"]');

sortUser?.addEventListener("click", () => {
  document.querySelector("#containerdis").innerHTML = "";
  const attribute = "Verb + Noun"
  $("#dropdownWordType").data('dataAttr',attribute); //setter
  filterFirestoreDataUser();  // default sorting username is V+N
 
});

// //only sort like
const sortlike = document.querySelector('[data-link="sortLike"]');

sortlike?.addEventListener("click", () => {
  document.querySelector("#containerdis").innerHTML = "";
  const attribute = "Verb + Noun"
  $("#dropdownWordType").data('dataAttr',attribute); //setter
  filterFirestoreDataSortlike();  // default sorting username is V+N
 
});

// //only sort dislike
const sortdislike = document.querySelector('[data-link="sortDislike"]');

sortdislike?.addEventListener("click", () => {
  document.querySelector("#containerdis").innerHTML = "";
  const attribute = "Verb + Noun"
  $("#dropdownWordType").data('dataAttr',attribute); //setter
  filterFirestoreDataSortdislike();  // default sorting username is V+N
 
});

//only sort frequency but nt need to do anythings
const sortFrequency = document.querySelector('[data-link="sortFrequency"]');
sortFrequency?.addEventListener("click", () => {
  document.querySelector("#containerdis").innerHTML = "";
  Sortbytargettext(); // default sorting is frequency is V+N
});

let type = 'Verb + Noun';

//sort V+N and listen to sort by frequency
const sortVNFrequency = document.querySelector('[data-link="sortVerbNoun"]');
sortVNFrequency?.addEventListener("click", () => {
  filterFirestoreDataVN();
  type = 'Verb + Noun';

});

//sort V+Adv and listen to sort by frequency
const sortVAdvFrequency = document.querySelector('[data-link="sortVerbAdv"]');
sortVAdvFrequency?.addEventListener("click", () => {
  filterFirestoreDataVAdv();
  type = 'Verb + Adv';
});

//sort V+Prep and listen to sort by frequency
const sortVPrepFrequency = document.querySelector('[data-link="sortVerbPrep"]');
sortVPrepFrequency?.addEventListener("click", () => {
  filterFirestoreDataVPrep();
  type = 'Verb + Prep';
});

export async function Sortbytargettext() {
 
  const citiesRef = collection(firestoreDB, "TargetText");
  const qCondition = query(citiesRef, orderBy("targetText"));
  const querySnapshot = await getDocs(qCondition);
  console.log("Order by targettext how many document filter out: " + querySnapshot.size); // how many document filter out
  //clear
  //document.querySelector("#containerdis").innerHTML = "";
  const text = [];

  querySnapshot.forEach((doc) => {
    var eventdata = doc.data();

    if (eventdata.type === type) {
      eventdata['id'] = doc.id;
      text.push(eventdata);
    }
  });

  let frequency = {};

  text.forEach(t => {
    if (t.targetText in frequency) {
      frequency[t.targetText] += 1;
    } else {
      frequency[t.targetText] = 1;
    }

  });
   console.log(frequency); // obj

   const myJSON = JSON.stringify(frequency); // json
  
  for (var prop in frequency) {
    const str = prop +" Frequency: "+frequency[prop];
    console.log(str)
    var card = document.createElement("div");
    card.setAttribute("class", "card bg-light mb-3");
    card.setAttribute("id", "card-container");
    card.setAttribute("style", "max-width: 70rem;");
    card.setAttribute("style", "cursor: pointer;");
    document.querySelector("#containerdis").appendChild(card);

    var cardbody = document.createElement("div");
    cardbody.setAttribute("class", "card-body");
    cardbody.setAttribute("style", "cursor: pointer;");
    card.appendChild(cardbody);

    var targettext = document.createElement("p");
    targettext.setAttribute("class", "class-title");
    targettext.setAttribute("style", "cursor: pointer;");
    var frequency1 = document.createElement("p");
    frequency1.setAttribute("class", "class-title");
    frequency1.setAttribute("style", "cursor: pointer;");

  
    targettext.innerHTML = "TargetText: ";
    targettext.innerHTML += prop;
    frequency1.innerHTML= "Frequency: " + frequency[prop];
    card.appendChild(cardbody);
    cardbody.appendChild(targettext);
    cardbody.appendChild(frequency1);

    targettext.addEventListener("click", (e) => {
      $('<style>.newClass { cursor: pointer; }</style>').appendTo('class-title p');
      const gettargetword = e.target.innerText
      //gettargetword
      const words = gettargetword.split(': ');
      const word = words[1];
      readFirestoreData(word)

    });
    
  }

  let sort = text.map(t => {
    return [frequency[t.targetText], t];

  })

  sort.sort((a, b) => {
    return b[0] - a[0];

  })

  const sorted = sort.map(s => {
    return s[1];

  })

  sorted.forEach(s => {
    //console.log(s)
    // var card = document.createElement("div");
    // card.setAttribute("class", "card bg-light mb-3");
    // card.setAttribute("id", "card-container");
    // card.setAttribute("style", "max-width: 70rem;");
    // document.querySelector("#containerdis").appendChild(card);

    // var cardheader = document.createElement("div");
    // cardheader.setAttribute("class", "card-header");
    // card.appendChild(cardheader);

    // var cardbody = document.createElement("div");
    // cardbody.setAttribute("class", "card-body");
    // card.appendChild(cardbody);

    // var cardtitle = document.createElement("h5");
    // cardtitle.setAttribute("class", "card-title");
    // document.querySelector(".card-body").appendChild(cardtitle);

    // var userName = document.createElement("h5");
    // var targettext = document.createElement("p");
    // var exampleSentence = document.createElement("p");
    // var originSentence = document.createElement("p");
    // userName.innerHTML = "Username: " + s.name;
    // userName.addEventListener("click", () => {
    //   // clear container
    //   document.querySelector("#containerdis").innerHTML = "";
    // });
    // targettext.innerHTML = "TargetText: " + s.targetText;
    // exampleSentence.innerHTML = "Example Sentence: " + s.ExampleSentence; // added this
    // originSentence.innerHTML = "Example Sentence: " + s.originText;

    // card.appendChild(cardheader);
    // card.appendChild(cardbody);
    // cardheader.appendChild(userName);
    // cardbody.appendChild(targettext);
    // cardbody.appendChild(exampleSentence);
    // cardbody.appendChild(originSentence);

    // //eventdata = doc.id;
    // card.addEventListener("click", () => {
    //   window.location.assign("Comments.html" + "?targetTextId=" + s.id);
    // });
    // card.classList.add("text");

  })
}

//Dynamic change button HTML content text FOR WORD TYPE
var elements = document.getElementsByClassName("dropdown-item word");
var myFunction = function () {
  const attribute = this.getAttribute("id");
  // document.getElementById("#dropdownWordType").innerText = " "+ attribute;
  //alert(attribute);
  document.getElementById('dropdownWordType').innerHTML = attribute;
  //var brand = dropdownWordType.getAttribute("dataAttr") 
  dropdownWordType.setAttribute("dataAttr", attribute)   
 // $('#dropdownWordType').data('dataAttr',attribute); //setter

};

for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', myFunction, false);
}

//Dynamic change button HTML content text FOR SORT BY CONDITION
var elements = document.getElementsByClassName("dropdown-item sort");

var myFunction = function () {
  var attribute = this.getAttribute("data-link");

  document.getElementById('dropdownSortByCondition').innerHTML = attribute;
};

for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', myFunction, false);
}
