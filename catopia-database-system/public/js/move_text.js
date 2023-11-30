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
                if (dropdownOptions[j].text == data[i]) {
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
    }

    // Snap to form
    document.getElementById(destinations[0]).scrollIntoView();
};