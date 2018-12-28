window.module = window.module || {};

let API_PATH_CHANGE_ASSIGNMENT_STATUS = 'http://localhost:8080/bim/api/requests/changeStatus';

function changeStatusAjax(actionName, jsonData){
    $.ajax({
        url: API_PATH_CHANGE_ASSIGNMENT_STATUS,
        type: 'PUT',
        dataType: 'JSON',
        async: false,
        contentType: 'application/json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Bearer " + localStorage.getItem('token'));
            // console.log(xhr.getAllResponseHeaders());
        },
        data: jsonData,
        success: function (response, status, jqXHR) {
            if (response.success === true) {
                displayMessageBox(actionName + " Success");
                $('#action-modal').modal('hide');
                $('.modal-footer').on('click', '#message-box-button', function () {
                    window.location.reload();
                });
            } else {
                displayMessageBox(actionName + " Assignment Failed" + " (" + response.errorMessage + ")");
            }
        },
        error: function (response, status, jqXHR) {
            displayMessageBox(actionName + " Assignment Failed" + " (" + status + ")");
        }
    });
}

function displayMessageBox(message) {
    $('#message-box .modal-body').text(message);
    $('#message-box').modal('show');
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

function setModalTableData(assignment) {

    for (let i = 0; i < assignment.length; i++) {
        let tr = "<tr>";
        let td0 = "<td class='selected-assignment-id'>" + assignment[i].id + "</td>";
        let td1 = "<td class='selected-employee-id'>" + assignment[i].employeeId + "</td>";
        let td2 = "<td class='selected-employee-name'>" + assignment[i].employeeName + "</td>";
        let td3 = "<td class='selected-item-id'>" + assignment[i].itemId + "</td>";
        let td4 = "<td class='selected-item-name'>" + assignment[i].itemName + "</td>";
        let td5 = "<td class='selected-quantity'>" + assignment[i].quantity + "</td>";
        let td6 = "<td class='selected-status'>" + assignment[i].status + "</td></tr>";

        $("#assignment-table").append(tr + td0 + td1 + td2 + td3 + td4 + td5 + td6);
    }
}

function getAssignmentIds(selectedAssignment, ids, requiredStatus) {
    for (let i = 0; i < selectedAssignment.length; i++) {
        if (selectedAssignment[i].status === requiredStatus) {
            let id = selectedAssignment[i].id;
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

function actionButtonOnClick() {
    let selectedAssignment = [];
    let assignmentJson;

    //get assignment data from table
    $('.row-select input:checked').each(function () {
        let selectedAssignmentId = $(this).closest('tr').find('.assignment-id').html();
        let selectedEmployeeId = $(this).closest('tr').find('.employee-id').html();
        let selectedEmployeeName = $(this).closest('tr').find('.employee-name').html();
        let selectedItemId = $(this).closest('tr').find('.item-id').html();
        let selectedItemName = $(this).closest('tr').find('.item-name').html();
        let selectedQty = $(this).closest('tr').find('.qty').html();
        let selectedStatus = $(this).closest('tr').find('.status').html();

        let assignment = {
            id: selectedAssignmentId,
            employeeId: selectedEmployeeId,
            employeeName: selectedEmployeeName,
            itemSKU: selectedItemId,
            itemName: selectedItemName,
            quantity: selectedQty,
            status: selectedStatus
        };
        selectedAssignment.push(assignment);
    });

    //if no assignment is selected
    if (!selectedAssignment.length > 0) {
        displayMessageBox("You must select at least 1 assignment");

    } else {
        if (this.id === 'approve-button') {
            setApproveModalAttributes();
            setModalTableData(selectedAssignment);
            let ids = [];

            $('.modal-footer').one('click', '#approve-assignment-button', function () {
                ids = getAssignmentIds(selectedAssignment, ids, 'Pending');

                if (ids.length !== 0) {
                    let assignment = {
                        ids: ids,
                        status: "Approved"
                    };
                    assignmentJson = JSON.stringify(assignment);
                    changeStatusAjax("Approve", assignmentJson);
                }
            });

        } else if (this.id === 'reject-button') {
            setRejectModalAttributes();
            setModalTableData(selectedAssignment);
            let ids = [];

            $('.modal-footer').on('click', '#reject-assignment-button', function () {
                let rejectReason = $('#reject-reason').val();
                ids = getAssignmentIds(selectedAssignment, ids, 'Pending');

                if (ids.length !== 0) {
                    let assignment = {
                        ids: ids,
                        status: "Rejected",
                        notes: rejectReason
                    };
                    assignmentJson = JSON.stringify(assignment);
                    changeStatusAjax("Reject", assignmentJson);
                }

                $('.modal-footer').off('click', '#reject-assignment-button');
            });
        } else if (this.id === 'handover-button') {
            setHandoverModalAttributes();
            setModalTableData(selectedAssignment);
            let ids = [];

            $('.modal-footer').on('click', '#handover-assignment-button', function () {
                ids = getAssignmentIds(selectedAssignment, ids, 'Approved');

                if (ids.length !== 0) {
                    let assignment = {
                        ids: ids,
                        status: "Received"
                    };
                    assignmentJson = JSON.stringify(assignment);
                    changeStatusAjax("Handover", assignmentJson);
                }

                $('.modal-footer').off('click', '#handover-assignment-button');
            });
        }
    }
}

$(document).ready(function () {

//when pressing assignment button
    $('#approve-button, #reject-button, #handover-button').on('click', function () {
        actionButtonOnClick.call(this);
    });

});

module.exports = {
    changeStatusAjax,
    displayMessageBox,
    setModalTableData,
    getAssignmentIds,
    actionButtonOnClick
};