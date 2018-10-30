$(document).ready(function () {
    let idJson;
    //when pressing request button
    $('#request-button, #edit-button, #delete-button').click(function () {
        let selectedItem = [];

        //get item data from table to JSON
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

            idJson = JSON.stringify(selectedItem);
            console.log(idJson);
        });

        //if no item is selected
        if(!selectedItem.length>0){
            $('#message-box .modal-body').text("You must select at least 1 item");
            $('#message-box').modal('show');

        } else{
            if (this.id == 'request-button') {
                $("#entry-edit-form").css("display", "none");
                $("#request-div").css("display", "inline");
                $('.modal-title').text("Request Item");
                $('#item-action-modal').modal('show');
                $("#request-table>tbody").empty();

                let item = JSON.parse(idJson);
                let quantities;

                for(let i=0;i<item.length;i++){
                    let tr = "<tr>";
                    let td1 = "<td class='selected-id'>" + item[i].id + "</td>";
                    let td2 = "<td class='selected-sku'>" + item[i].sku + "</td>";
                    let td3 = "<td class='selected-name'>" + item[i].name + "</td>";
                    let td4 = "<td class='selected-location'>" + item[i].location + "</td>";

                    let qty = parseInt(item[i].qty);


                    function addQuantityOption () {
                        for(let i=1;i<=qty;i++){
                            quantities += '<option val=' + i + '>' + i + '</option>';
                        }
                    }
                    addQuantityOption();

                    let td5 =
                        "<td class='selected-qty'>" +
                        "<form><select class='form-control'><option>Choose...</option>"
                        + quantities + "</select></form></td></tr>";

                    $("#request-table").append(tr+td1+td2+td3+td4+td5);

                }


            } else if (this.id == 'edit-button') {

                if (selectedItem.length > 1) {
                    $('#message-box .modal-body').text("You can only select 1 item to edit");
                    $('#message-box').modal('show');
                }
                else {
                    let item = JSON.parse(idJson);
                    console.log(item);

                    $('#input-item-id').val(item[0].id);
                    $('#input-item-sku').val(item[0].sku);
                    $('#input-item-name').val(item[0].name);
                    $('#input-item-price').val(item[0].price);
                    $('#input-item-qty').val(item[0].qty);
                    $('#input-item-location').val(item[0].location);

                    $("#entry-edit-form").css("display", "inline");
                    $("#request-div").css("display", "none");
                    $("#input-item-id-row").css("display", "");

                    $('.modal-title').text("Edit Item");
                    $('#item-action-modal').modal('show');

                    $('.modal-save-button').prop('id', 'edit-item-button');

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
                                alert("success");
                                window.location.reload();
                            },
                            error: function () {
                                alert("failed");
                            }
                        });
                    }));




                }
            } else if (this.id == 'delete-button') {
                $('.modal-title').text("Delete Item");
                $('#item-action-modal').modal('show');
                $("#request-table>tbody").empty();

                $("#entry-edit-form").css("display", "none");
                $("#request-div").css("display", "");
                $("#input-item-id-row").css("display", "none");

                $('.modal-save-button').prop('id', 'delete-item-button');



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


                // $('#delete-body').text("Are you sure you want to delete " + selectedItem.length + " item(s) ?");

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
                    console.log(deleteItemJson);

                    $.ajax({
                        url: 'http://localhost:8080/bim/api/items',
                        type: 'DELETE',
                        contentType: 'application/json',
                        dataType: 'JSON',
                        data: deleteItemJson,
                        success: function () {
                            alert("delete successful")
                            window.location.reload();
                        },
                        error: function () {
                            alert("delete unsuccessful")
                        }
                    });
                });

            }
        }
    });
});