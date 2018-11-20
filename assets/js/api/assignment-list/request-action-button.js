$(document).ready(function () {
    let idJson;

    function displayMessageBox(message) {
        $('#message-box .modal-body').text(message);
        $('#message-box').modal('show');
    }

    function setModalTableData(request) {

        for (let i = 0; i < request.length; i++) {
            let tr = "<tr>";
            let td0 = "<td class='selected-request-id'>" + request[i].id + "</td>";
            let td1 = "<td class='selected-employee-id'>" + request[i].employeeId + "</td>";
            let td2 = "<td class='selected-employee-name'>" + request[i].employeeName + "</td>";
            let td3 = "<td class='selected-item-sku'>" + request[i].itemSKU + "</td>";
            let td4 = "<td class='selected-item-name'>" + request[i].itemName + "</td>";
            let td5 = "<td class='selected-quantity'>" + request[i].quantity + "</td>";
            let td6 = "<td class='selected-status'>" + request[i].status + "</td></tr>";

            $("#request-table").append(tr + td0 + td1 + td2 + td3 + td4 + td5 + td6);
        }
    }

    function setApproveModalAttributes() {
        $("#entry-edit-form").css("display", "none");
        $("#request-div").css("display", "inline");
        $('.modal-title').text("Approve Request(s)");
        $('#action-modal').modal('show');
        $("#reject-reason-box").css("display", "none");
        $("#request-table>tbody").empty();
        $('.modal-save-button').prop('id', 'approve-request-button');
    }

    function setRejectModalAttributes() {
        $("#entry-edit-form").css("display", "none");
        $("#request-div").css("display", "inline");
        $('.modal-title').text("Reject Request(s)");
        $('#action-modal').modal('show');
        $("#request-table>tbody").empty();
        $("#reject-reason-box").css("display", "block");
        $('.modal-save-button').prop('id', 'reject-request-button');
    }

    function setHandoverModalAttributes() {
        $("#entry-edit-form").css("display", "none");
        $("#request-div").css("display", "inline");
        $('.modal-title').text("Handover Request(s)");
        $('#action-modal').modal('show');
        $("#reject-reason-box").css("display", "none");
        $("#request-table>tbody").empty();
        $('.modal-save-button').prop('id', 'handover-request-button');
    }

    function getRequestIds(requestFromJson, ids, requiredStatus) {
        for (let i = 0; i < requestFromJson.length; i++) {
            if (requestFromJson[i].status === requiredStatus) {
                let id = requestFromJson[i].id;
                ids.push(id);
            }
            else {
                ids = [];
                displayMessageBox("All of the selected requests' status must be " + requiredStatus);
                break;
            }
        }
        return ids;
    }

//when pressing request button
    $('#approve-button, #reject-button, #handover-button').on('click', function () {
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
                id: selectedRequestId,
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
            displayMessageBox("You must select at least 1 request");

        } else {
            if (this.id === 'approve-button') {
                setApproveModalAttributes();
                let requestFromJson = JSON.parse(idJson);
                setModalTableData(requestFromJson);

                let ids = [];

                $('.modal-footer').one('click', '#approve-request-button', function () {

                    ids = getRequestIds(requestFromJson, ids, 'Pending');

                    if(ids.length !== 0) {
                        let request = {
                            ids: ids,
                            status: "Approved"
                        };

                        requestJson = JSON.stringify(request);

                        console.log(requestJson);

                        $.ajax({
                            url: 'http://localhost:8080/bim/api/requests/changeStatus',
                            type: 'PUT',
                            async: false,
                            dataType: 'JSON',
                            contentType: 'application/json',
                            data: requestJson,
                            success: function () {
                                displayMessageBox("Approve Success");
                                $('.modal-footer').on('click', '#message-box-button', function () {
                                    window.location.reload();
                                });
                            },
                            error: function () {
                                displayMessageBox("Approve Failed");
                            }
                        });
                    }
                });

            } else if (this.id === 'reject-button') {
                setRejectModalAttributes();
                let requestFromJson = JSON.parse(idJson);
                setModalTableData(requestFromJson);

                let ids = [];

                $('.modal-footer').on('click', '#reject-request-button', function () {
                    let rejectReason = $('#reject-reason').val();
                    ids = getRequestIds(requestFromJson, ids, 'Pending');

                    if(ids.length !== 0) {
                        let request = {
                            ids: ids,
                            status: "Rejected",
                            notes: rejectReason
                        };

                        requestJson = JSON.stringify(request);
                        console.log(requestJson);

                        $.ajax({
                            url: 'http://localhost:8080/bim/api/requests/changeStatus',
                            type: 'PUT',
                            dataType: 'JSON',
                            async: false,
                            contentType: 'application/json',
                            data: requestJson,
                            success: function () {
                                displayMessageBox("Reject Request Success");
                                $('.modal-footer').on('click', '#message-box-button', function () {
                                    window.location.reload();
                                });                        },
                            error: function () {
                                displayMessageBox("Reject Request Failed");
                            }
                        });

                    }
                });
            } else if (this.id === 'handover-button') {
                setHandoverModalAttributes();

                let requestFromJson = JSON.parse(idJson);
                setModalTableData(requestFromJson);

                let ids = [];

                $('.modal-footer').on('click', '#handover-request-button', function () {
                    ids = getRequestIds(requestFromJson, ids, 'Approved');

                    if(ids.length !== 0){
                        let request = {
                            ids: ids,
                            status: "Received"
                        };

                        requestJson = JSON.stringify(request);

                        $.ajax({
                            url: 'http://localhost:8080/bim/api/requests/changeStatus',
                            type: 'PUT',
                            dataType: 'JSON',
                            async: false,
                            contentType: 'application/json',
                            data: requestJson,
                            success: function () {
                                displayMessageBox("Handover Success")
                                $('.modal-footer').on('click', '#message-box-button', function () {
                                    window.location.reload();
                                });
                            },
                            error: function () {
                                displayMessageBox("Handover Failed");
                            }
                        });
                    }
                });
            }
        }
    });
});

