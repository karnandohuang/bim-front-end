$(document).ready(function () {
    var loginBox = $('.login-box');
    loginBox.addClass("transitioned");
    setTimeout(function(){loginBox.removeClass("transitioned")},200);


    function make_base_auth(user, password) {
        let tok = user + ':' + password;
        let hash = Base64.encode(tok);
        return "Basic " + hash;
    }






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
        console.log(login_json);

        var login_json = JSON.stringify(data);

        $.ajax({
            type: "POST",
            url: API_PATH_LOGIN,
            dataType: 'json',
            contentType: 'application/json',
            data: login_json,
            success: function (){
                alert('Login Success!');
            }
        });

    });
});




// var loginButton = $('.login-btn').click(function(e)
// {
//     e.preventDefault();
//     var email = $('.email-input input');
//     var password = $('.password-input input');
//     if(email.val() != "asd@gmail.com" || password.val() != "asd")
//     {
//         if(email.val() != "asd@gmail.com")
//         {
//             email.addClass("failed")
//         }
//         else
//         {
//             email.removeClass("failed");
//         }
//
//         if(password.val() != "asd")
//         {
//             password.addClass("failed");
//         }
//         else
//         {
//             password.removeClass("failed");
//         }
//         loginBox.addClass("failed");
//         setTimeout(function(){
//             loginBox.removeClass("failed");
//         },200);
//     }
//     else
//     {
//         email.removeClass("failed");
//         password.removeClass("failed");
//         alert("data is correct!");
//     }
//     console.log("Showing");
// });