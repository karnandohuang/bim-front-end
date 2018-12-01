$(document).ready(function () {
    let idJson;

    function displayMessageBox(message) {
        $('#message-box .modal-body').text(message);
        $('#message-box').modal('show');
    }

    function setModalTableData(assignment) {

        for (let i = 0; i < assignment.length; i++) {
            let tr = "<tr>";
            let td0 = "<td class='selected-assignment-id'>" + assignment[i].id + "</td>";
            let td1 = "<td class='selected-employee-id'>" + assignment[i].employeeId + "</td>";
            let td2 = "<td class='selected-employee-name'>" + assignment[i].employeeName + "</td>";
            let td3 = "<td class='selected-item-sku'>" + assignment[i].itemSKU + "</td>";
            let td4 = "<td class='selected-item-name'>" + assignment[i].itemName + "</td>";
            let td5 = "<td class='selected-quantity'>" + assignment[i].quantity + "</td>";
            let td6 = "<td class='selected-status'>" + assignment[i].status + "</td></tr>";

            $("#assignment-table").append(tr + td0 + td1 + td2 + td3 + td4 + td5 + td6);
        }
    }

    function setApproveModalAttributes() {
        $("#entry-edit-form").css("display", "none");
        $("#assignment-div").css("display", "inline");
        $('.modal-title').text("Approve Assignment(s)");
        $('#action-modal').modal('show');
        $("#reject-reason-box").css("display", "none");
        $("#assignment-table>tbody").empty();
        $('.modal-save-button').prop('id', 'approve-assignment-button');
    }

    function setRejectModalAttributes() {
        $("#entry-edit-form").css("display", "none");
        $("#assignment-div").css("display", "inline");
        $('.modal-title').text("Reject Assignment(s)");
        $('#action-modal').modal('show');
        $("#assignment-table>tbody").empty();
        $("#reject-reason-box").css("display", "block");
        $('.modal-save-button').prop('id', 'reject-assignment-button');
    }

    function setHandoverModalAttributes() {
        $("#entry-edit-form").css("display", "none");
        $("#assignment-div").css("display", "inline");
        $('.modal-title').text("Handover Assignment(s)");
        $('#action-modal').modal('show');
        $("#reject-reason-box").css("display", "none");
        $("#assignment-table>tbody").empty();
        $('.modal-save-button').prop('id', 'handover-assignment-button');
    }

    function getAssignmentIds(assignmentFromJson, ids, requiredStatus) {
        for (let i = 0; i < assignmentFromJson.length; i++) {
            if (assignmentFromJson[i].status === requiredStatus) {
                let id = assignmentFromJson[i].id;
                ids.push(id);
            }
            else {
                ids = [];
                displayMessageBox("All of the selected assignments' status must be " + requiredStatus);
                break;
            }
        }
        return ids;
    }

    let ASSIGNMENT_API_URL = 'http://localhost:8080/bim/api/requests/changeStatus';

    function approveAssignmentAjax() {
        $.ajax({
            url: ASSIGNMENT_API_URL,
            type: 'PUT',
            async: false,
            dataType: 'JSON',
            contentType: 'application/json',
            data: assignmentJson,
            success: function (response, status, jqXHR) {
                if (response.success === true) {
                    displayMessageBox("Approve Success");
                    $('#action-modal').modal('hide');
                    $('.modal-footer').on('click', '#message-box-button', function () {
                        window.location.reload();
                    });
                } else {
                    displayMessageBox("Approve Failed" + " (" + response.errorMessage + ")");
                }
            },
            error: function (response, status, jqXHR) {
                displayMessageBox("Approve Failed" + " (" + status + ")");
            }
        });
    }

    function rejectAssignmentAjax() {
        $.ajax({
            url: ASSIGNMENT_API_URL,
            type: 'PUT',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: assignmentJson,
            success: function (response, status, jqXHR) {
                if (response.success === true) {

                    displayMessageBox("Reject Assignment Success");
                    $('#action-modal').modal('hide');
                    $('.modal-footer').on('click', '#message-box-button', function () {
                        window.location.reload();
                    });

                } else {
                    displayMessageBox("Reject Assignment Failed" + " (" + response.errorMessage + ")");
                }
            },
            error: function (response, status, jqXHR) {
                displayMessageBox("Reject Assignment Failed" + " (" + status + ")");
            }
        });
    }

    function handoverAssignmentAjax() {
        $.ajax({
            url: ASSIGNMENT_API_URL,
            type: 'PUT',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: assignmentJson,
            success: function (response, status, jqXHR) {
                if (response.success === true) {
                    displayMessageBox("Handover Success");
                    $('#action-modal').modal('hide');
                    $('.modal-footer').on('click', '#message-box-button', function () {
                        window.location.reload();
                    });
                } else {
                    displayMessageBox("Handover Failed" + " (" + response.errorMessage + ")");
                }
            },
            error: function (response, status, jqXHR) {
                displayMessageBox("Handover Failed" + " (" + status + ")");
            }
        });
    }

//when pressing assignment button
    $('#approve-button, #reject-button, #handover-button').on('click', function () {
        let selectedAssignment = [];

        //get assignment data from table to JSON
        $('.row-select input:checked').each(function () {
            let selectedAssignmentId = $(this).closest('tr').find('.assignment-id').html();
            let selectedEmployeeId = $(this).closest('tr').find('.employee-id').html();
            let selectedEmployeeName = $(this).closest('tr').find('.employee-name').html();
            let selectedItemSku = $(this).closest('tr').find('.item-sku').html();
            let selectedItemName = $(this).closest('tr').find('.item-name').html();
            let selectedQty = $(this).closest('tr').find('.qty').html();
            let selectedStatus = $(this).closest('tr').find('.status').html();


            let assignment = {
                id: selectedAssignmentId,
                employeeId: selectedEmployeeId,
                employeeName: selectedEmployeeName,
                itemSKU: selectedItemSku,
                itemName: selectedItemName,
                quantity: selectedQty,
                status: selectedStatus
            };
            selectedAssignment.push(assignment);

            idJson = JSON.stringify(selectedAssignment);
            console.log(idJson);
        });

        //if no assignment is selected
        if (!selectedAssignment.length > 0) {
            displayMessageBox("You must select at least 1 assignment");

        } else {
            if (this.id === 'approve-button') {
                setApproveModalAttributes();
                let assignmentFromJson = JSON.parse(idJson);
                setModalTableData(assignmentFromJson);

                let ids = [];

                $('.modal-footer').one('click', '#approve-assignment-button', function () {

                    ids = getAssignmentIds(assignmentFromJson, ids, 'Pending');

                    if(ids.length !== 0) {
                        let assignment = {
                            ids: ids,
                            status: "Approved"
                        };

                        assignmentJson = JSON.stringify(assignment);

                        console.log(assignmentJson);

                        approveAssignmentAjax();
                    }
                });

            } else if (this.id === 'reject-button') {
                setRejectModalAttributes();
                let assignmentFromJson = JSON.parse(idJson);
                setModalTableData(assignmentFromJson);

                let ids = [];

                $('.modal-footer').on('click', '#reject-assignment-button', function () {
                    let rejectReason = $('#reject-reason').val();
                    ids = getAssignmentIds(assignmentFromJson, ids, 'Pending');

                    if(ids.length !== 0) {
                        let assignment = {
                            ids: ids,
                            status: "Rejected",
                            notes: rejectReason
                        };

                        assignmentJson = JSON.stringify(assignment);
                        console.log(assignmentJson);

                        rejectAssignmentAjax();

                    }
                });
            } else if (this.id === 'handover-button') {
                setHandoverModalAttributes();

                let assignmentFromJson = JSON.parse(idJson);
                setModalTableData(assignmentFromJson);

                let ids = [];

                $('.modal-footer').on('click', '#handover-assignment-button', function () {
                    ids = getAssignmentIds(assignmentFromJson, ids, 'Approved');

                    if(ids.length !== 0){
                        let assignment = {
                            ids: ids,
                            status: "Received"
                        };

                        assignmentJson = JSON.stringify(assignment);

                        handoverAssignmentAjax();
                    }
                });
            }
        }
    });
});

