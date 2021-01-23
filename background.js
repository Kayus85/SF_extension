console.log("background running");



// var background = {

//   // value: "",

//   init: function () {

// listen for messages, and route them into a function. 
//   chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     console.log("message received", request);
//     if (request.fn in background) {
//       background[request.fn](request, sender, sendResponse);
//     }
//   });
// },

// setValue: function (request, sender, sendResponse) {
//   console.log("setting value", request.value);
//   this.value = request.value;
// },
// // the below function when called will get a response back
// getValue: function (request, sender, sendResponse) {
//   sendResponse(this.value);
// }
// };

// background.init();

// setting rules for page action to only appear on specific lightspeed eCom page
var rule1 = {
  conditions: [new chrome.declarativeContent.PageStateMatcher({
    pageUrl: {
      hostEquals: 'kays.shoplightspeed.com'
    }
  })],
  actions: [new chrome.declarativeContent.ShowPageAction()]
};

chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([rule1]);
  });
});

// listen for messages, and route them into a function. 
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("message received", request);
  if (request.fn == "getValueFromContent") {
    getValueFromContent();
  }
});

// trigger a function in content script that gets text from the page and returns it as response
function getValueFromContent() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tab) {
    chrome.tabs.sendMessage(tab[0].id, {
      fn: "getBusiness"
    }, function (response) {
      console.log("got response", response);
    });
  });
}