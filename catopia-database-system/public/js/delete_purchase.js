// code for deleteCat function using jQuery
function deletePurchase(purchaseID) {
    let link = '/delete-purchase-ajax/';
    let data = {
      id: purchaseID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8", 
      success: function(result) {
        deleteRow(purchaseID);
      }
    });
  }
  

  function deleteRow(purchaseID){
      let table = document.getElementById("purchase-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         //iterate through rows
         //rows would be accessed using the "row" variable assigned in the for loop
         if (table.rows[i].getAttribute("data-value") == purchaseID) {
              table.deleteRow(i);
              window.location.reload();
              break;
         }
      }
  }