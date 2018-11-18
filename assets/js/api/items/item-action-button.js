$(document).ready(function () {
    let idJson;

    function setRequestModalAttributes() {
        $("#entry-edit-form").css("display", "none");
        $("#request-div").css("display", "inline");
        $('.modal-title').text("Request Item");
        $("#request-table>tbody").empty();
        $('#item-action-modal').modal('show');
        $('.modal-save-button').prop('id', 'request-item-button');
    }

    function setEditModalAttributes() {
        $("#entry-edit-form").css("display", "inline");
        $("#request-div").css("display", "none");
        $("#input-item-id-row").css("display", "");
        $('.modal-title').text("Edit Item");
        $('.modal-save-button').prop('id', 'edit-item-button');
        $('#item-action-modal').modal('show');
    }

    function setDeleteModalAttributes() {
        $('.modal-title').text("Delete Item");
        $("#request-table>tbody").empty();
        $("#entry-edit-form").css("display", "none");
        $("#request-div").css("display", "");
        $("#input-item-id-row").css("display", "none");
        $('.modal-save-button').prop('id', 'delete-item-button');
        $('#item-action-modal').modal('show');
    }

    function displayMessageBox(message) {
        $('#message-box .modal-body').text(message);
        $('#message-box').modal('show');
    }

//when pressing action button
    $('#request-button, #edit-button, #delete-button').click(function () {
        let selectedItem = [];

        //get item data from selected table to JSON
        $('.row-select input:checked').each(function () {
            let selectedId = $(this).closest('tr').find('.id').html();
            let selectedSku = $(this).closest('tr').find('.sku').html();
            let selectedName = $(this).closest('tr').find('.name').html();
            let selectedPrice = $(this).closest('tr').find('.price').html();
            let selectedLocation = $(this).closest('tr').find('.location').html();
            let selectedQty = $(this).closest('tr').find('.qty').html();

            let item = {
                id: selectedId,
                sku: selectedSku,
                name: selectedName,
                price: selectedPrice,
                location: selectedLocation,
                qty: selectedQty
            };
            selectedItem.push(item);
        });

        idJson = JSON.stringify(selectedItem);

        //if no item is selected
        if(!selectedItem.length>0){
            displayMessageBox("You must select at least 1 item")

        } else{
            if (this.id === 'request-button') {
                setRequestModalAttributes();

                let item = JSON.parse(idJson);
                var quantities;

                for(let i=0;i<item.length;i++){
                    let tr = "<tr class='request-item-row'>";
                    let td1 = "<td class='request-item-id'>" + item[i].id + "</td>";
                    let td2 = "<td class='request-item-sku'>" + item[i].sku + "</td>";
                    let td3 = "<td class='request-item-name'>" + item[i].name + "</td>";
                    let td4 = "<td class='request-item-location'>" + item[i].location + "</td>";

                    let qty = parseInt(item[i].qty);
                    quantities = null;
                    (function addQuantityOption() {
                        for(let i=1;i<=qty;i++){
                            quantities += '<option val=' + i + '>' + i + '</option>';
                        }
                    })();

                    let td5 =
                        "<td class='request-item-qty'>" +
                        "<form><select class='form-control'><option selected>Choose...</option>" +
                        quantities + "</select></form></td></tr>";

                    $("#request-table").append(tr+td1+td2+td3+td4+td5);
                }

                $('#request-item-button').on('click', function () {
                    let item;
                    $('.request-item-row').each(function () {
                        let requestItemId = $(this).closest('tr').find('.request-item-id').html();
                        let requestEmployeeId = "EM066"; //need to change it
                        let requestItemQty = $(this).closest('tr').find('.request-item-qty select').val();

                        item = {
                            employeeId: requestEmployeeId,
                            itemId: requestItemId,
                            qty: requestItemQty
                        };

                        let requestItemJson = JSON.stringify(item);
                        console.log(requestItemJson);

                        $.ajax({
                            url: "http://localhost:8080/bim/api/requests",
                            type: "POST",
                            dataType: "JSON",
                            contentType: "application/json",
                            data: requestItemJson,
                            async: false,
                            success: function () {
                                displayMessageBox("Request Success");
                                $('#item-action-modal').modal('hide');
                                $('.modal-footer').on('click', '#message-box-button', function () {
                                    window.location.reload();
                                });
                            },
                            error: function () {
                                displayMessageBox("Request Failed");
                            }
                        });
                    });
                });

            } else if (this.id === 'edit-button') {

                if (selectedItem.length > 1) {
                    displayMessageBox("You can only select 1 item to edit")
                }
                else {
                    setEditModalAttributes();

                    let item = JSON.parse(idJson);

                    console.log(item);
                    $('#input-item-id').val(item[0].id);
                    $('#input-item-sku').val(item[0].sku);
                    $('#input-item-name').val(item[0].name);
                    $('#input-item-price').val(item[0].price);
                    $('#input-item-qty').val(item[0].qty);
                    $('#input-item-location').val(item[0].location);

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
                    }));
                }
            } else if (this.id === 'delete-button') {
                setDeleteModalAttributes();

                let item = JSON.parse(idJson);

                for(let i=0;i<item.length;i++) {
                    let tr = "<tr class='delete-row'>";
                    let td1 = "<td class='delete-id'>" + item[i].id + "</td>";
                    let td2 = "<td class='delete-sku'>" + item[i].sku + "</td>";
                    let td3 = "<td class='delete-name'>" + item[i].name + "</td>";
                    let td4 = "<td class='delete-location'>" + item[i].location + "</td>";
                    let td5 = "<td class='delete-qty'>" + item[i].qty + "</td></tr>";

                    $("#request-table").append(tr+td1+td2+td3+td4+td5);
                }

                let deleteItemJson = {"ids": ""};
                let items = [];
                $('#delete-item-button').click(function () {
                    $('.delete-row').each(function () {
                        let deleteId = $(this).closest('tr').find('.delete-id').html();

                        items.push(deleteId);
                        console.log(items);
                    });

                    deleteItemJson.ids = items;
                    deleteItemJson = JSON.stringify(deleteItemJson);

                    $.ajax({
                        url: 'http://localhost:8080/bim/api/items',
                        type: 'DELETE',
                        contentType: 'application/json',
                        dataType: 'JSON',
                        data: deleteItemJson,
                        success: function () {
                            displayMessageBox("delete success");
                            $('#item-action-modal').modal('hide');
                            $('.modal-footer').on('click', '#message-box-button', function () {
                                window.location.reload();
                            });
                        },
                        error: function () {
                            displayMessageBox("delete failed");
                        }
                    });
                });
            }
        }
    });
});