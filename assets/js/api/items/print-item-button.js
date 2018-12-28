$(document).ready(function () {
    function getPdf(itemId) {
        window.open('http://localhost:8080/bim/api/items/pdf/' + itemId, '_blank');
    }

    $(document).on('click', '.print-button', function () {
        let itemIdToBeEdited = $(this).closest('tr').find('.id').html();
        getPdf(itemIdToBeEdited);
    });
});