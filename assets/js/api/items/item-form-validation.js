(function() {
    var nameRegex = "([a-zA-Z0-9 ]{1,30}$)";
    $('#input-item-name').prop('pattern', nameRegex);

    var locationRegex = "([a-zA-Z0-9\. ]{1,30}$)";
    $('#input-item-location').prop('pattern', locationRegex);

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