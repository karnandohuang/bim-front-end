$(document).ready(function () {

    let currentPage = 1;
    let pageSize = 6;
    let totalPage = 1;
    let name = "";
    let sortedBy = "id";
    let sortedType = "asc";

    function make_header_auth() {
        let cookie = getCookie("USERCOOKIE");
        console.log(cookie);

        return "Bearer " + cookie;
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function displayTablePage(currentPage) {
        $('#current-page').text(currentPage);
        $('#table-prev-page-button').prop('disabled', false);
        $('#table-next-page-button').prop('disabled', false);

        // $('#table-prev-page-button').removeClass('disabled');
        // $('#table-next-page-button').removeClass('disabled');
        $.ajax({
            url: 'http://localhost:8080/bim/api/items?name=' + name + '&pageNumber=' + currentPage +
                '&pageSize=' + pageSize + '&sortedBy=' + sortedBy + '&sortedType=' + sortedType,
            type: 'GET',
            dataType: 'JSON',
            contentType: 'application/json',
            crossDomain: true,
            crossOrigin: true,
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + localStorage.getItem('token'));
            },
            success: function (response, status, jqXHR) {
                if(response.paging.totalRecords > 0) {

                    $(response.value.list).each(function (index, value) {
                        let record =
                            "<tr class='row-select'><td class='select'>" +
                            '<input class="form-check-input position-static ml-1" type="checkbox" value="">' +
                            "</td><td class='id'>" + value.id +
                            "</td><td class='name'>" + value.name +
                            "</td><td class='price'>" + value.price +
                            "</td><td class='location'>" + value.location +
                            "</td><td class='qty'>" + value.qty +
                            "</td><td class='p-1 text-center'>";

                        if(localStorage.getItem('role') === 'ADMIN')
                            record +=
                                "<button type=\"button\" class=\"btn btn-success px-2 mx-1 edit-button\">" +
                                "<i class=\"fas fa-edit\"></i></button>";

                        record +=
                            "<button type=\"button\" class=\"btn btn-info px-2 mx-1 info-button\">" +
                            "<i class=\"fas fa-info-circle\"></i></button>" +
                            "<button type=\"button\" class=\"btn btn-secondary px-2 mx-1 print-button\">" +
                            "<i class=\"fas fa-print\"></i></button>" +
                            "</td></tr>";

                        $('#data-table').append(record);
                    });
                    totalPage = response.paging.totalPage;
                    if(totalPage===0)
                        totalPage=1;

                    $('#total-page').text(totalPage);

                    if((currentPage === 1) && (currentPage === totalPage)) {
                        $('#table-prev-page-button').prop('disabled', true);
                        $('#table-next-page-button').prop('disabled', true);
                    } else if(currentPage === 1){
                        $('#table-prev-page-button').prop('disabled', true);
                    } else if(currentPage === totalPage){
                        $('#table-next-page-button').prop('disabled', true);
                    }

                    // let pageNumbers;
                    // (function appendPageNumber() {
                    //     pageNumbers += '<li class="page-item"><a class="page-link" href="#">First</a></li>';
                    //     pageNumbers += '<li class="page-item" id="table-prev-page-button"><a class="page-link" href="#">Prev</a></li>;'
                    //     for(let i=1;i<=totalPage;i++){
                    //         pageNumbers += '<li class="page-item"><a class="page-link" href="#">' + i + '</a></li>';
                    //     }
                    //     pageNumbers += '<li class="page-item" id="table-next-page-button"><a class="page-link" href="#">Next</a></li>';
                    //     pageNumbers += '<li class="page-item"><a class="page-link" href="#">Last</a></li>\n';
                    // })();
                    //
                    //
                    // $('.pagination').append();

                } else{
                    let record = "<tr><td colspan='100' class='text-center p-4'><h3>No Data Available</h3></td></tr>";
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

    //send JSON containing page number to backend, and retrieve employee list according to page number
    $(document).on('click', '#table-next-page-button',function (e) {
        $("#data-table>tbody").empty();

        if(currentPage !== totalPage){
            currentPage++;
        }
        displayTablePage(currentPage);
    });

    $(document).on('click', '#table-prev-page-button',function (e) {
        $("#data-table>tbody").empty();

        if(currentPage!==1) {
            currentPage--;
        }
        displayTablePage(currentPage);
    });

    $(document).on('click', '#table-search-button', function () {
        $('#data-table>tbody').empty();
        name = $('#table-search-name').val();
        currentPage = 1;
        displayTablePage(1);
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
