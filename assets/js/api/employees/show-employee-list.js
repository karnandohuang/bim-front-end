function setTotalPage(totalPage, response) {
    totalPage = response.paging.totalPage;
    if (totalPage === 0)
        totalPage = 1;
    $('#total-page').text(totalPage);
    return totalPage;
}

function setPagingButton(currentPage, totalPage) {
    if ((currentPage === 1) && (currentPage === totalPage)) {
        $('#table-prev-page-button').prop('disabled', true);
        $('#table-next-page-button').prop('disabled', true);
    } else if (currentPage === 1) {
        $('#table-prev-page-button').prop('disabled', true);
    } else if (currentPage === totalPage) {
        $('#table-next-page-button').prop('disabled', true);
    }
}

function displayErrorRetrievingData() {
    let record =
        "<tr><td colspan='100' class='text-center p-4'>" +
        "<h3>Error Retrieving Data</h3>" +
        "<button class='btn btn-primary' onclick='window.location.reload()'>Reload</button>" +
        "</td></tr>";

    $('#data-table').append(record);
}

function displayNoDataAvailable() {
    let record = "<tr><td colspan='100' class='text-center p-4'><h3>No Data Available</h3></td></tr>";
    $('#data-table').append(record);
}

function populateEmployeeTable(response) {
    $(response.value.list).each(function (index, value) {
        var record = "<tr class='row-select'><td class='select'>" +
            '<input class="form-check-input position-static m-0 ml-1 " type="checkbox" value="">' +
            "</td><td class='id'>" + value.id +
            "</td><td class='name'>" + value.name +
            "</td><td class='email'>" + value.email +
            "</td><td class='position'>" + value.position +
            "</td><td class='division'>" + value.division +
            "</td><td class='superiorId'>" + value.superiorId +
            "</td><td class='p-1 text-center'>";

        if (localStorage.getItem('role') === 'ADMIN')
            record +=
                "<button type=\"button\" class=\"btn btn-success px-2 mx-1 edit-button\">" +
                "<i class=\"fas fa-edit\"></i></button>";

        record +=
            "</td></tr>";

        $("#data-table").append(record);
    });
}

$(document).ready(function () {

    let currentPage = 1;
    let pageSize = 6;
    let totalPage = 1;
    let name = "";
    let sortedBy = "id";
    let sortedType = "asc";
    var PATH = "";

    function displayTablePage(currentPage){
        $('#current-page').text(currentPage);
        $('#table-prev-page-button').prop('disabled', false);
        $('#table-next-page-button').prop('disabled', false);

        if(localStorage.getItem('role')!=="ADMIN")
            PATH = 'superiors';
        else if(localStorage.getItem('role')!=="SUPERIOR")
            PATH = 'employees';

        let API_PATH_GET_EMPLOYEE = 'http://localhost:8080/bim/api/' + PATH + '?name=' + name + '&pageNumber=' + currentPage +
            '&pageSize=' + pageSize + '&sortedBy=' + sortedBy + '&sortedType=' + sortedType;

        $.ajax({
            url : API_PATH_GET_EMPLOYEE,
            type : 'GET',
            dataType : 'JSON',
            contentType:'application/json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + localStorage.getItem('token'));
            },
            success : function (response, status, jqXHR) {
                if(response.paging.totalRecords > 0) {
                    populateEmployeeTable(response);
                    totalPage = setTotalPage(totalPage, response);
                    setPagingButton(currentPage, totalPage);

                } else{
                    displayNoDataAvailable();
                }
            },
            error : function (response, status, jqXHR) {
                displayErrorRetrievingData();
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

    $(document).on('click', '#table-search-button', function () {
        name = $('#table-search-name').val();
        $('#data-table>tbody').empty();
        currentPage = 1;
        displayTablePage(currentPage);
    });

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
