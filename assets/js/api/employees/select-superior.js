$(document).ready(function () {

    let currentPage = 1;
    let pageSize = 5;
    let totalPage = 1;

    function setSuperiorModalAttributes() {
        $('#choose-superior-modal-label').text('Choose Superior');
        $("#choose-superior-table>tbody").empty();
        $('#choose-superior-modal').modal('show');
    }

    function displaySuperiorTablePage(currentPage){
        $('#current-superior-page').text(currentPage);
        $.ajax({
            url : 'http://localhost:8080/bim/api/superiors?pageNumber=' + currentPage + '&pageSize=' + pageSize,

            type : 'GET',
            dataType : 'JSON',
            contentType:'application/json',
            success : function (data) {
                $(data.value.list).each(function (index, value) {
                    var record = "<tr class='row-select'>" +
                        "<td class='id'>"+ value.id +
                        "</td><td class='name'>" + value.name +
                        "</td><td class='email'>" + value.email +
                        "</td><td class='position'>" + value.position +
                        "</td><td class='division'>" + value.division + "</td></tr>";

                    $("#choose-superior-table").append(record);
                });

                totalPage = data.paging.totalPage;
                if(totalPage===0)
                    totalPage=1;
                $('#total-superior-page').text(totalPage);

            },
            error : function (data) {

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

});