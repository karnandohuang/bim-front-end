$(document).ready(function () {
    let idJson;

    function setModalTableData(request){
        let quantities;

        for(let i=0;i<request.length;i++){
            let tr = "<tr>";
            let td0 = "<td class='selected-request-id'>" + request[i].id + "</td>";
            let td1 = "<td class='selected-employee-id'>" + request[i].employeeId + "</td>";
            let td2 = "<td class='selected-employee-name'>" + request[i].employeeName + "</td>";
            let td3 = "<td class='selected-item-sku'>" + request[i].itemSKU + "</td>";
            let td4 = "<td class='selected-item-name'>" + request[i].itemName + "</td>";
            let td5 = "<td class='selected-quantity'>" + request[i].quantity + "</td>";
            let td6 = "<td class='selected-status'>" + request[i].status + "</td>";

            $("#request-table").append(tr+td0+td1+td2+td3+td4+td5);
        }
    }
    //when pressing request button
    $('#approve-button, #reject-button, #handover-button').click(function () {
        let selectedRequest = [];

        //get request data from table to JSON
        $('.row-select input:checked').each(function () {
            let selectedRequestId = $(this).closest('tr').find('.request-id').html();
            let selectedEmployeeId = $(this).closest('tr').find('.employee-id').html();
            let selectedEmployeeName = $(this).closest('tr').find('.employee-name').html();
            let selectedItemSku = $(this).closest('tr').find('.item-sku').html();
            let selectedItemName = $(this).closest('tr').find('.item-name').html();
            let selectedQty = $(this).closest('tr').find('.qty').html();
            let selectedStatus = $(this).closest('tr').find('.status').html();


            let request = {
                id : selectedRequestId,
                employeeId: selectedEmployeeId,
                employeeName: selectedEmployeeName,
                itemSKU: selectedItemSku,
                itemName: selectedItemName,
                quantity: selectedQty,
                status: selectedStatus
            };
            selectedRequest.push(request);

            idJson = JSON.stringify(selectedRequest);
            console.log(idJson);
        });

        //if no request is selected
        if (!selectedRequest.length > 0) {
            $('#message-box .modal-body').text("You must select at least 1 request");
            $('#message-box').modal('hide');

        } else {
            if (this.id == 'approve-button') {
                $("#entry-edit-form").css("display", "none");
                $("#request-div").css("display", "inline");
                $('.modal-title').text("Approve Request(s)");
                $('#item-action-modal').modal('show');
                $("#request-table>tbody").empty();
                $('#submit-form').click();
                let requestFromJson = JSON.parse(idJson);
                // let quantities;
                //
                // for(let i=0;i<request.length;i++){
                //     let tr = "<tr>";
                //     let td1 = "<td class='selected-employee-id'>" + request[i].employeeId + "</td>";
                //     let td2 = "<td class='selected-employee-name'>" + request[i].employeeName + "</td>";
                //     let td3 = "<td class='selected-item-sku'>" + request[i].itemSKU + "</td>";
                //     let td4 = "<td class='selected-item-name'>" + request[i].itemName + "</td>";
                //     let td5 = "<td class='selected-quantity'>" + request[i].quantity + "</td>";
                //     let td6 = "<td class='selected-status'>" + request[i].status + "</td>";
                //
                //     $("#request-table").append(tr+td1+td2+td3+td4+td5);
                //
                // }

                setModalTableData(requestFromJson);

                for (let i = 0; i < requestFromJson.length; i++) {
                    if(requestFromJson[i].status == 'Rejected'){
                        alert("one of the request is already rejected!");
                        break;
                    }
                    let request = {
                        id : requestFromJson[i].id,
                        status: "Approved"
                    };

                    requestJson = JSON.stringify(request);

                    $.ajax({
                        url: 'http://localhost:8080/bim/api/requests/change',
                        type: 'PUT',
                        dataType: 'JSON',
                        contentType: 'application/json',
                        data: requestJson,
                        success: function () {
                            alert("success");
                            window.location.reload();
                        },
                        error: function () {
                            alert("failed");
                        }
                    });
                }

            } else if (this.id == 'reject-button') {

                if (!selectedRequest.length > 1) {
                    $('#message-box .modal-body').text("You must select at least 1 request");
                    $('#message-box').modal('show');
                }
                else {
                    $("#entry-edit-form").css("display", "none");
                    $("#request-div").css("display", "inline");
                    $('.modal-title').text("Reject Request(s)");
                    $('#item-action-modal').modal('show');
                    $("#request-table>tbody").empty();
                    $("#rejectReasonBox").css("display", "block");
                    $('#submit-form').click();
                    let requestFromJson = JSON.parse(idJson);

                    setModalTableData(requestFromJson);

                    let rejectReason = $("#rejectReasonBox").val();

                    for (let i = 0; i < requestFromJson.length; i++) {

                        let request = {
                            id : requestFromJson[i].id,
                            status: "Rejected",
                            notes: rejectReason
                        };

                        requestJson = JSON.stringify(request);

                        $.ajax({
                            url: 'http://localhost:8080/bim/api/requests/change',
                            type: 'PUT',
                            dataType: 'JSON',
                            contentType: 'application/json',
                            data: requestJson,
                            success: function () {
                                alert("success");
                                window.location.reload();
                            },
                            error: function () {
                                alert("failed");
                            }
                        });
                    }
                    ;

                }
            } else if (this.id == 'handover-button') {
                if (!selectedRequest.length > 1) {
                    $('#message-box .modal-body').text("You must select at least 1 request");
                    $('#message-box').modal('show');
                }
                else {
                    $("#entry-edit-form").css("display", "none");
                    $("#request-div").css("display", "inline");
                    $('.modal-title').text("Handover Request(s)");
                    $('#item-action-modal').modal('show');
                    $("#request-table>tbody").empty();
                    $('#submit-form').click();
                    let requestFromJson = JSON.parse(idJson);

                    setModalTableData(requestFromJson);

                    for (let i = 0; i < requestFromJson.length; i++) {
                        if(requestFromJson[i].status == 'Approved') {
                            let request = {
                                id: requestFromJson[i].id,
                                status: "Received"
                            };

                            requestJson = JSON.stringify(request);

                            $.ajax({
                                url: 'http://localhost:8080/bim/api/requests/change',
                                type: 'PUT',
                                dataType: 'JSON',
                                contentType: 'application/json',
                                data: requestJson,
                                success: function () {
                                    alert("success");
                                    window.location.reload();
                                },
                                error: function () {
                                    alert("failed");
                                }
                            });
                        }
                        alert("one of the request is already received / rejected!");
                    }
                    ;
                }
            }
        }
    });
});