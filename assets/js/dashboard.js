$(document).ready(function () {
    (function(){
        $('.left-navbar').load('../assets/components/navigation.html #left-nav', function () {
            $('#dashboard').toggleClass('active shadow');
        });

        $('#top-navbar').load('../assets/components/navigation.html #top-nav', function () {
        });
    })();
});

