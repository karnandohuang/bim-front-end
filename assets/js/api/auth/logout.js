$(document).ready(function () {
    var loginBox = $('.login-box');
    loginBox.addClass("transitioned");
    setTimeout(function(){loginBox.removeClass("transitioned")},200);

    $(document).on('click', '#logout-button', function () {
        // $.ajax({
        //     type: "GET",
        //     url: "http://localhost:8080/bim/api/logout",
        //     dataType: 'json',
        //     crossDomain: true,
        //     beforeSend: function (xhr) {
        //         xhr.setRequestHeader('Authorization', "Bearer " + localStorage.getItem('token'));
        //     },
        //     contentType: 'application/json',
        //     success: function (response, status, xhr) {
        //
        //     },
        //     error: {},
        // });

        localStorage.removeItem('token');
        window.location = 'login.html';
    });
});