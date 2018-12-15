$(document).ready(function () {
    var loginBox = $('.login-box');
    loginBox.addClass("transitioned");
    setTimeout(function(){loginBox.removeClass("transitioned")},200);

    function make_header_auth() {
        let cookie = getCookie("USERCOOKIE");
        console.log(cookie);

        return "Bearer " + cookie;
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

    $(document).on('click', '#logout-button', function () {
        make_header_auth();
        var API_PATH_LOGOUT = "http://localhost:8080/bim/api/logout";

        $.ajax({
            type: "GET",
            url: API_PATH_LOGOUT,
            dataType: 'json',
            crossDomain: true,
            headers: {
                'Authorization': make_header_auth()
            },
            contentType: 'application/json',
            // xhrFields: {withCredentials: true},
            success: function (response, status, xhr){
                alert("logout success");
                window.redirect = '/dashboard.html';
            },
            error: function (response, status, xhr) {
                alert("error");
            }
        });

    });
});