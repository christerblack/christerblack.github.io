import { all, readUserData } from "./crud.js";

function loadalldata() {
  //all();
  const user = localStorage.getItem("googleUser");
  const usernameUid = JSON.parse(user).uid;
  console.log(usernameUid)
  //const uid = "F5MIqsGS93gYOVm83WVd4Q170FL2"
  readUserData(usernameUid);
}

window.addEventListener("load", function(){

    // Check localStorage to see if the splash screen 
    // has NOT already been displayed
    if(!localStorage.getItem("loadflash")){
 
      // Splash has not been displayed, so show it:
      loadalldata();
        
      // Store a value in localStorage to denote that the splash screen
      // has now been displayed
      localStorage.setItem("loadflash", "true");
    }
 });


window.loadalldata = loadalldata;

