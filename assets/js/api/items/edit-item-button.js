$(document).ready(function () {

    function setEditModalAttributes() {
        $("#entry-edit-form").css("display", "inline");
        $("#request-div").css("display", "none");
        $("#input-item-id-row").css("display", "");
        $("#item-information-div").css("display", "none");
        $("#input-item-image").removeAttr("required");

        $('.modal-title').text("Edit Item");
        $('.modal-save-button').css("display", "block");
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
            success: function (response, status, jqXHR) {
                $('#input-item-id').val(response.value.value.id);
                $('#input-item-sku').val(response.value.value.sku);
                $('#input-item-name').val(response.value.value.name);
                $('#input-item-price').val(response.value.value.price);
                $('#input-item-qty').val(response.value.value.qty);
                $('#input-item-location').val(response.value.value.location);
            },
            error: function (response, status, jqXHR) {

            }
        });
    }

    function sendEditedItemJson(itemJson, imageFile) {
        $.ajax({
            url: 'http://localhost:8080/bim/api/items',
            type: 'PUT',
            dataType: 'JSON',
            contentType: 'application/json',
            data: itemJson,
            success: function (response, status, jqXHR) {
                if (response.success === true) {

                    if (imageFile.length === 0) {
                        displayMessageBox("Success");
                        $('.modal-footer').on('click', '#message-box-button', function () {
                            window.location.reload();
                        });
                    } else {
                        var formData = new FormData();
                        formData.append('file', imageFile);
                        formData.append('itemId', response.value.value.id);

                        $.ajax({
                            url: "http://localhost:8080/bim/api/upload",
                            type: "POST",
                            data: formData,
                            enctype: 'multipart/form-data',
                            async: false,
                            processData: false,
                            contentType: false,
                            cache: false,
                            success: function (response, status, jqXHR) {
                                if (response.success === true) {
                                    displayMessageBox("Success");
                                    $('.modal-footer').on('click', '#message-box-button', function () {
                                        window.location.reload();
                                    });
                                } else {
                                    displayMessageBox("Failed to upload image. " + "(" + response.errorMessage + ")");
                                }
                            },
                            error: function (response, status, jqXHR) {
                                displayMessageBox("Failed to upload image. " + "(" + status + ")");
                            }
                        });
                    }
                } else {
                    displayMessageBox("Edit Failed" + " (" + response.errorMessage + ")");
                }
            },
            error: function (response, status, jqXHR) {
                displayMessageBox("Edit Failed" + " (" + status + ")");
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
            let imageFile = $('#input-item-image')[0].files[0];

            let item = {
                id: id,
                sku: sku,
                name: name,
                price: price,
                location: location,
                qty: qty,
            };

            itemJson = JSON.stringify(item);
            sendEditedItemJson(itemJson, imageFile);
        }));
    });
});