function moveText(data, destinations) {
    
    // show form
    let form = document.getElementById(destinations[0]).parentNode.parentNode.parentNode;
    if (form.style.display === "none") {
        form.style.display = "block";
    }

    // Populate form
    for (let i = 0; i < data.length; i++) {
        // display correct option in dropdown menu
        if (document.getElementById(destinations[i]).tagName == "SELECT") {
            dropdownOptions = document.getElementById(destinations[i]).options;
            for (let j = 0; j < dropdownOptions.length; j++) {
                if (dropdownOptions[j].innerHTML == data[i]) {
                    dropdownOptions[j].selected = true;
                  break;
                }
            }
        }
        // display ID
        else if (document.getElementById(destinations[i]).tagName == "P") {
            document.getElementById(destinations[i]).innerHTML = data[i];
        }

        // display all other fields
        else {
            document.getElementById(destinations[i]).value = data[i];
        }
    };
    
    // for updating cat dropdown on update Reservation form
    if (destinations[0] == 'res_id_update') {
        customer_id = document.getElementById(destinations[1]).value;
        console.log(customer_id);
        loadCats(customer_id, 'cat-dropdown-update');
    }

    // Snap to form
    document.getElementById(destinations[0]).scrollIntoView();
};

/**
 * load cats with same customer ID when user choose a customer
 * @param {*} customerID 
 */
function loadCats(customerID, tableID) {
    const link = '/get-cats/' + customerID;
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', link, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // load cats to the drop down menu
            updateCatDropdown(xhttp.response, tableID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log('There was an error with the input.');
        }
        
    };
    xhttp.send();
};

function updateCatDropdown(data, tableID) {
    let parsedData = JSON.parse(data);
    let catDropdown = document.getElementById(tableID);
    let catDropdownHTML = '';

    for (let i = 0; i < parsedData.cats.length; i++) {
        catDropdownHTML += '<option value="' + parsedData.cats[i].cat_id + '">' + parsedData.cats[i].cat_id + '. ' + parsedData.cats[i].cat_name + '</option>';
    }
    catDropdown.innerHTML = catDropdownHTML;
};
