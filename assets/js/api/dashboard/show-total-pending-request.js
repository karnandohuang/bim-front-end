$(document).ready(function () {

    function callCountAjax(employeeId, status, attributeName) {
        $.ajax({
            url: 'http://localhost:8080/bim/api/requests/' + employeeId + '/' + status,
            type: 'GET',
            dataType: 'JSON',
            contentType: 'application/json',
            async: false,
            success: function (data) {
                let count = data.value;

                $(attributeName).text(count);
            },
            error: function () {
            }
        });
    }

    var employeeId = "EM066";

    callCountAjax(employeeId, "Pending", '#total-pending-request');
    callCountAjax(employeeId, "Approved", '#total-pending-handover');
    callCountAjax(employeeId, "Received", '#total-my-items');

});