// <!-- 
//     Citation for the following page:
//     Date: 11/6/23
//     Based on code from Node set up guide from:
//     Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
//  -->


// Get the objects we need to modify
let updateCustomerForm = document.getElementById('update-customer-form');

// Modify the objects we need
updateCustomerForm.addEventListener("submit", (e) => {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputID = document.getElementById("customer_id_update");
    let inputFirstName = document.getElementById("first_name_update");
    let inputLastName = document.getElementById("last_name_update");
    let inputPhone = document.getElementById("phone_update");


    // Get the values from the form fields
    let idValue = inputID.innerHTML;
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let phoneValue = inputPhone.value;
    
    // Put our data we want to send in a javascript object
    let data = {
        customerID: idValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
        phone: phoneValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-customer-ajax", true);
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


function updateRow(data, customerID){
    let parsedData = JSON.parse(data);

    let table = document.getElementById("customer-table");

    for (let i = 0, row; row = table.rows[i]; i++) {

       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == customerID) {
            // Get the location of the row where we found the matching Customer ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let td1 = updateRowIndex.getElementsByTagName("td")[1];
            td1.innerHTML = parsedData[0].first_name; 

            let td2 = updateRowIndex.getElementsByTagName("td")[2];
            td2.innerHTML = parsedData[0].last_name; 

            let td3 = updateRowIndex.getElementsByTagName("td")[3];
            td3.innerHTML = parsedData[0].phone; 
            window.location.reload();
            break;
       }
    }
}