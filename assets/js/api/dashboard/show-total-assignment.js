$(document).ready(function () {

    function callCountAjax(employeeId) {
        $.ajax({
            url: 'http://localhost:8080/bim/api/requests/count?' + 'employeeId=' + employeeId,
            type: 'GET',
            dataType: 'JSON',
            contentType: 'application/json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + localStorage.getItem('token'));
            },
            async: false,
            success: function (response) {
                if(response.success === true){

                    let pendingAssignmentCount = response.value.listOfCount.pendingAssignmentCount;
                    let pendingHandoverCount = response.value.listOfCount.pendingHandoverCount;
                    let receivedCount = response.value.listOfCount.receivedCount;

                    if(pendingAssignmentCount >= 9999) {
                        $('#total-pending-request').text("> 9999");
                    }else{
                        $('#total-pending-request').text(pendingAssignmentCount);
                    }

                    if(pendingHandoverCount >= 9999) {
                        $('#total-pending-handover').text("> 9999");
                    }else{
                        $('#total-pending-handover').text(pendingHandoverCount);
                    }

                    if(receivedCount >= 9999) {
                        $('#total-my-items').text("> 9999");
                    }else{
                        $('#total-my-items').text(receivedCount);
                    }
                }
            },
            error: function () {
            }
        });
    }

    var employeeId = "EM068";

    callCountAjax(employeeId);

});