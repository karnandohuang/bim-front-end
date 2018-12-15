$(document).ready(function () {
    var loginBox = $('.login-box');
    loginBox.addClass("transitioned");
    setTimeout(function(){loginBox.removeClass("transitioned")},200);

    $('#login-button').on('click', function (){
        let EMAIL = $('#email').val();
        let PASSWORD = $('#password').val();

        var API_PATH_LOGIN = "http://localhost:8080/bim/api/login";
        var data = {
            email : EMAIL,
            password : PASSWORD
        };

        console.log(EMAIL + PASSWORD);
        console.log(data);

        var login_json = JSON.stringify(data);

        function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }

        $.ajax({
            type: "POST",
            url: API_PATH_LOGIN,
            dataType: 'json',
            crossDomain: true,
            contentType: 'application/json',
            // xhrFields: {withCredentials: true},
            data: login_json,
            success: function (response, status, xhr){
                setCookie("USERCOOKIE", response.value.token, 1);

                alert('Login Success!');
                window.redirect = 'http://localhost';
            },
            error: function (response, status, xhr) {
                alert("error");
            }
        });

    });
});