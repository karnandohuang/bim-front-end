$(document).ready(function () {
    $.ajax({
        url : 'http://localhost:8080/bim/api/employees',
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
                        "</td><td class='division'>" + value.division +
                        "</td><td class='superiorId'>" + value.superiorId + "</td></tr>";

                    $("#data-table").append(record);
                }
            );
        },
        error : function (data) {

        }
    });
});
