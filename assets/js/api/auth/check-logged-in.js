function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

(function isLoggedIn() {
    if(getCookie("USERCOOKIE") === ""){
        window.location.replace('login.html');
    }
})();

$(document).ready(function () {
    // (function setName(){
    //     alert($('#top-nav').find('#user-name').text());
    //     $('#top-navbar').find('#user-name').html('aaa');
    // })();
});