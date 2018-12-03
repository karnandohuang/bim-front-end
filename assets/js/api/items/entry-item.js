$(document).ready(function () {
    function setEntryItemAttributes() {
        $("#input-item-id-row").css("display", "none");
        $("#entry-edit-form").css("display", "inline");
        $("#item-information-div").css("display", "none");
        $("#request-div").css("display", "none");
        $("#input-item-sku").prop("readonly", false);
        $('#item-image-preview').prop('display', 'none');

        $('.modal-title').text("Entry Item");
        $('.modal-save-button').css("display", "block");
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

    //show image name
    (function showImageName(){
        $('#input-item-image').change(function () {
            var fieldVal = $(this).val();
            $('#input-item-image-label').empty();
            fieldVal = fieldVal.replace("C:\\fakepath\\", "");

            if (fieldVal !== undefined || fieldVal !== "") {
                $('#input-item-image-label').text(fieldVal);
            }

        });
    })();

    function imagePreview(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#image-preview')
                    .attr('src', e.target.result)
                    .height(200);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    $('#input-item-image').on('change', function () {
        imagePreview(this);
    });

    $('#entry-button').click(function () {
        emptyEntryForm();
        setEntryItemAttributes();
    });

    $('.modal-footer').on('click', '#entry-item-button', (function () {
        $('#submit-form').click();
        let form = $("#entry-edit-form");

        if(form[0].checkValidity()) {
            let name = $('#input-item-name').val();
            let price = $('#input-item-price').val();
            let qty = $('#input-item-qty').val();
            let location = $('#input-item-location').val();
            let imageFile = $('#input-item-image')[0].files[0];

            let item = {
                name: name,
                price: price,
                location: location,
                qty: qty,
                imageUrl : "null"
            };
            let itemJson = JSON.stringify(item);

            $.ajax({
                url: "http://localhost:8080/bim/api/items",
                type: "POST",
                dataType: "JSON",
                contentType: "application/json",
                async: false,
                data: itemJson,
                success: function (response, status, jqXHR) {
                    if(response.success === true) {

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
                                if(response.success === true) {
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
                    else {
                        displayMessageBox("Failed to entry item. " + "(" + response.errorMessage + ")");
                    }
                },
                error: function (response, status, jqXHR) {
                    displayMessageBox("Failed to entry item. " + "(" + status + ")");
                }
            });

            // $.ajax({
            //     url: "http://localhost:8080/bim/api/upload",
            //     type: "POST",
            //     data: formData,
            //     enctype: 'multipart/form-data',
            //     async: false,
            //     processData: false,
            //     contentType: false,
            //     cache: false,
            //     success: function (response) {
            //
            //         if(response.success === true){
            //
            //             let imageUrl = response.value.imagePath;
            //             let item = {
            //                 name: name,
            //                 price: price,
            //                 location: location,
            //                 qty: qty,
            //                 imageUrl: imageUrl
            //             };
            //
            //             let itemJson = JSON.stringify(item);
            //
            //             $.ajax({
            //                 url: "http://localhost:8080/bim/api/items",
            //                 type: "POST",
            //                 dataType: "JSON",
            //                 contentType: "application/json",
            //                 async: false,
            //                 data: itemJson,
            //                 success: function (response, status, jqXHR) {
            //                     if(response.success === true) {
            //                         displayMessageBox("Success");
            //                         $('.modal-footer').on('click', '#message-box-button', function () {
            //                             window.location.reload();
            //                         });
            //                     }
            //                     else { displayMessageBox("Failed. " + "(" + response.errorMessage + ")"); }
            //                 },
            //                 error: function () {
            //                     displayMessageBox("Failed");
            //                 }
            //             });
            //
            //         } else {
            //             displayMessageBox("failed to upload image. " + "(" + response.errorMessage + ")");
            //         }
            //     },
            //     error: function (response, status, jqXHR) {
            //         displayMessageBox("failed to upload image. " + "(" + status + ")");
            //     }
            // });
        }
    }));
});