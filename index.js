document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        form.classList.add('was-validated');
    }, false);
});
