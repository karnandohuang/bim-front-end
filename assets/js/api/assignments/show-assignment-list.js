$(document).ready(function () {

    let currentPage = 1;
    let pageSize = 6;
    let totalPage = 1;
    let sortedBy = "id";
    let sortedType = "asc";
    let filter="";

    function displayTablePage(currentPage) {
        $('#current-page').text(currentPage);
        $('#table-prev-page-button').prop('disabled', false);
        $('#table-next-page-button').prop('disabled', false);
        if (localStorage.getItem("role") === "ADMIN") {
        $.ajax({
            url: 'http://localhost:8080/bim/api/requests?' + 'filterStatus='  + filter + '&pageNumber=' + currentPage + '&pageSize=' + pageSize +
                '&sortedBy=' + sortedBy + '&sortedType=' + sortedType,
            type: 'GET',
            dataType: 'JSON',
            contentType: 'application/json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + localStorage.getItem('token'));
                // console.log(xhr.getAllResponseHeaders());
            },
            success: function (response, status, jqXHR) {
                if(response.paging.totalRecords > 0) {
                    $(response.value.list).each(function (index, value) {

                        let record =
                            "<tr class='row-select'><td class='select'>" +
                            '<input class="form-check-input position-static ml-1" type="checkbox" value="">' +
                            "</td><td class='assignment-id'>" + value.assignment.id +
                            "</td><td class='employee-id'>" + value.assignment.employee.id +
                            "</td><td class='employee-name'>" + value.assignment.employee.name +
                            "</td><td class='item-id'>" + value.assignment.item.id +
                            "</td><td class='item-name'>" + value.assignment.item.name +
                            "</td><td class='qty'>" + value.assignment.qty +
                            "</td><td class='status'>" + value.assignment.status +
                            "</td><td class='notes'>" + value.assignment.notes +
                            "</td></tr>";

                        $('#data-table').append(record);
                    });
                    totalPage = response.paging.totalPage;
                    if(totalPage===0)
                        totalPage=1;
                    $('#total-page').text(totalPage);

                    if((currentPage === 1) && (currentPage === totalPage)) {
                        $('#table-prev-page-button').prop('disabled', true);
                        $('#table-next-page-button').prop('disabled', true);
                    } else if(currentPage === 1){
                        $('#table-prev-page-button').prop('disabled', true);
                    } else if(currentPage === totalPage){
                        $('#table-next-page-button').prop('disabled', true);
                    }

                }else {
                    let record = "<tr><td colspan='100' class='text-center p-4'><h3>No Data Available</h3></td></tr>";
                    $('#data-table').append(record);
                }
            },
            error: function (response, status, jqXHR) {
                let record =
                    "<tr><td colspan='100' class='text-center p-4'>" +
                    "<h3>Error Retrieving Data</h3>" +
                    "<button class='btn btn-primary' onclick='window.location.reload()'>Reload</button>" +
                    "</td></tr>";

                $('#data-table').append(record);
            }
        });
        }
        else if (localStorage.getItem('role') === "SUPERIOR") {
            $.ajax({
                url: 'http://localhost:8080/bim/api/requests/superior/employee?' + 'filterStatus=' + filter + '&pageNumber=' + currentPage + '&pageSize=' + pageSize +
                    '&sortedBy=' + sortedBy + '&sortedType=' + sortedType,
                type: 'GET',
                dataType: 'JSON',
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', "Bearer " + localStorage.getItem('token'));
                    // console.log(xhr.getAllResponseHeaders());
                },
                success: function (response, status, jqXHR) {
                    if (response.paging.totalRecords > 0) {
                        $(response.value).each(function (index, value) {

                            let record =
                                "<tr class='row-select'><td class='select'>" +
                                '<input class="form-check-input position-static ml-1" type="checkbox" value="">' +
                                "</td><td class='assignment-id'>" + value.assignmentId +
                                "</td><td class='employee-id'>" + value.employeeId +
                                "</td><td class='employee-name'>" + value.employeeName +
                                "</td><td class='item-id'>" + value.item.id +
                                "</td><td class='item-name'>" + value.item.name +
                                "</td><td class='qty'>" + value.item.qty +
                                "</td><td class='status'>" + value.status +
                                "</td><td class='notes'>" + value.notes +
                                "</td></tr>";

                            $('#data-table').append(record);
                        });
                        totalPage = response.paging.totalPage;
                        if (totalPage === 0)
                            totalPage = 1;
                        $('#total-page').text(totalPage);

                        if ((currentPage === 1) && (currentPage === totalPage)) {
                            $('#table-prev-page-button').prop('disabled', true);
                            $('#table-next-page-button').prop('disabled', true);
                        } else if (currentPage === 1) {
                            $('#table-prev-page-button').prop('disabled', true);
                        } else if (currentPage === totalPage) {
                            $('#table-next-page-button').prop('disabled', true);
                        }

                    } else {
                        let record = "<tr><td colspan='100' class='text-center p-4'><h3>No Data Available</h3></td></tr>";
                        $('#data-table').append(record);
                    }
                },
                error: function (response, status, jqXHR) {
                    let record =
                        "<tr><td colspan='100' class='text-center p-4'>" +
                        "<h3>Error Retrieving Data</h3>" +
                        "<button class='btn btn-primary' onclick='window.location.reload()'>Reload</button>" +
                        "</td></tr>";

                    $('#data-table').append(record);
                }
            });
        }
    }

    displayTablePage(1);

    //send JSON containing page number to backend, and retrieve assignment list according to page number
    $(document).on('click', '#table-next-page-button',function () {
        $("#data-table>tbody").empty();

        if(currentPage !== totalPage){
            currentPage++;
        }
        displayTablePage(currentPage);
    });

    $(document).on('click', '#table-prev-page-button',function () {
        $("#data-table>tbody").empty();
        if(currentPage!==1){
            currentPage--;
        }
        displayTablePage(currentPage);
    });

    $(document).on('change', '#sorted-by', function () {
        $('#data-table>tbody').empty();
        sortedBy = $('#sorted-by').val();
        currentPage = 1;
        displayTablePage(currentPage);
    });

    $(document).on('change', '#sorted-type', function () {
        $('#data-table>tbody').empty();
        sortedType = $('#sorted-type').val();
        currentPage = 1;
        displayTablePage(currentPage);
    });

    $(document).on('change', '#page-size', function () {
        $('#data-table>tbody').empty();
        pageSize = $('#page-size').val();
        currentPage = 1;
        displayTablePage(currentPage);
    });

    $(document).on('change', 'input[type=radio][name=assignment-status-filter]', function () {
        $('#data-table>tbody').empty();
        filter=$('input[type=radio][name=assignment-status-filter]:checked').val();
        console.log(filter);
        currentPage = 1;
        displayTablePage(currentPage);
    });
});