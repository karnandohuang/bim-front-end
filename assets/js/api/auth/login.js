var cookie = document.cookie;

$(document).ready(function () {
    var loginBox = $('.login-box');
    loginBox.addClass("transitioned");
    setTimeout(function(){loginBox.removeClass("transitioned")},200);

    function redirect(){
        $({property: 0}).animate({property: 100}, {
            duration: 1000,
            step: function() {
                var _percent = Math.round(this.property);
                $("#progress").css("width",  _percent+"%");
            },
            complete: function() {
                // $("#progress").addClass("done");
                window.location.replace('dashboard.html');
            }
        });
    }

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

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    (function loggedIn() {
        if(getCookie("USERCOOKIE") !== ""){
            window.location.replace('dashboard.html');
        }
    })();

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

        $.ajax({
            type: "POST",
            url: API_PATH_LOGIN,
            dataType: 'json',
            crossDomain: true,
            contentType: 'application/json',
            // xhrFields: {withCredentials: true},
            data: login_json,
            success: function (response, status, xhr){
                if(response.success === true){
                    $('.failed-login-alert').css('display', 'none');

                    setCookie("USERCOOKIE", response.value.token, 1);
                    localStorage.setItem("token", response.value.token);
                    localStorage.setItem("role", response.value.role);

                    redirect();
                }
                else{
                    $('.failed-login-alert').css('display', 'block');
                }
            },
            error: function (response, status, xhr) {
                $('.failed-login-alert').css('display', 'block');
            }
        });

    });
});