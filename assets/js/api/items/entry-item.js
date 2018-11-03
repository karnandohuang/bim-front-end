$(document).ready(function () {
    function setEntryItemAttributes() {
        $('.modal-title').text("Entry Item");
        $("#input-item-id-row").css("display", "none");
        $("#entry-edit-form").css("display", "inline");
        $("#request-div").css("display", "none");
        $("#input-item-sku").prop("readonly", false);
        $('.modal-save-button').prop('id', 'entry-item-button');
        $('#item-action-modal').modal('show');
    }

    function emptyEntryForm() {
        $('#input-item-sku').val(null);
        $('#input-item-name').val(null);
        $('#input-item-price').val(null);
        $('#input-item-qty').val(null);
        $('#input-item-location').val(null);
    }

    function displayMessageBox(message) {
        $('#message-box .modal-body').text(message);
        $('#message-box').modal('show');
    }

    $('#entry-button').click(function () {
        emptyEntryForm();
        setEntryItemAttributes();
    });

    $('.modal-footer').on('click', '#entry-item-button', (function () {
        $('#submit-form').click();
        let form = $("#entry-edit-form");

        if(form[0].checkValidity()) {
            let sku = $('#input-item-sku').val();
            let name = $('#input-item-name').val();
            let price = $('#input-item-price').val();
            let qty = $('#input-item-qty').val();
            let location = $('#input-item-location').val();
            let imageUrl = $('#inputItemImage').val();

            let item = {
                sku: sku,
                name: name,
                price: price,
                location: location,
                qty: qty,
                imageUrl: imageUrl
            };

            let itemJson = JSON.stringify(item);
            console.log(itemJson);
            $.ajax({
                url: "http://localhost:8080/bim/api/items",
                type: "POST",
                dataType: "JSON",
                contentType: "application/json",
                async: false,
                data: itemJson,
                success: function () {
                    displayMessageBox("Success");
                    $('.modal-footer').on('click', '#message-box-button', function () {
                        window.location.reload();
                    });
                },
                error: function () {
                    displayMessageBox("Failed");
                }
            });
        }
    }));
});