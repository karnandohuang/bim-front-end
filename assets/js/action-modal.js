$('.actionModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);// Button that triggered the modal
    var dataName = button.data('name');// Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this);
    modal.find('.modal-title').text(dataName);

    if (dataName.toUpperCase() == "EDIT ITEM") {
        // NOT WORKING
        $("#inputItemSku").prop("readonly", true);
    }
    else{
        $("#inputItemSku").prop("readonly", false);

    }

    if(dataName.toUpperCase() == "REQUEST ITEM"){
        $("#entryEditForm").css("display", "none");
        $("#requestTable").css("display", "inline");
    }
    else{
        $("#entryEditForm").css("display", "inline");
        $("#requestTable").css("display", "none");
    }

    if(dataName.toUpperCase() == "REJECT REQUEST"){
        $("#rejectReasonBox").css("display", "inline");
    }
    else{
        console.log("test");
        $("#rejectReasonBox").css("display", "none");

    }
});

