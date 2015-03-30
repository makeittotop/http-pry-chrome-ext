var request_objs = [];

//var filters = { urls: ["<all_urls>"], types: ["image"] };
var filters = { urls: ["*://drive.google.com/*"], types: ["xmlhttprequest"] };

var extra_info_spec = ["blocking"];

var callback = function (info) {
  console.log("Intercepted: " + info.url);
  request_objs.push(info);   

  return { cancel: true };
  // redirects all images to some cute cat image 
  // return { redirectUrl: "http://susanspetblog.com/wp-content/uploads/2014/12/Love-Cute-cat-kitty.jpg" };
}

$(document).ready(function() {
  console.log("HTTP Pry ...");

  chrome.webRequest.onBeforeRequest.addListener(callback, filters, extra_info_spec);

});
