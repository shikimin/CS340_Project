// <!-- 
//     Citation for the following page:
//     Date: 11/6/23
//     Based on code from Node set up guide from:
//     Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
//  -->


// Get the objects we need to modify
let updateRoomForm = document.getElementById('update-room-form');

// Modify the objects we need
updateRoomForm.addEventListener("submit", (e) => {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputID = document.getElementById("room_id_update");
    let inputRoomName = document.getElementById("room_name_update");
    let inputRate = document.getElementById("rate_update");

    // Get the values from the form fields
    let IDvalue = inputID.innerHTML;
    let roomNameValue = inputRoomName.value;
    let rateValue = inputRate.value;


    // Put our data we want to send in a javascript object
    let data = {
        roomID: IDvalue,
        roomName: roomNameValue,
        rate: rateValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-room-ajax", true);
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


function updateRow(data, roomID){
    let parsedData = JSON.parse(data);
    console.log(parsedData);
    let table = document.getElementById("room-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == roomID) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let td = updateRowIndex.getElementsByTagName("td")[1];
            td.innerHTML = parsedData[0].room_name; 

            let td1 = updateRowIndex.getElementsByTagName("td")[2];
            td1.innerHTML = parsedData[0].rate;
            window.location.reload();
       }
    }
}
