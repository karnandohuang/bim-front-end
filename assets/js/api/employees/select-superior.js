$(document).ready(function () {

    function setSuperiorModalAttributes() {
        $('#choose-superior-modal-label').text('Choose Superior');
        $("#choose-superior-table>tbody").empty();
        $('#choose-superior-modal').modal('show');
    }

    $('#choose-superior-id-button').click(function () {
        setSuperiorModalAttributes();

        $.ajax({
            url : 'http://localhost:8080/bim/api/employees',
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

        $('#superior-tbody').on('click', '.row-select', function () {
            let SelectedSuperiorId = $(this).closest('tr').find('.id').html();
            $('#input-superior-id').val(SelectedSuperiorId);
            $('#choose-superior-modal').modal('hide');
        })

    });

});