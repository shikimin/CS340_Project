function deleteRoom(roomID) {
    let link = '/delete-room-ajax/';
    let data = {
      id: roomID
    };
  
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-room-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            // Delete the data from the table
            deleteRow(roomID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
  }
  
  function deleteRow(roomID){
      let table = document.getElementById("room-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == roomID) {
              table.deleteRow(i);
              break;
         }
      }
  }