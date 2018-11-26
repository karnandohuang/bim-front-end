$(document).ready(function () {
    let idJson;

    function setEditModalAttributes() {
        $("#entry-edit-form").css("display", "inline");
        $("#request-div").css("display", "none");
        $("#input-item-id-row").css("display", "");
        $('.modal-title').text("Edit Item");
        $('.modal-save-button').prop('id', 'edit-item-button');
        $('#item-action-modal').modal('show');
    }

    function displayMessageBox(message) {
        $('#message-box .modal-body').text(message);
        $('#message-box').modal('show');
    }

    function getItemJson(itemIdToBeEdited) {
        $.ajax({
            url: 'http://localhost:8080/bim/api/items/' + itemIdToBeEdited,
            type: 'GET',
            dataType: 'JSON',
            contentType: 'application/json',
            success: function (data) {
                $('#input-item-id').val(data.value.value.id);
                $('#input-item-sku').val(data.value.value.sku);
                $('#input-item-name').val(data.value.value.name);
                $('#input-item-price').val(data.value.value.price);
                $('#input-item-qty').val(data.value.value.qty);
                $('#input-item-location').val(data.value.value.location);
            },
            error: function () {

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
            success: function () {
                displayMessageBox("Edit Success");
                $('#item-action-modal').modal('hide');
                $('.modal-footer').on('click', '#message-box-button', function () {
                    window.location.reload();
                });
            },
            error: function () {
                displayMessageBox("Edit Failed");
            }
        });
    }

    $(document).on('click', '.edit-button', function () {
        setEditModalAttributes();

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