$(document).ready(function () {
    $('#entry-button').click(function () {
        $('#input-item-sku').val(null);
        $('#input-item-name').val(null);
        $('#input-item-price').val(null);
        $('#input-item-qty').val(null);
        $('#input-item-location').val(null);

        $("#input-item-id-row").css("display", "none");
        $("#entry-edit-form").css("display", "inline");
        $("#request-div").css("display", "none");

        $('.modal-title').text("Entry Item");
        $("#input-item-sku").prop("readonly", false);
        $('#item-action-modal').modal('show');

        $('.modal-save-button').prop('id', 'entry-item-button');

    });

    $('.modal-footer').on('click', '#entry-item-button', (function () {
        //get value from each text box
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
        };
        console.log(item);
        let itemJson = JSON.stringify(item);
        console.log(itemJson);

        $.ajax({
            url: "http://localhost:8080/bim/api/items",
            type: "POST",
            dataType: "JSON",
            contentType: "application/json",
            data: itemJson,
            success: function () {
                alert("Success");
                window.location.reload();
            },
            error: function () {
                alert("failed");
            }
        });
    }));

});