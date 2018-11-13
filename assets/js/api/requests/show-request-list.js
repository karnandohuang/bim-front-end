$(document).ready(function () {

    let currentPage = 1;
    let pageSize = 7;
    let totalPage = 1;

    function displayTablePage(currentPage) {
        $('#current-page').text(currentPage);


        $.ajax({
            url: 'http://localhost:8080/bim/api/requests?pageNumber=1&pageSize=3',
            type: 'GET',
            dataType: 'JSON',
            contentType: 'application/json',
            success: function (data) {
                $(data.value.list).each(function (index, value) {

                    let record =
                        "<tr class='row-select'><td class='select'>" +
                        '<input class="form-check-input position-static ml-1" type="checkbox" value="">' +
                        "</td><td class='request-id'>" + value.request.id +
                        "</td><td class='employee-id'>" + value.request.employeeId +
                        "</td><td class='employee-name'>" + value.employeeName +
                        "</td><td class='item-sku'>" + value.itemSKU +
                        "</td><td class='item-name'>" + value.itemName +
                        "</td><td class='qty'>" + value.request.qty +
                        "</td><td class='status'>" + value.request.status +
                        "</td></tr>";

                    $('#data-table').append(record);
                });
                totalPage = data.paging.totalPage;
                $('#total-page').text(totalPage);
            },
            error: function (data) {

            }
        });
    }

    displayTablePage(1);

    //send JSON containing page number to backend, and retrieve request list according to page number
    $('#table-next-page-button').on('click',function () {
        $("#data-table>tbody").empty();

        if(currentPage !== totalPage){
            currentPage++;
        }
        displayTablePage(currentPage);
    });

    $('#table-prev-page-button').on('click',function () {
        $("#data-table>tbody").empty();
        if(currentPage!==1){
            currentPage--;
        }
        displayTablePage(currentPage);
    });
});