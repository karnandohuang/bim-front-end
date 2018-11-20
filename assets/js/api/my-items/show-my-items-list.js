$(document).ready(function () {
    let employeeId = "EM001";
    let currentPage = 1;
    let pageNumber = 1;
    let pageSize = 6;

    function displayTablePage(currentPage) {
        $('#current-page').text(currentPage);


        $.ajax({
        url: 'http://localhost:8080/bim/api/requests/employee?employeeId=' + employeeId + '&pageNumber=' + pageNumber +
        '&pageSize=' + pageSize,
        type: 'GET',
        dataType: 'JSON',
        contentType: 'application/json',
        success: function (data) {
            $(data.value).each(function (index, value) {

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
                }
            );
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