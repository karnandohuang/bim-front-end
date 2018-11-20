$(document).ready(function () {
    (function(){
        $('.left-navbar').load('../assets/components/html/navigation.html #left-nav', function () {
            $('#assignment-list').toggleClass('active shadow');
        });
    })();
});

