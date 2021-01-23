// runtime.onMessage event is fired in every content script that is running in the specified tab of the current extension
// onMessae has an event object that can be passed to a handler function. this event object contains
// a string that was sent by tab.sendMessage from background script


chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(request, sender, sendResponse) {
  console.log(request);
  if (request.fn == "getBusiness") {
    getBusiness(request, sender, sendResponse);
  }
}

function getBusiness(request, sender, sendResponse) {
  let data = document.getElementById("formNewsletter").textContent;
  console.log(data);
  sendResponse(data);
}