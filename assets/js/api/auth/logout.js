window.module = window.module || {};

function logout() {
    localStorage.clear();
    window.location = 'login.html';
}

$(document).ready(function () {
    var loginBox = $('.login-box');
    loginBox.addClass("transitioned");
    setTimeout(function(){loginBox.removeClass("transitioned")},200);

    $(document).on('click', '#logout-button', function () {
        logout();
    });
});