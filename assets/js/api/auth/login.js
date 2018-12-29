window.module = window.module || {};

var date = Math.floor(Date.now() / 1000);
var loginData = {};

function callLoginAjax(API_PATH_LOGIN, login_json) {
    $.ajax({
        type: "POST",
        url: API_PATH_LOGIN,
        dataType: 'json',
        crossDomain: true,
        contentType: 'application/json',
        // xhrFields: {withCredentials: true},
        data: login_json,
        success: function (response, status, xhr) {
            if (response.success === true) {
                displayLoginAlert('<i class="fas fa-check-circle"></i> Login Successful.', true);

                localStorage.setItem("token", response.value.token);
                localStorage.setItem("role", response.value.role);
                localStorage.setItem("ts", date + (60 * 60 * 2));

                redirectToDashboard();
            }
            else {
                displayLoginAlert('<i class="fas fa-times-circle"></i> Your email or password is incorrect. please try again.', false);
            }
        },
        error: function (response, status, xhr) {
            displayLoginAlert('<i class="fas fa-times-circle"></i> Your email or password is incorrect. please try again.', false);
        }
    });
}

function login(EMAIL, PASSWORD) {
    var API_PATH_LOGIN = "http://localhost:8080/bim/api/login";

    loginData = {
        email: EMAIL,
        password: PASSWORD
    };

    var login_json = JSON.stringify(loginData);
    callLoginAjax(API_PATH_LOGIN, login_json);
}

function displayLoginAlert(message, status) {
    $('.card-text').html(message);
    if(status===true)
        successCardColor();
    else
        failCardColor();

    $('.login-alert').css('display', 'block');
}

function successCardColor() {
    $('#card-border').addClass('border-success');
    $('#card-text').addClass('text-success');
    $('#card-border').removeClass('border-danger');
    $('#card-text').removeClass('text-danger');
}

function failCardColor() {
    $('#card-border').addClass('border-danger');
    $('#card-text').addClass('text-danger');
    $('#card-border').removeClass('border-success');
    $('#card-text').removeClass('text-success');
}

function redirectToDashboard(){
    $({property: 0}).animate({property: 100}, {
        duration: 1000,
        step: function() {
            var _percent = Math.round(this.property);
            $("#progress").css("width",  _percent+"%");
        },
        complete: function() {
            window.location.replace('dashboard.html');
        }
    });
}

function checkIfUserIsAlreadyLoggedIn(){
    if(localStorage.getItem('token') !== null){
        window.location.replace('dashboard.html');
    }
}

$(document).ready(function () {
    var loginBox = $('.login-box');
    loginBox.addClass("transitioned");
    setTimeout(function(){loginBox.removeClass("transitioned")},200);

    checkIfUserIsAlreadyLoggedIn();

    $('#login-button').on('click', function (){

        let EMAIL = $('#email').val();
        let PASSWORD = $('#password').val();

        login(EMAIL, PASSWORD);
    });
});

module.exports = loginData;