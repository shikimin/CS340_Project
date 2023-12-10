// <!-- 
//     Citation for the following page:
//     Date: 11/6/23
//     Based on code from Node set up guide from:
//     Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
//  -->


// Get the objects we need to modify
let updateResForm = document.getElementById('update-res-form');

// Modify the objects we need
updateResForm.addEventListener("submit", (e) => {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputID = document.getElementById("res_id_update");
    let inputCustomerID = document.getElementById("customer_id_update");
    let inputCatID = document.getElementById("cat-dropdown-update");
    let inputRoomID = document.getElementById("room_id_update");
    let inputCheckIn = document.getElementById("check_in_update");
    let inputCheckOut = document.getElementById("check_out_update");

    // Get the values from the form fields
    let IDvalue = inputID.innerHTML;
    let customerIDValue = inputCustomerID.value;
    let catIDValue = inputCatID.value;
    let roomIDValue = inputRoomID.value;
    let checkInValue = inputCheckIn.value;
    let checkOutValue = inputCheckOut.value;


    // Put our data we want to send in a javascript object
    let data = {
        resID: IDvalue,
        customerID: customerIDValue,
        catID: catIDValue,
        roomID: roomIDValue,
        checkIn: checkInValue,
        checkOut: checkOutValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-res-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateRow(xhttp.response, IDvalue);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, resID){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("res-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == resID) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let td = updateRowIndex.getElementsByTagName("td")[1];
            td.innerHTML = parsedData[0].customer_id;

            let td1 = updateRowIndex.getElementsByTagName("td")[2];
            td1.innerHTML = parsedData[0].cat_id;

            let td2 = updateRowIndex.getElementsByTagName("td")[3];
            td2.innerHTML = parsedData[0].room_id;

            let td3 = updateRowIndex.getElementsByTagName("td")[4];
            td3.innerHTML = parsedData[0].check_in;

            let td4 = updateRowIndex.getElementsByTagName("td")[5];
            td4.innerHTML = parsedData[0].check_out;

            window.location.reload();
            break;
       }
    }
}