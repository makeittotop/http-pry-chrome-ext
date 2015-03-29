var request_objs = [];

var filters = { urls: ["<all_urls>"], types: ["image"] };

var extra_info_spec = ["blocking"];

var callback = function (info) {
  console.log("Intercepted: " + info.url);
  request_objs.push(info);   

  return {cancel: true};
}

$(document).ready(function() {
  console.log("HTTP Pry ...");

  chrome.webRequest.onBeforeRequest.addListener(callback, filters, extra_info_spec);

});
