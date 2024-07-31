document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault();

    fetch(this.action, {
        method: 'POST',
        body: new FormData(this),
        mode: 'cors',
        headers: {
            'Accept': 'application/json'
        }
    });

    // Redirect immediately after initiating the fetch request
    window.location.href = 'success.html';
});


