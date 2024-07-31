window.onload = function() {
    // Get the uniqueId from the query parameter
    const params = new URLSearchParams(window.location.search);
    const uniqueId = params.get('uniqueId');

    // Google Sheets API URL
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
                timestamp: new Date(row.c[0].v),
                title: row.c[1].v,
                fullName: row.c[2].v,
                phoneNumber: row.c[3].v,
                email: row.c[4].v,
                church: row.c[5].v,
                disciplerName: row.c[6].v,
                phCode: row.c[7].v,
                dob: row.c[8].v,
                lga: row.c[9].v
            }));

            // Find the matching record
            const record = tableData.find(item => (item.phoneNumber + item.dob) === uniqueId);

            if (record) {
                // Display the tag information
                document.getElementById('titlePosition').innerText = `${record.title}`;
                document.getElementById('fullName').innerText = `${record.fullName}`;
                document.getElementById('lga').innerText = `${record.lga}`;
                document.getElementById('tagOutput').style.display = 'block';
            } else {
                document.getElementById('tagOutput').innerHTML = '<p>Record not found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('tagOutput').innerHTML = '<p>Error fetching data.</p>';
        });
};

// Function to navigate back to the accreditation page
function goBack() {
    window.location.href = 'accredit.html';
}
