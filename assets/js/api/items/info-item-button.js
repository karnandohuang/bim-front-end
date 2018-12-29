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

    function getItemJson(itemId) {
        $.ajax({
            url: 'http://localhost:8080/bim/api/items/' + itemId,
            type: 'GET',
            dataType: 'JSON',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + localStorage.getItem('token'));
            },
            contentType: 'application/json',
            success: function (response, status, jqXHR) {
                $('#item-info-id').text(response.value.value.id);
                $('#item-info-name').text(response.value.value.name);
                $('#item-info-price').text(response.value.value.price);
                $('#item-info-qty').text(response.value.value.qty);
                $('#item-info-location').text(response.value.value.location);

                if(response.value.value.imageUrl !== "null")
                    $('#item-info-image').prop('src', ('http://localhost:8080/bim/items/image?imagePath=' + response.value.value.imageUrl));
                else
                    $('#item-info-image').prop('src', '../assets/images/no-image-available.png');

            },
            error: function (response, status, jqXHR) {

            }
        });
    }

    $(document).on('click', '.info-button', function (e) {
        e.stopPropagation();

        setInfoModalAttributes();

        let itemIdToBeEdited = $(this).closest('tr').find('.id').html();
        getItemJson(itemIdToBeEdited);
    });
});