import { updateFirestoreData } from "./crud.js";

function openModal(e) {
 // console.log(e);
  const dbtarget = $(e).attr("data-target-text");
  const dborigin = $(e).attr("data-origin-text");

  // e == button hTML element
  const dataId = $(e).attr("data-id");
  // console.log("button id => "+ dataId);
  $(`#exampleModal`).addClass("show");
  $(`#exampleModal`).css("display", "block");

  $("#exampleModal .modal-title").text("Create Annotation"); // `${dataId}` + 
  $("#exampleModal #TargetText").text(dbtarget);
  $(`#exampleModal .modal-body p`).css("font-weight", "bold");
  $(`#exampleModal .modal-body p`).css("font-size", "1.3rem"); 
  $("#exampleModal #Original").text(dborigin);
  $(`#exampleModal .modal-body p:nth-child(2)`).css("font-weight", "bold"); 
  $(`#exampleModal .modal-body p:nth-child(2)`).css("font-size", "1.3rem");
}

//onclick='openModal(this)'
function closeModal(id) {
  $(`#${id}`).removeAttr("style");
}

/**
 * Submit button function.
 * When user click save change button then will trigger function below.
 */
function submitModal(modalID) {
  
  // Get Data From Input form.
  const modalTitleVal = $(`#${modalID} .modal-title`).text(); // modal edit button id value
  const modalBodyTextVal = $(`#${modalID} #TargetText`).text(); //target_text

  // Get Input Value From Modal body
  const modalBodyTranslateInputVal = $(`#${modalID} .modal-body #translate`).val();
  const modalBodyGiveAnExampleInputVal = $(`#${modalID} .modal-body #give-an-example`).val();

  // Get Checked Radio Button From Modal Body
  const modalBodyCheckedRadioBtn = $(`#${modalID} .modal-body input[name="inlineRadioOptions"]:checked`).val();

  const modalResultObj = { modalTitleVal, modalBodyTextVal, modalBodyTranslateInputVal, modalBodyGiveAnExampleInputVal, modalBodyCheckedRadioBtn };
  
  updateFirestoreData(modalBodyTextVal,modalBodyCheckedRadioBtn,modalBodyTranslateInputVal,modalBodyGiveAnExampleInputVal);
  // Close Modal
  
  closeModal(modalID);
  $('#give-an-example').val('');
  $('#translate').val('');
  $('#Verb-Verb').prop('checked',false);

}

window.openModal = openModal;
window.closeModal = closeModal;
window.submitModal = submitModal;
