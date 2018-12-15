$(document).ready(function () {

    function displayMessageBox(message) {
        $('#message-box .modal-body').text(message);
        $('#message-box').modal('show');
    }

    function getPdf(itemId) {
        $.ajax({
            url: 'http://localhost:8080/bim/api/items/pdf/' + itemId,
            type: 'GET',
            contentType: 'application/pdf',
            success: function (response, status, jqXHR) {
                var file = new Blob([response], {type: 'application/pdf'});
                console.log(file);
                var fileURL = URL.createObjectURL(file);
                window.open(fileURL);
                window.location.href= fileURL;
            },
            error: function (response, status, jqXHR) {
                alert("error");
            }
        });
    }

    $(document).on('click', '.print-button', function () {

        let itemIdToBeEdited = $(this).closest('tr').find('.id').html();
        getPdf(itemIdToBeEdited);
    });
});