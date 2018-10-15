var loginBox = $('.login-box');
loginBox.addClass("transitioned");
setTimeout(function(){
	loginBox.removeClass("transitioned");
},200);
var loginButton = $('.login-btn').click(function(e)
		{
			e.preventDefault();
    		var email = $('.email-input input');
			var password = $('.password-input input');
			if(email.val() != "asd@gmail.com" || password.val() != "asd")
			{
				if(email.val() != "asd@gmail.com")
				{
						email.addClass("failed")
				}
				else
				{
					email.removeClass("failed");
				}

				if(password.val() != "asd")
				{
					password.addClass("failed");
				}
				else
				{
					password.removeClass("failed");
				}
				loginBox.addClass("failed");
				setTimeout(function(){
					loginBox.removeClass("failed");
				},200);
			}
			else
			{
				email.removeClass("failed");
				password.removeClass("failed");
				alert("data is correct!");
			}
    		console.log("Showing");
});