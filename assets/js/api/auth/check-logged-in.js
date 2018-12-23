var date = Math.floor(Date.now() / 1000);

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

function displayMessageBox(message) {
    $('#message-box .modal-body').text(message);
    $('#message-box').modal('show');
}

(function isLoggedIn() {
    if(getCookie("USERCOOKIE") === ""){
        window.location.replace('login.html');
    }
    //if session is over 2 hours and status code is 500
    //should display pop up to redirect to login page
})();

(function hideAttributesBasedOnRole() {
    if(localStorage.getItem('role') === "ADMIN"){
        //dashboard
        $('#total-my-items-card').css('display','none');

        //items page
        $('#request-button-div').css('display','none');

    } else if(localStorage.getItem('role') === "SUPERIOR" || localStorage.getItem('role') === "EMPLOYEE"){
        //items page
        $('#entry-button-div').css('display','none');
        $('#delete-button-div').css('display','none');
    }
})();

(function pageAuthorization () {

})();

$(document).ready(function () {

    $(window).on('load',function(){
        (function checkSession() {
            if(date >= localStorage.getItem('ts')){
                displayMessageBox("Your session has expired. Please login to continue.");
                $('#message-box-div').on('click', '#message-box-button', function () {
                    localStorage.clear();
                    document.cookie = 'USERCOOKIE' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;path=/';
                    window.location.replace('login.html');
                });
            }
        })();
    });

    // (function setName(){
    //     alert($(document).find('#user-name').text());
    //     $('#top-navbar').find('#user-name').html('aaa');
    // })();
    // $(document).parents('#left-navbar').find('#employees').hide();
});