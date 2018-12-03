$(document).ready(function () {

    function callCountAjax(employeeId, status, attributeName) {
        $.ajax({
            url: 'http://localhost:8080/bim/api/requests/count?' + 'employeeId=' + employeeId + '&status=' + status,
            type: 'GET',
            dataType: 'JSON',
            contentType: 'application/json',
            async: false,
            success: function (response) {
                if(response.success === true){
                    let count = response.value.assignmentCount;
                    if(count >= 9999){
                        $(attributeName).text("> 9999");
                    } else{
                        $(attributeName).text(count);
                    }
                }
            },
            error: function () {
            }
        });
    }

    var employeeId = "EM068";

    callCountAjax(employeeId, "Pending", '#total-pending-request');
    callCountAjax(employeeId, "Approved", '#total-pending-handover');
    callCountAjax(employeeId, "Received", '#total-my-items');

});