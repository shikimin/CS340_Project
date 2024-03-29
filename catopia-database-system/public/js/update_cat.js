// <!-- 
//     Citation for the following page:
//     Date: 11/6/23
//     Based on code from Node set up guide from:
//     Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
//  -->


// Get the objects we need to modify
let updateCatForm = document.getElementById('update-cat-form');

// Modify the objects we need
updateCatForm.addEventListener("submit", (e) => {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputID = document.getElementById("cat_id_update");
    let inputCustomerID = document.getElementById("customer_id_update");
    let inputNewCatName = document.getElementById("cat_name_update");

    // Get the values from the form fields
    let idValue = inputID.innerHTML;
    let customerIDValue = inputCustomerID.value;
    let newCatNameValue = inputNewCatName.value;
    
    // Put our data we want to send in a javascript object
    let data = {
        catID: idValue,
        customerID: customerIDValue,
        newCatName: newCatNameValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-cat-ajax", true);
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


function updateRow(data, catID){
    let parsedData = JSON.parse(data);

    let table = document.getElementById("cat-table");

    for (let i = 0, row; row = table.rows[i]; i++) {

       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == catID) {
            // Get the location of the row where we found the matching Cat ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            
            let td = updateRowIndex.getElementsByTagName("td")[2];
            td.innerHTML = parsedData[0].cat_name; 
            window.location.reload();
            break;
       }
    }
}