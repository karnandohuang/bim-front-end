function populateSuperiorTable(response) {
    $(response.value.list).each(function (index, value) {
        var record = "<tr class='row-select'>" +
            "<td class='id'>" + value.id +
            "</td><td class='name'>" + value.name +
            "</td><td class='email'>" + value.email +
            "</td><td class='position'>" + value.position +
            "</td><td class='division'>" + value.division + "</td></tr>";

        $("#choose-superior-table").append(record);
    });
}

function setPageTotal(totalPage, response) {
    totalPage = response.paging.totalPage;
    if (totalPage === 0)
        totalPage = 1;
    $('#total-superior-page').text(totalPage);
    return totalPage;
}

function setSuperiorModalAttributes() {
    $('#choose-superior-modal-label').text('Choose Superior');
    $("#choose-superior-table>tbody").empty();
    $('#choose-superior-modal').modal('show');
}

function displayErrorRetrievingData() {
    let record =
        "<tr><td colspan='100' class='text-center p-4'>" +
        "<h3>Error Retrieving Data</h3>" +
        "<button class='btn btn-primary' onclick='window.location.reload()'>Reload</button>" +
        "</td></tr>";
    $('#choose-superior-table').append(record);
}

function displayNoDataAvailable() {
    let record = "<tr><td colspan='100' class='text-center p-4'><h3>No Data Available</h3></td></tr>"
    $('#choose-superior-table').append(record);
}

$(document).ready(function () {

    let currentPage = 1;
    let pageSize = 5;
    let totalPage = 1;
    let name = "";

    function displaySuperiorTablePage(currentPage){
        $('#current-superior-page').text(currentPage);
        let API_PATH_GET_SUPERIOR_LIST = 'http://localhost:8080/bim/api/employees?pageNumber=' + currentPage + '&pageSize=' + pageSize +
            '&name=' + name;

        $.ajax({
            url : API_PATH_GET_SUPERIOR_LIST,
            type : 'GET',
            dataType : 'JSON',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + localStorage.getItem('token'));
            },
            contentType:'application/json',
            success : function (response, status, jqXHR) {
                if(response.paging.totalRecords > 0) {

                    populateSuperiorTable(response);
                    totalPage = setPageTotal(totalPage, response);

                } else {
                    displayNoDataAvailable();
                }
            },
            error: function (response, status, jqXHR) {
                displayErrorRetrievingData();
            }
        });
    }

    $('#choose-superior-id-button').click(function () {
        setSuperiorModalAttributes();

        displaySuperiorTablePage(currentPage);

        $('#superior-tbody').on('click', '.row-select', function () {
            let SelectedSuperiorId = $(this).closest('tr').find('.id').html();
            $('#input-superior-id').val(SelectedSuperiorId);
            $('#choose-superior-modal').modal('hide');
        })
    });

    $('#choose-no-superior').on('click', function () {
        let selectedSuperiorId = "";
        $('#input-superior-id').val(selectedSuperiorId);
        $('#choose-superior-modal').modal('hide');

    });

    $('#table-superior-next-page-button').on('click',function () {
        $("#choose-superior-table>tbody").empty();
        if(currentPage !== totalPage){
            currentPage++;
        }
        displaySuperiorTablePage(currentPage);
    });

    $('#table-superior-prev-page-button').on('click',function () {
        $("#choose-superior-table>tbody").empty();
        if(currentPage!==1){
            currentPage--;
        }
        displaySuperiorTablePage(currentPage);
    });

    $(document).on('click', '#table-search-superior-button', function () {
        name = $('#table-search-superior').val();
        $("#choose-superior-table>tbody").empty();
        currentPage = 1;
        displaySuperiorTablePage(currentPage);
    });
});