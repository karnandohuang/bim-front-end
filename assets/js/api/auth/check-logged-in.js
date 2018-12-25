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
})();

(function hideAttributesBasedOnRole() {
    if(localStorage.getItem('role') === "ADMIN"){
        //dashboard
        $('#total-my-items-card').css('display','none');

        //items page
        $('#request-button-div').css('display','none');

    } else if(localStorage.getItem('role') === "SUPERIOR" || localStorage.getItem('role') === "EMPLOYEE"){
        //items page & employees page
        $('#entry-button-div').css('display','none');
        $('#delete-button-div').css('display','none');
    }
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
});