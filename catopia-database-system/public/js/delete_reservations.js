// <!-- 
//     Citation for the following page:
//     Date: 11/6/23
//     Based on code from Node set up guide from:
//     Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
//  -->



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
              window.location.reload();
              break;
         }
      }
  }