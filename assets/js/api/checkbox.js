$(document).ready(function () {

        //check all checkbox
        $('.select-all').click(function () {
            if($('.select-all:checked').length>0){
                $('.row-select input').each(function () {
                    $(this).prop('checked', true);
                });
            } else{
                $('.row-select input').each(function () {
                    $(this).prop('checked', false);
                });
            }
        });

        //when clicking check all button, all button is checked,
        //when uncheck one button, the check-all button will uncheck automatically
        $('#data-table').on('click', '.select', function () {
            $(this).prop('checked', true);


            if($('.select-all:checked').length>0){
                $('.select-all').prop('checked', false);
            }
        });

    }
);

