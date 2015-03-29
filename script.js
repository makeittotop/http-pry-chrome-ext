var request_objs = [];

var filters = { urls: ["<all_urls>"], types: ["image"] };

var callback = function (info) {
  console.log("Intercepted: " + info.url);
  request_objs.push(info);   
}

$(document).ready(function() {
  console.log("HTTP Pry ...");

  chrome.webRequest.onBeforeRequest.addListener(callback, filters);

});
