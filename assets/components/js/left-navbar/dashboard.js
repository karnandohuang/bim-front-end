$(document).ready(function () {
    (function(){
        $('.left-navbar').load('../assets/components/html/navigation.html #left-nav', function () {
            $('#dashboard').toggleClass('active shadow');

            if(localStorage.getItem("role") === "EMPLOYEE"){
                $('#employees').css('display', 'none');
                $('#assignments').css('display', 'none');
            }
            if(localStorage.getItem("role") === "ADMIN"){
                $('#my-items').css('display', 'none');
            }
        });
    })();
});

