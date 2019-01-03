let API_PATH_GET_EMPLOYEES = "http://localhost:8080/bim/api/employees";

function editEmployee() {
    $('#submit-form').click();
    let form = $("#entry-edit-form");

    if (form[0].checkValidity()) {
        let id = $('#input-employee-id').val();
        let name = $('#input-employee-name').val();
        let superiorId = $('#input-superior-id').val();
        let dob = $('#datepicker').val();
        let email = $('#input-email').val();
        let position = $('#input-position').val();
        let division = $('#input-division').val();

        if (superiorId === "")
            superiorId = "null";

        var employee = {
            id: id,
            name: name,
            superiorId: superiorId,
            dob: dob,
            email: email,
            position: position,
            division: division
        };

        var employeeJson = JSON.stringify(employee);
        sendEditedEmployeeJson(employeeJson);
    }
}

function setEditModalAttributes() {
    $('.modal-title').text("Edit Employee");
    $('#entry-edit-form').css('display', '');
    $("#table-modal-div").css("display", 'none');
    $('#employee-id-row').css('display', '');
    $('#employee-password-row').css('display', 'none');
    $("#input-password").removeAttr("required");
    $('.modal-save-button').prop('id', 'edit-employee-button');
    $('#employee-action-modal').modal('show');
}

function displayMessageBox(message) {
    $('#message-box .modal-body').text(message);
    $('#message-box').modal('show');
}

function setEditEmployeeForm(data) {
    $('#input-employee-id').val(data.value.value.id);
    $('#input-employee-name').val(data.value.value.name);
    $('#input-superior-id').val(data.value.value.superiorId);
    $('#datepicker').datepicker().value(data.value.value.dob);
    $('#input-email').val(data.value.value.email);
    $('#input-position').val(data.value.value.position);
    $('#input-division').val(data.value.value.division);
}

function getEmployeeJson(employeeIdToBeEdited) {
    $.ajax({
        url: 'http://localhost:8080/bim/api/employees/' + employeeIdToBeEdited,
        type: 'GET',
        dataType: 'JSON',
        contentType: 'application/json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Bearer " + localStorage.getItem('token'));
        },
        success: function (data) {
            setEditEmployeeForm(data);
        },
        error: function () {

        }
    });
}

function sendEditedEmployeeJson(employeeJson) {
    $.ajax({
        url: API_PATH_GET_EMPLOYEES,
        type: "PUT",
        dataType: "JSON",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Bearer " + localStorage.getItem('token'));
        },
        data: employeeJson,
        success: function (response, status, jqXHR) {
            if(response.success === true) {
                displayMessageBox("Successfully edited employee information");
                $('#employee-action-modal').modal('hide');
                $('.modal-footer').on('click', '#message-box-button', function () {
                    window.location.reload();
                });
            } else {
                displayMessageBox("Failed to edit employee information" + " (" + response.errorMessage + ")");
            }
        },
        error: function (response, status, jqXHR) {
            displayMessageBox("Failed to edit employee information" + " (" + status + ")");
        }
    });
}

$(document).ready(function () {

    $(document).on('click', '.edit-button', function (e) {
        e.stopPropagation();
        setEditModalAttributes();

        let employeeToBeEdited = $(this).closest('tr').find('.id').html();
        getEmployeeJson(employeeToBeEdited);
    });

    $(document).on('click', '#edit-employee-button', function (e) {
        e.stopPropagation();
        editEmployee();
    });
});