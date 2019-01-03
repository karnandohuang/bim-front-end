let API_PATH_EMPLOYEES = "http://localhost:8080/bim/api/employees";

function sendEntryEmployeeJson(employeeJson) {
    $.ajax({
        url: API_PATH_EMPLOYEES,
        type: "POST",
        dataType: "JSON",
        contentType: "application/json; charset=utf-8",
        data: employeeJson,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Bearer " + localStorage.getItem('token'));
        },
        async:false,
        success: function (response, status, jqXHR) {
            if(response.success === true) {
                displayMessageBox("Successfully added new employee");
                $('#employee-action-modal').modal('hide');
                $('.modal-footer').on('click', '#message-box-button', function () {
                    window.location.reload();
                });
            } else {
                displayMessageBox("Failed to add new employee. " + " (" + response.errorMessage + ")");
            }
        },
        error: function (response, status, jqXHR) {
            displayMessageBox("Failed to add new employee" + " (" + status + ")");
        }
    });
}

function setEntryModalAttributes() {
    $('.modal-title').text("Entry Employee");
    $('#employee-id-row').css('display', 'none');
    $('#entry-edit-form').css('display', '');
    $('#employee-password-row').css('display', '');
    $('#table-modal-div').css('display', 'none');
    $('.modal-save-button').prop('id', 'entry-employee-button');
    $('#employee-action-modal').modal('show');
}

function EmptyEntryForm() {
    $('#input-employee-name').val(null);
    $('#input-superior-id').val(null);
    $('#input-email').val(null);
    $('#input-password').val(null);
    $('#input-position').val(null);
    $('#input-division').val(null);
}

function displayMessageBox(message) {
    $('#message-box .modal-body').text(message);
    $('#message-box').modal('show');
}

function setEmployeeJson() {
    let employeeJson = [];

    $('#submit-form').click();
    let form = $("#entry-edit-form");

    if (form[0].checkValidity()) {
        let employeeName = $('#input-employee-name').val();
        let superiorId = $('#input-superior-id').val();
        let dob = $('#datepicker').val();
        let email = $('#input-email').val();
        let password = $('#input-password').val();
        let position = $('#input-position').val();
        let division = $('#input-division').val();

        if (superiorId === "")
            superiorId = "null";

        let employee = {
            name: employeeName,
            superiorId: superiorId,
            dob: dob,
            email: email,
            password: password,
            position: position,
            division: division
        };
        employeeJson = JSON.stringify(employee);
    }
    return employeeJson;
}

$(document).ready(function () {

    $('#entry-button').click(function () {
        EmptyEntryForm();
        setEntryModalAttributes();
    });

    $('.modal-footer').on('click', '#entry-employee-button', function (e) {
        e.stopPropagation();
        let employeeJson = setEmployeeJson();
        sendEntryEmployeeJson(employeeJson);
    });
});
