$(document).ready(function () {
    function setEntryModalAttributes() {
        $('.modal-title').text("Entry Employee");
        $('#employee-id-row').css('display', 'none');
        $('#employee-password-row').css('display', '');
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

    $('#entry-button').click(function () {
        EmptyEntryForm();
        setEntryModalAttributes();
    });

    $('.modal-footer').on('click', '#entry-employee-button', function () {
        let employeeName = $('#input-employee-name').val();
        let superiorId = $('#input-superior-id').val();
        let dob = $('#datepicker').val();
        let email = $('#input-email').val();
        let password = $('#input-password').val();
        let position = $('#input-position').val();
        let division = $('#input-division').val();

        var employee = {
            name: employeeName,
            superiorId: superiorId,
            dob: dob,
            email: email,
            password: password,
            position: position,
            division: division
        };

        var employeeJson = JSON.stringify(employee);

        $.ajax({
            url: "http://localhost:8080/bim/api/employees",
            type: "POST",
            dataType: "JSON",
            contentType: "application/json",
            data: employeeJson,
            success: function () {
                alert("Success");
                window.location.reload();
            },
            error: function () {
                alert("failed");
            }
        });

        // TODO : Add form validation

    });



});