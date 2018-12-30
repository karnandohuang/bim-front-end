window.module = window.module || {};
var date = Math.floor(Date.now() / 1000);

function displayMessageBox(message) {
    $('#message-box .modal-body').text(message);
    $('#message-box').modal('show');
}

function isLoggedIn() {
    if(localStorage.getItem('token') === ""){
        window.location.replace('login.html');
    }
}

isLoggedIn();

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
    $(window).on('load', function(){
        (function checkSession() {
            if(date >= localStorage.getItem('ts')){
                displayMessageBox("Your session has expired. Please login to continue.");
                $('#message-box-div').on('click', '#message-box-button', function () {
                    localStorage.clear();
                    window.location.replace('login.html');
                });
            }
        })();
    });
});

module.exports = isLoggedIn;