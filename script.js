var request_objs = [];
var response_header_objs = [];

var filters = { urls: ["<all_urls>"], types: ["image"] };
//var filters = { urls: ["*://drive.google.com/*"], types: ["xmlhttprequest"] };
//var filters = { urls: ["*://drive.google.com/*"] };

var extra_infospec = ["blocking", "requestBody"];

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

var callback_on_headers_received = function (info) {
  console.log("Received header from: " + info); 
  response_header_objs.push(info);

  return { cancel: true };
}

$(document).ready(function() {
  console.log("HTTP Pry ...");

  // Before firing the HTTP request
  //chrome.webRequest.onBeforeRequest.addListener(callback, filters, extra_infospec);

  // After receiving HTTP headers in response to a request
  chrome.webRequest.onHeadersReceived.addListener(callback_on_headers_received, filters, ["blocking", "responseHeaders"]);

});
