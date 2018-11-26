$(document).ready(function () {

    let currentPage = 1;
    let pageSize = 6;
    let totalPage = 1;
    let name = "";
    let sortedBy = "id";
    let sortedType = "asc";

    function displayTablePage(currentPage) {
        $('#current-page').text(currentPage);
        $.ajax({
            url: 'http://localhost:8080/bim/api/items?name=' + name + '&pageNumber=' + currentPage +
                '&pageSize=' + pageSize + '&sortedBy=' + sortedBy + '&sortedType=' + sortedType,
            type: 'GET',
            dataType: 'JSON',
            contentType: 'application/json',
            success: function (data) {
                $(data.value.list).each(function (index, value) {

                    let record =
                        "<tr class='row-select'><td class='select'>" +
                        '<input class="form-check-input position-static ml-1" type="checkbox" value="">' +
                        "</td><td class='id'>" + value.id +
                        "</td><td class='sku'>" + value.sku +
                        "</td><td class='name'>" + value.name +
                        "</td><td class='price'>" + value.price +
                        "</td><td class='location'>" + value.location +
                        "</td><td class='qty'>" + value.qty +
                        "</td><td class='p-1 text-center'>" +
                        "<button type=\"button\" class=\"btn btn-success px-2 mx-1 edit-button\">" +
                        "<i class=\"fas fa-edit\"></i></button>" +
                        "<button type=\"button\" class=\"btn btn-info px-2 mx-1\" " +
                        "onclick='window.print()'><i class=\"fas fa-print\"></i></button>" +
                        "</td></tr>";

                    $('#data-table').append(record);
                    totalPage = data.paging.totalPage;
                    if(totalPage===0)
                        totalPage=1;
                    $('#total-page').text(totalPage);
                });
            },
            error: function (data) {

            }
        });
    }

    displayTablePage(1);

    //send JSON containing page number to backend, and retrieve employee list according to page number
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

    $('#table-search-button').on('click', function () {
        $('#data-table>tbody').empty();
        name = $('#table-search-name').val();
        currentPage = 1;
        displayTablePage(1);
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
