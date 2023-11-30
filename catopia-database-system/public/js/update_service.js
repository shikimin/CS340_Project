// Get the objects we need to modify
let updateServiceForm = document.getElementById('update-service-form');

// Modify the objects we need
updateServiceForm.addEventListener("submit", (e) => {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputID = document.getElementById("service_id_update");
    let inputServiceName = document.getElementById("service_name_update");
    let inputPrice = document.getElementById("price_update");

    // Get the values from the form fields
    let idValue = inputID.innerHTML;
    let serviceNameValue = inputServiceName.value;
    let priceValue = inputPrice.value;
    
    // Put our data we want to send in a javascript object
    let data = {
        serviceID: idValue,
        serviceName: serviceNameValue,
        price: priceValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-service-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, idValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});


function updateRow(data, serviceID){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("service-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == serviceID) {
            // Get the location of the row where we found the matching Service ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            
            let td1 = updateRowIndex.getElementsByTagName("td")[1];
            td1.innerHTML = parsedData[0].service_name; 

            let td2 = updateRowIndex.getElementsByTagName("td")[2];
            td2.innerHTML = parsedData[0].service_price; 
            break;
       }
    }
}