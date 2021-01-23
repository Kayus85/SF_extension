// I'm displaying the popup script console in the background console
var console = chrome.extension.getBackgroundPage().console;
console.log("popup running");

var app = {

  init: function () {
    // get the elements from popup.html
    var take = document.getElementById("take");
    take.onclick = function () {
      chrome.runtime.sendMessage({
        fn: "getValueFromContent",
        type: "msgForBackground"
      }, function (response) {
        console.log("popup script got the reponse", response);
      });
    }




    // submit.onclick = function () {
    //   // console.log("button click", userinput.value);
    //   // sending an object that is the function I want to run and the value, it will take
    //   // i'm calling functions in the background script and passing values to them because
    //   // of elegant code on the other end
    //   chrome.runtime.sendMessage({
    //     fn: "setValue",
    //     value: userinput.value
    //   });
    // }


  }

};
// when popup loads, launch init
window.onload = app.init();
// submit.onclick = doSomething;