$(document).ready(function () {
    let sort = {
        'id':"Assignment ID",
        'employeeId' : "Employee ID",
        'employeeName' : "Employee Name",
        'itemId' : "Item ID",
        'itemName': "Item Name",
        'qty' : 'Qty',
        'status' : 'Status'
    };

    (function(){
        $('.title-and-sort-div').load('../assets/components/html/table-title-and-sort.html #table-title-and-sort',
            function () {

                $('#table-title').text('Assignment List');

                for(let s in sort){
                    $('#sorted-by').append($('<option>', {value: s, text: sort[s]}))
                }

                //hide search box
                $('#search-box').css("display", "none");

            });
    })();
});

