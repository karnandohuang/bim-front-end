$({property: 0}).animate({property: 100}, {
        duration: 2500,
        step: function() {
          var _percent = Math.round(this.property);
          $("#progress").css("width",  _percent+"%");
        },
        complete: function() {
          alert("complete");
          $("#progress").addClass("done");
          $(document).on("click",".nav-link", function () {
				var clickedBtnID = $(this).attr('id'); // or var clickedBtnID = this.id
   				window.location.replace(clickedBtnID+".html");
			});
        }
      });

$('#entryEditItem').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var dataName = button.data('name') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text(dataName)
    modal.find('.modal-body input').val(recipient)


    if (dataName.toUpperCase() == "ENTRY ITEM") {
        $("inputItemSku").attr("readonly", "readonly");
    }
})

