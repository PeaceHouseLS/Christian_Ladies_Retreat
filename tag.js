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
                timestamp: row.c[0] ? new Date(row.c[0].v) : null,
                title: row.c[1] ? row.c[1].v : '',
                fullName: row.c[2] ? row.c[2].v : '',
                phoneNumber: row.c[3] ? row.c[3].v : '',
                email: row.c[4] ? row.c[4].v : '',
                church: row.c[5] ? row.c[5].v : '',
                disciplerName: row.c[6] ? row.c[6].v : '',
                phCode: row.c[7] ? row.c[7].v : '',
                dob: row.c[8] ? row.c[8].v : '',
                lga: row.c[9] ? row.c[9].v : '',
                town: row.c[10] ? row.c[10].v : '',
                occ: row.c[11] ? row.c[11].v : '',
                chc: row.c[12] ? row.c[12].v : '',
                have: row.c[13] ? row.c[13].v : '',
            }));

            // Find the matching record
            const record = tableData.find(item => (item.phoneNumber + item.dob) === uniqueId);

            if (record) {
                // Display the tag information for the first tag box
                document.getElementById('titlePosition1').innerText = `${record.title}`;
                document.getElementById('fullName1').innerText = `${record.fullName}`;
                document.getElementById('lga1').innerText = `${record.lga}`;
                document.getElementById('tagOutput1').style.display = 'block';

                // Hide the remaining tag boxes
                for (let i = 2; i <= 4; i++) {
                    document.getElementById(`tagOutput${i}`).style.display = 'none';
                }
            } else {
                document.querySelector('.container').innerHTML = '<p>Record not found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.querySelector('.container').innerHTML = '<p>Error fetching data.</p>';
        });
};

// Function to navigate back to the accreditation page
function goBack() {
    window.location.href = 'accredit.html';
}
