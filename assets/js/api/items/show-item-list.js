$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:8080/bim/api/items',
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
                }
            );
        },
        error: function (data) {

        }
    });
});