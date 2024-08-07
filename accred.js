document.getElementById('aForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Detect the browser
    var userAgent = navigator.userAgent;
    var browser;
    
    const sheetId = '1SVQpcpIVfjeQHY8DJWq8A9omKUdddruSwZjryTbZi48';
    const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
    const query = encodeURIComponent('Select *');
    const url = `${base}&tq=${query}`;

    // Fetch data from Google Sheets
    fetch(url)
        .then(res => res.text())
        .then(data => {
            // Parse the data
            const jsonData = JSON.parse(data.substr(47).slice(0, -2)).table.rows;

            // Map the data to a usable format
            const tableData = jsonData.map(row => ({
                timestamp: row.c[0] ? new Date(row.c[0].v) : null,
                title: row.c[1] ? row.c[1].v : '',
                fullName: row.c[2] ? row.c[2].v : '',
                phoneNumber: row.c[3] ? row.c[3].v : '',
                email: row.c[4] ? row.c[4].v : '',
                church: row.c[5] ? row.c[5].v : '',
                disciplerName: row.c[6] ? row.c[6].v : '',
                phCode: row.c[7] ? row.c[7].v : '',
                dobb: row.c[8] ? row.c[8].v : '',
                lga: row.c[9] ? row.c[9].v : '',
                town: row.c[10] ? row.c[10].v : '',
                occ: row.c[11] ? row.c[11].v : '',
                chc: row.c[12] ? row.c[12].v : '',
                have: row.c[13] ? row.c[13].v : '',
            }));

            const phoneNumber = document.getElementById('phone').value.trim();
            const dob = document.getElementById('dob').value.trim();
            const ID = document.getElementById('id').value.trim();
            const uniqueId = phoneNumber + dob;

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

            // Check if the entered dob is in the fetched data
            const isDobInData = tableData.some(row => row.dobb === dob);

            if ((browser === "Chrome" || browser === "Firefox" || browser === "Edge" || browser === "Opera") && (ID === 'clr2024') && isDobInData) {
                // Initiate the fetch request
                fetch(this.action, {
                    method: 'POST',
                    body: new FormData(this),
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                alert("Detected browser: " + browser);
                // Redirect immediately after initiating the fetch request
                window.location.href = `tag.html?uniqueId=${encodeURIComponent(uniqueId)}`;
            } else {
                // Handle cases for unsupported browsers or apply specific logic
                alert("Not Eligible For Accreditation");
            }
        });
});
