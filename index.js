document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Detect the browser
    var userAgent = navigator.userAgent;
    var browser;
    
    if (userAgent.indexOf("Chrome") > -1) {
        browser = "Chrome";
    } else if (userAgent.indexOf("Firefox") > -1) {
        browser = "Firefox";
    } else if (userAgent.indexOf("Safari") > -1) {
        browser = "Safari";
    } else if (userAgent.indexOf("Edge") > -1) {
        browser = "Edge";
    } else if (userAgent.indexOf("Opera") > -1) {
        browser = "Opera";
    } else {
        browser = "Unknown";
    }

    console.log("Detected browser: " + browser);

    if (browser === "Chrome" || browser === "Firefox" || browser === "Edge" || browser === "Opera") {
        // Initiate the fetch request
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
    } else {
        // Handle cases for unsupported browsers or apply specific logic
        alert("This browser is not supported for form submission.");
    }
});
