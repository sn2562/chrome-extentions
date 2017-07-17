document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#showAlert').addEventListener('change', changeHandler);
});

function changeHandler(){
    chrome.runtime.sendMessage({
    type: "hello",
    text: "Taka"
  }, function (response) {
    if (response) {
      alert(response);
    }
  });

    // //Do Something...maybe another function showAlert(), for instance
    // if(showAlert.checked){
    //    //do something
    //    alert("bomb");
    // }
    // else{
    //    //do something else
    //    alert("bomb");
    //
    // }
}
