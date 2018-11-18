$(document).ready(function () {
    (function(){
        $('.left-navbar').load('../assets/components/html/navigation.html #left-nav', function () {
            $('#employees').toggleClass('active shadow');
        });
    })();
});

