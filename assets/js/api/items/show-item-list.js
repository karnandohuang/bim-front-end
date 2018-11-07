$(document).ready(function () {

    let currentPage = 1;
    let pageSize = 7;
    let totalPage = 1;

    function displayTablePage(currentPage, name) {
        $.ajax({
            url: 'http://localhost:8080/bim/api/items?name=' + name + '&pageNumber=' + currentPage + '&pageSize=' + pageSize,
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
                        "</td><td>" +
                        "<button type=\"button\" class=\"btn btn-info btn-block p-0 m-0\" " +
                        "onclick='window.print()'>Print</button>" +
                        "</td></tr>";

                    $('#data-table').append(record);
                });

                totalPage = data.paging.totalPage;
                if(totalPage===0)
                    totalPage=1;
                $('#total-page').text(totalPage);
            },
            error: function (data) {

            }
        });
    }

    displayTablePage(1,"");

    //send JSON containing page number to backend, and retrieve employee list according to page number
    $('#table-next-page-button').on('click',function () {
        $("#data-table>tbody").empty();

        if(currentPage !== totalPage){
            currentPage++;
        }
        displayTablePage(currentPage,"");
    });

    $('#table-prev-page-button').on('click',function () {
        $("#data-table>tbody").empty();
        if(currentPage!==1){
            currentPage--;
        }
        displayTablePage(currentPage,"");
    });

    $('#table-search-button').on('click', function () {
        $('#data-table>tbody').empty();
        let name = $('#table-search-name').val();
        displayTablePage(1, name);
    });
});
