// code for deleteCat function using jQuery
function deleteRes(resID) {
    console.log("Deleting reservation with id: " + resID);
    let link = '/delete-res-ajax/';
    let data = {
      id: resID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8", 
      success: function(result) {
        deleteRow(resID);
      }
    });
  }
  
  function deleteRow(resID){
      let table = document.getElementById("res-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         //iterate through rows
         //rows would be accessed using the "row" variable assigned in the for loop
         if (table.rows[i].getAttribute("data-value") == resID) {
              table.deleteRow(i);
              break;
         }
      }
  }