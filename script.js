document.getElementById("carForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const carData = {};
    formData.forEach((value, key) => {
        carData[key] = value;
    });

    // Read existing Excel file
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Append new data to the first sheet
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const newRowIndex = worksheet['!ref'].match(/\d+$/)[0];
        const newRow = [carData.model, carData.year, carData.carNumber];
        const newRowRef = 'A' + (parseInt(newRowIndex) + 1);
        worksheet[newRowRef] = { t: 'n', v: newRowIndex, f: newRow.join('\t') };
        
        // Convert the updated workbook to a Blob
        const updatedWorkbook = XLSX.write(workbook, { bookType: 'xlsx', type: 'blob' });

        // Download the updated Excel file
        saveAs(updatedWorkbook, '/data/car_data.xlsx');
    };
    fileReader.readAsArrayBuffer(document.getElementById("uploadedFile").files[0]);
    
    alert("Car details have been saved.");
    document.getElementById("carForm").reset();
});
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("register").addEventListener("click", function() {
        document.getElementById("loginForm").style.display = "block";
    });

    document.getElementById("registerForm").addEventListener("submit", function(event) {
        event.preventDefault();
        // Your form submission logic here
        alert("Registered successfully!");
        document.getElementById("registerForm").reset();
    });
});

