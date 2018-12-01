$(document).ready(function () {

    function setInfoModalAttributes() {
        $("#item-information-div").css("display", "");
        $("#entry-edit-form").css("display", "none");
        $("#request-div").css("display", "none");
        $("#input-item-id-row").css("display", "none");
        $('.modal-save-button').css("display", "none");

        $('.modal-title').text("Item Information");
        $('#item-action-modal').modal('show');
    }

    function displayMessageBox(message) {
        $('#message-box .modal-body').text(message);
        $('#message-box').modal('show');
    }

    function getItemJson(itemId) {
        $.ajax({
            url: 'http://localhost:8080/bim/api/items/' + itemId,
            type: 'GET',
            dataType: 'JSON',
            contentType: 'application/json',
            success: function (response, status, jqXHR) {
                $('#item-info-id').text(response.value.value.id);
                $('#item-info-sku').text(response.value.value.sku);
                $('#item-info-name').text(response.value.value.name);
                $('#item-info-price').text(response.value.value.price);
                $('#item-info-qty').text(response.value.value.qty);
                $('#item-info-location').text(response.value.value.location);
                $('#item-info-image').prop('src', response.value.value.imageUrl);
            },
            error: function (response, status, jqXHR) {

            }
        });
    }

    function sendEditedJson(itemJson) {
        $.ajax({
            url: 'http://localhost:8080/bim/api/items',
            type: 'PUT',
            dataType: 'JSON',
            contentType: 'application/json',
            data: itemJson,
            success: function (response, status, jqXHR) {
                displayMessageBox("Edit Success");
                $('#item-action-modal').modal('hide');
                $('.modal-footer').on('click', '#message-box-button', function () {
                    window.location.reload();
                });
            },
            error: function (response, status, jqXHR) {
                displayMessageBox("Edit Failed" + " (" + status + ")");
            }
        });
    }

    $(document).on('click', '.info-button', function () {
        setInfoModalAttributes();

        let itemIdToBeEdited = $(this).closest('tr').find('.id').html();
        getItemJson(itemIdToBeEdited);

        //send JSON to backend
        let itemJson;
        $('.modal-footer').on('click', '#edit-item-button', (function () {
            //get value from each text box
            let id = $('#input-item-id').val();
            let sku = $('#input-item-sku').val();
            let name = $('#input-item-name').val();
            let price = $('#input-item-price').val();
            let qty = $('#input-item-qty').val();
            let location = $('#input-item-location').val();

            let item = {
                id: id,
                sku: sku,
                name: name,
                price: price,
                location: location,
                qty: qty,
            };

            itemJson = JSON.stringify(item);
            sendEditedJson(itemJson);
        }));
    });
});