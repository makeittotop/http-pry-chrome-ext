var request_objs = [];

//var filters = { urls: ["<all_urls>"], types: ["image"] };
//var filters = { urls: ["*://drive.google.com/*"], types: ["xmlhttprequest"] };
var filters = { urls: ["*://drive.google.com/*"] };

var extra_info_spec = ["blocking"];

var callback = function (info) {
  console.log("Intercepted: " + info.url);
  request_objs.push(info);   

  var re = /.*download*/i;

  // I intend to not block the downloads but just the uploads
  if (info.type == 'xmlhttprequest' && info.method == 'POST') {
      if (info.url.match(re) == null) {
          console.log("Blocked: " + info.url);
          return { cancel: true };
      }
      // Disallow POST requests for a specific domain
      // For instance in this case, no uploads / downloads can happen to / from the google drive, via the chrome browser
      //return { cancel: true };
  }

  // return { cancel: true };
  // redirects all images to some cute cat image 
  // return { redirectUrl: "http://susanspetblog.com/wp-content/uploads/2014/12/Love-Cute-cat-kitty.jpg" };
}

$(document).ready(function() {
  console.log("HTTP Pry ...");

  chrome.webRequest.onBeforeRequest.addListener(callback, filters, extra_info_spec);

});
