$(document).ready(function () {
    let sort = {
        'id':"ID",
        'sku' : "SKU",
        'name' : "Name",
        'price' : "Price",
        'location' : "Location",
        'qty' : 'qty'
    };

    (function(){
        $('.title-and-sort-div').load('../assets/components/html/table-title-and-sort.html #table-title-and-sort',
            function () {

            $('#table-title').text('Items');

            for(let s in sort){
                $('#sorted-by').append($('<option>', {value: s, text: sort[s]}))
            }
            });
    })();
});

