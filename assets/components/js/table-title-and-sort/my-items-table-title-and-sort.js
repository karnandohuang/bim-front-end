$(document).ready(function () {
    let sort = {
        'id': "Assignment ID",
        'itemId' : "Item ID",
        'itemName': "Item Name",
        'itemPrice' : 'Price',
        'itemLocation' : 'Location',
        'qty' : 'Qty',
        'status' : 'Status'
    };

    (function(){
        $('.title-and-sort-div').load('../assets/components/html/table-title-and-sort.html #table-title-and-sort',
            function () {

                $('#table-title').text('My Items');

                for(let s in sort){
                    $('#sorted-by').append($('<option>', {value: s, text: sort[s]}))
                }
            });
    })();
});

