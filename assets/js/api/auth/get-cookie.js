$(document).ready(function () {
    var loginBox = $('.login-box');
    loginBox.addClass("transitioned");
    setTimeout(function(){loginBox.removeClass("transitioned")},200);


    function make_header_auth(cookie) {
        return "Bearer " + cookie;
    }

});