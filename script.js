var get_currency_rate = function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://www.xe.com/currencyconverter/convert/?Amount=1&From=AED&To=INR", true);

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var el = document.createElement( 'div' );
      el.innerHTML = xhr.responseText;

      var currency_text;
      $('.uccRes .rightCol', el).each(function() { currency_text = $(this).html();});

      var re = /\d+.\d+/;
      var current_rate = currency_text.match(re)[0];
      var aed_amount = $("#aed_amount").val()
      $("#inr_amount").val(aed_amount * current_rate);
    }
  }

  xhr.send();
};

$(document).ready(function() {
  console.log("HTTP Pry ...");
});
