$(document).ready(function () {

    let currentPage = 1;
    let pageSize = 6;
    let totalPage = 1;
    let sortedBy = "id";
    let sortedType = "asc";

    function displayTablePage(currentPage) {
        $('#current-page').text(currentPage);

        $.ajax({
            url: 'http://localhost:8080/bim/api/requests?' + 'pageNumber=' + currentPage + '&pageSize=' + pageSize +
                '&sortedBy=' + sortedBy + '&sortedType=' + sortedType,
            type: 'GET',
            dataType: 'JSON',
            contentType: 'application/json',
            async: false,
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
                        "</td><td class='notes'>" + value.request.notes +
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
    $(document).on('click', '#table-next-page-button',function () {
        $("#data-table>tbody").empty();

        if(currentPage !== totalPage){
            currentPage++;
        }
        displayTablePage(currentPage);
    });

    $(document).on('click', '#table-next-page-button',function () {
        $("#data-table>tbody").empty();
        if(currentPage!==1){
            currentPage--;
        }
        displayTablePage(currentPage);
    });

    $('#sorted-by').on('change', function () {
        $('#data-table>tbody').empty();
        sortedBy = $('#sorted-by').val();
        currentPage = 1;
        displayTablePage(currentPage);
    });

    $('#sorted-type').on('change', function () {
        $('#data-table>tbody').empty();
        sortedType = $('#sorted-type').val();
        currentPage = 1;
        displayTablePage(currentPage);
    });

    $('#page-size').on('change', function () {
        $('#data-table>tbody').empty();
        pageSize = $('#page-size').val();
        currentPage = 1;
        displayTablePage(currentPage);
    });
});