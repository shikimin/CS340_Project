// <!-- 
//     Citation for the following page:
//     Date: 11/6/23
//     Based on code from Node set up guide from:
//     Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
//  -->


// code for deleteCat function using jQuery
function deleteService(serviceID) {
    let link = '/delete-service-ajax/';
    let data = {
      id: serviceID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8", 
      success: function(result) {
        deleteRow(serviceID);
      }
    });
  }
  
  function deleteRow(serviceID){
      let table = document.getElementById("service-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         //iterate through rows
         //rows would be accessed using the "row" variable assigned in the for loop
         if (table.rows[i].getAttribute("data-value") == serviceID) {
              table.deleteRow(i);
              window.location.reload();
              break;
         }
      }
  }