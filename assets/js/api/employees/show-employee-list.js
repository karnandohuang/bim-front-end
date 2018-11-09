$(document).ready(function () {

    let currentPage = 1;
    let pageSize = 6;
    let totalPage = 1;
    let name = "";
    let sortedBy = "id";
    let sortedType = "asc";

    function displayTablePage(currentPage){
        $('#current-page').text(currentPage);

        $.ajax({
            url : 'http://localhost:8080/bim/api/employees?name=' + name + '&pageNumber=' + currentPage +
                '&pageSize=' + pageSize + '&sortedBy=' + sortedBy + '&sortedType=' + sortedType,
            type : 'GET',
            dataType : 'JSON',
            contentType:'application/json',
            success : function (data) {
                $(data.value.list).each(function (index, value) {
                    var record = "<tr class='row-select'><td class='select'>" +
                        '<input class="form-check-input position-static m-0 ml-1 " type="checkbox" value="">' +
                        "</td><td class='id'>"+ value.id +
                        "</td><td class='name'>" + value.name +
                        "</td><td class='email'>" + value.email +
                        "</td><td class='position'>" + value.position +
                        "</td><td class='division'>" + value.division +
                        "</td><td class='superiorId'>" + value.superiorId + "</td></tr>";

                    $("#data-table").append(record);
                });

                totalPage = data.paging.totalPage;
                if(totalPage===0)
                    totalPage=1;
                $('#total-page').text(totalPage);

            },
            error : function (data) {

            }
        });
    }

    displayTablePage(1);

    //send JSON containing page number to backend, and retrieve employee list according to page number
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

    $('#table-search-button').on('click', function () {
       name = $('#table-search-name').val();
       $('#data-table>tbody').empty();
       currentPage = 1;
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
