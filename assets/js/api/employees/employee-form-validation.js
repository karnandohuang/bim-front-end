(function() {
    var dateRegex = "(^(((0[1-9]|1[0-9]|2[0-8])[\\/](0[1-9]|1[012]))|((29|30|31)[\\/](0[13578]|1[02]))|((29|30)[\\/](0[4,6,9]|11)))[\\/](19|[2-9][0-9])\\d\\d$)|(^29[\\/]02[\\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)";
    $('#datepicker').prop('pattern', dateRegex);

    var passwordRegex = "(^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$)";
    $('#input-password').prop('pattern', passwordRegex);

    var emailRegex = "(^[a-z0-9](\.?[a-z0-9]){2,}@gdn-commerce\.com$)";
    $('#input-email').prop('pattern', emailRegex);

    var nameRegex = "([a-zA-Z ]{1,30}$)";
    $('#input-employee-name').prop('pattern', nameRegex);

    var positionRegex = "([a-zA-Z0-9 ]{1,30}$)";
    $('#input-position').prop('pattern', positionRegex);



    'use strict';
    window.addEventListener('load', function() {
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();