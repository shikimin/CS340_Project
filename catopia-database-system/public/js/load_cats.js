/**
 * load cats with same customer ID when user choose a customer
 * @param {*} customerID 
 */
function loadCats(customerID) {
    const link = '/get-cats/' + customerID;
    console.log(link);
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', link, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // load cats to the drop down menu
            updateCatDropdown(xhttp.response);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log('There was an error with the input.');
        }
        
    };
    xhttp.send();
};

function updateCatDropdown(data) {
    let parsedData = JSON.parse(data);
    console.log(parsedData);
    let catDropdown = document.getElementById('cat-dropdown');
    let catDropdownHTML = '';

    for (let i = 0; i < parsedData.cats.length; i++) {
        catDropdownHTML += '<option value="' + parsedData.cats[i].cat_id + '">' + parsedData.cats[i].cat_id + '. ' + parsedData.cats[i].cat_name + '</option>';
    }
    catDropdown.innerHTML = catDropdownHTML;
};
