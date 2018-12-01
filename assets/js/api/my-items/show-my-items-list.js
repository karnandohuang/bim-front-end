$(document).ready(function () {
    let employeeId = "EM066";
    let currentPage = 1;
    let totalPage = 1;
    let pageSize = 6;

    function displayTablePage(currentPage) {
        $('#current-page').text(currentPage);


        $.ajax({
            url: 'http://localhost:8080/bim/api/requests/employee?employeeId=' + employeeId + '&pageNumber=' + currentPage +
                '&pageSize=' + pageSize ,
            type: 'GET',
            dataType: 'JSON',
            contentType: 'application/json',
            success: function (response, status, jqXHR) {
                if(response.paging.totalRecords > 0) {
                    $(response.value).each(function (index, value) {

                        let record =
                            "<tr class='row-select'>" +
                            "<td class='sku'>" + value.requestId +
                            "<td class='sku'>" + value.item.id +
                            "<td class='sku'>" + value.item.sku +
                            "</td><td class='name'>" + value.item.name +
                            "</td><td class='price'>" + value.item.price +
                            "</td><td class='location'>" + value.item.location +
                            "</td><td class='qty'>" + value.item.qty +
                            "</td><td class='status'>" + value.status +
                            "</td><td>" +
                            "<button type=\"button\" class=\"btn btn-info btn-block p-0 m-0\" " +
                            "onclick='window.print()'>Print</button>" +
                            "</td></tr>";

                        $('#data-table').append(record);
                        totalPage = response.paging.totalPage;
                        if(totalPage===0)
                            totalPage = 1;
                        $('#total-page').text(totalPage);
                    });

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
});