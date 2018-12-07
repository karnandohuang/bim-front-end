$(document).ready(function () {
    function setRequestModalAttributes() {
        $("#request-table>tbody").empty();
        $("#request-div").css("display", "inline");
        $("#entry-edit-form").css("display", "none");
        $("#item-information-div").css("display", "none");

        $('.modal-title').text("Request Item");
        $('.modal-save-button').css("display", "block");
        $('.modal-save-button').prop('id', 'request-item-button');
        $('#item-action-modal').modal('show');
    }

    function setDeleteModalAttributes() {
        $("#request-table>tbody").empty();
        $("#entry-edit-form").css("display", "none");
        $("#item-information-div").css("display", "none");
        $("#request-div").css("display", "");
        $("#input-item-id-row").css("display", "none");

        $('.modal-title').text("Delete Item");
        $('.modal-save-button').css("display", "block");
        $('.modal-save-button').prop('id', 'delete-item-button');
        $('#item-action-modal').modal('show');
    }

    function displayMessageBox(message) {
        $('#message-box .modal-body').text(message);
        $('#message-box').modal('show');
    }

    function requestButtonOnClick() {
        $(document).on('click', '#request-item-button', function () {

            let item = [];
            $('.request-item-row').each(function () {
                let requestItemId = $(this).closest('tr').find('.request-item-id').html();
                let requestItemQty = $(this).closest('tr').find('.request-item-qty select').val();

                let itemData = {
                    id: requestItemId,
                    qty: requestItemQty
                };
                item.push(itemData);
            });

            let requestEmployeeId = "EM068"; //need to change it

            let request = {
                employeeId : requestEmployeeId,
                items : item,
            };

            let requestItemJson = JSON.stringify(request);
            $.ajax({
                url: "http://localhost:8080/bim/api/requests",
                type: "POST",
                dataType: "JSON",
                contentType: "application/json",
                data: requestItemJson,
                async: false,
                success: function (response, status, jqXHR) {
                    if(response.success === true){
                        displayMessageBox("Request Success");
                        $('#item-action-modal').modal('hide');
                        $('.modal-footer').on('click', '#message-box-button', function () {
                            window.location.reload();
                        });
                    }else {
                        displayMessageBox("Request Failed" + " (" + response.errorMessage + ")");
                    }
                },
                error: function (response, status, jqXHR) {
                    displayMessageBox("Request Failed" + " (" + status + ")");
                }
            });
            $(document).off('click', '#request-item-button');
        });
    }

    function deleteButtonOnClick() {
        $(document).on('click', '#delete-item-button', function () {
            let items = [];

            $('.delete-row').each(function () {
                let deleteId = $(this).closest('tr').find('.delete-id').html();
                items.push(deleteId);
            });

            let deleteItemData = {"ids": items};
            let deleteItemJson = JSON.stringify(deleteItemData);

            alert();
            $.ajax({
                url: 'http://localhost:8080/bim/api/items',
                type: 'DELETE',
                contentType: 'application/json',
                dataType: 'JSON',
                data: deleteItemJson,
                success: function (response) {
                    if(response.success === true) {
                        displayMessageBox("delete success");
                        $('#item-action-modal').modal('hide');
                        $('.modal-footer').on('click', '#message-box-button', function () {
                            window.location.reload();
                        });
                    } else {
                        displayMessageBox("delete failed" + " (" + response.errorMessage + ")");
                    }
                },
                error: function (response, status, jqXHR) {
                    displayMessageBox("delete failed" + " (" + status + ")");
                }
            });
            $(document).off('click', '#delete-item-button');
        });
    }

//when pressing action button
    $('#request-button, #delete-button').on('click', function () {
        let selectedItem = [];

        //get item data from selected table to JSON
        $('.row-select input:checked').each(function () {
            let selectedId = $(this).closest('tr').find('.id').html();
            let selectedName = $(this).closest('tr').find('.name').html();
            let selectedPrice = $(this).closest('tr').find('.price').html();
            let selectedLocation = $(this).closest('tr').find('.location').html();
            let selectedQty = $(this).closest('tr').find('.qty').html();

            let item = {
                id: selectedId,
                name: selectedName,
                price: selectedPrice,
                location: selectedLocation,
                qty: selectedQty
            };
            selectedItem.push(item);
        });

        //if no item is selected
        if(!selectedItem.length>0){
            displayMessageBox("You must select at least 1 item")

        } else{
            if (this.id === 'request-button') {
                setRequestModalAttributes();

                var quantities;

                for(let i=0;i<selectedItem.length;i++){
                    let tr = "<tr class='request-item-row'>";
                    let td1 = "<td class='request-item-id'>" + selectedItem[i].id + "</td>";
                    let td2 = "<td class='request-item-name'>" + selectedItem[i].name + "</td>";
                    let td3 = "<td class='request-item-location'>" + selectedItem[i].location + "</td>";

                    let qty = parseInt(selectedItem[i].qty);
                    quantities = null;
                    (function addQuantityOption() {
                        for(let i=1;i<=qty;i++){
                            quantities += '<option val=' + i + '>' + i + '</option>';
                        }
                    })();

                    let td4 =
                        "<td class='request-item-qty'>" +
                        "<form><select class='form-control'><option selected>Choose...</option>" +
                        quantities + "</select></form></td></tr>";

                    $("#request-table").append(tr+td1+td2+td3+td4);
                }

                requestButtonOnClick();

            }  else if (this.id === 'delete-button') {
                setDeleteModalAttributes();

                for(let i=0;i<selectedItem.length;i++) {
                    let tr = "<tr class='delete-row'>";
                    let td1 = "<td class='delete-id'>" + selectedItem[i].id + "</td>";
                    let td2 = "<td class='delete-name'>" + selectedItem[i].name + "</td>";
                    let td3 = "<td class='delete-location'>" + selectedItem[i].location + "</td>";
                    let td4 = "<td class='delete-qty'>" + selectedItem[i].qty + "</td></tr>";

                    $("#request-table").append(tr+td1+td2+td3+td4);
                }
                deleteButtonOnClick();

            }
        }
    });
});