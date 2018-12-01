$(document).ready(function () {
    let sort = {
        'id':"ID",
        'name' : "Name",
        'email' : "Email",
        'position' : "Position",
        'division' : 'Division',
        'superiorId' : 'Superior ID'
    };

    (function(){
        $('.title-and-sort-div').load('../assets/components/html/table-title-and-sort.html #table-title-and-sort',
            function () {

                $('#table-title').text('Employees');

                for(let s in sort){
                    $('#sorted-by').append($('<option>', {value: s, text: sort[s]}))
                }
            });
    })();
});

