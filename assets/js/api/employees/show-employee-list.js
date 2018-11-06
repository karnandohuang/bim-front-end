$(document).ready(function () {

    let currentPage = 1;
    let pageSize = 7;
    let totalPage = 1;

    function displayTablePage(currentPage){
        $('#current-page').text(currentPage);

        $.ajax({
            url : 'http://localhost:8080/bim/api/employees?pageNumber=' + currentPage + '&pageSize=' + pageSize,
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
});
