$(document).ready(function () {
    let employeeId = "EM068";
    let currentPage = 1;
    let totalPage = 1;
    let pageSize = 6;
    let sortedBy = "id";
    let sortedType = "asc";

    function displayTablePage(currentPage) {
        $('#current-page').text(currentPage);
        $('#table-prev-page-button').prop('disabled', false);
        $('#table-next-page-button').prop('disabled', false);

        $.ajax({
            url: 'http://localhost:8080/bim/api/requests/employee?pageNumber=' + currentPage +
                '&pageSize=' + pageSize + '&sortedBy=' + sortedBy + '&sortedType=' + sortedType,
            type: 'GET',
            dataType: 'JSON',
            contentType: 'application/json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + localStorage.getItem('token'));
            },
            success: function (response, status, jqXHR) {
                if(response.paging.totalRecords > 0) {
                    console.log(response.value.list);
                    $(response.value.list).each(function (index, value) {
                        let record =
                            "<tr class='row-select'>" +
                            "<td class='assignment-id'>" + value.assignmentId +
                            "<td class='id'>" + value.item.id +
                            "</td><td class='name'>" + value.item.name +
                            "</td><td class='price'>" + value.item.price +
                            "</td><td class='location'>" + value.item.location +
                            "</td><td class='qty'>" + value.item.qty +
                            "</td><td class='status'>" + value.status +
                            "</td></tr>";

                        $('#data-table').append(record);
                    });

                    totalPage = response.paging.totalPage;
                    if(totalPage===0)
                        totalPage = 1;
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
                    let record = "<tr><td colspan='100' class='text-center p-4'><h3>No Data Available</h3></td></tr>"
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
    displayTablePage(1);

    //send JSON containing page number to backend, and retrieve request list according to page number
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

    // $(document).on('click', '#table-search-button', function () {
    //     name = $('#table-search-name').val();
    //     $('#data-table>tbody').empty();
    //     currentPage = 1;
    //     displayTablePage(currentPage);
    // });

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
});