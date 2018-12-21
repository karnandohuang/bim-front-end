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

(function hideAttributesBasedOnRole() {
    if(localStorage.getItem('role') === "ADMIN"){
        //dashboard
        $('#total-my-items-card').css('display','none');

    } else if(localStorage.getItem('role') === "SUPERIOR" || localStorage.getItem('role') === "EMPLOYEE"){
        //items page
        $('#entry-button').css('display','none');
        $('#delete-button').css('display','none');
    }
})();

(function pageAuthorization () {

})();

$(document).ready(function (e) {
    // (function setName(){
    //     alert($(document).find('#user-name').text());
    //     $('#top-navbar').find('#user-name').html('aaa');
    // })();
    // $(document).parents('#left-navbar').find('#employees').hide();
});