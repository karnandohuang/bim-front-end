$(document).on("click",".show-loading", function () {
    var clickedBtnID = $(this).attr('id'); // or var clickedBtnID = this.id
    $({property: 0}).animate({property: 100}, {
        duration: 1000,
        step: function() {
            var _percent = Math.round(this.property);
            $("#progress").css("width",  _percent+"%");
        },
        complete: function() {
            $("#progress").addClass("done");
            window.location.replace(clickedBtnID+".html");
        }
    });
});