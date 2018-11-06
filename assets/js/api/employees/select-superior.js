$(document).ready(function () {

    let superiorPageNumber = 1;
    let pageSize = 10;

    function setSuperiorModalAttributes() {
        $('#choose-superior-modal-label').text('Choose Superior');
        $("#choose-superior-table>tbody").empty();
        $('#choose-superior-modal').modal('show');
    }

    function displaySuperiorTablePage(superiorPageNumber){
        $('#current-superior-page').text(superiorPageNumber);
        $.ajax({
            url : 'http://localhost:8080/bim/api/superiors?pageNumber=' + superiorPageNumber + '&pageSize=' + pageSize,

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

            },
            error : function (data) {

            }
        });
    }

    $('#choose-superior-id-button').click(function () {
        setSuperiorModalAttributes();

        displaySuperiorTablePage(superiorPageNumber);

        $('#superior-tbody').on('click', '.row-select', function () {
            let SelectedSuperiorId = $(this).closest('tr').find('.id').html();
            $('#input-superior-id').val(SelectedSuperiorId);
            $('#choose-superior-modal').modal('hide');
        })
    });

    $('#table-superior-next-page-button').on('click',function () {
        $("#choose-superior-table>tbody").empty();
        superiorPageNumber++;
        console.log(superiorPageNumber);
        displaySuperiorTablePage(superiorPageNumber);
    });

    $('#table-superior-prev-page-button').on('click',function () {
        $("#choose-superior-table>tbody").empty();
        if(superiorPageNumber!==1){
            superiorPageNumber--;
            displaySuperiorTablePage(superiorPageNumber);

        }
        else if(superiorPageNumber==1){
            displaySuperiorTablePage(superiorPageNumber);
        }
    });

});