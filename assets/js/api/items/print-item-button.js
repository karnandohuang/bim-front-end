$(document).ready(function () {

    function displayMessageBox(message) {
        $('#message-box .modal-body').text(message);
        $('#message-box').modal('show');
    }

    function getPdf(itemId) {
        // $.ajax({
        //     url: 'http://localhost:8080/bim/api/items/pdf/' + itemId,
        //     type: 'GET',
        //     contentType: 'application/pdf',
        //     dataType: "jsonp",
        //     success: function (response, status, jqXHR) {
        //         // var file = new Blob([response], {type: 'application/pdf'});
        //         // console.log(file);
        //         var fileURL = URL.createObjectURL(response);
        //         window.open(fileURL);
        //     },
        //     error: function (response, status, jqXHR) {
        //         console.log(response.getAllResponseHeaders());
        //         alert("error");
        //     }
        // });

        window.location.href = "http://localhost:8080/bim/api/items/pdf/" + itemId;
    }

    $(document).on('click', '.print-button', function () {

        let itemIdToBeEdited = $(this).closest('tr').find('.id').html();
        getPdf(itemIdToBeEdited);
    });
});