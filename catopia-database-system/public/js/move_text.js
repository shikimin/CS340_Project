function moveText(data, destinations) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        console.log(document.getElementById(destinations[i]).value)
        document.getElementById(destinations[i]).value = data[i];
    }

    document.getElementById(destinations[0]).scrollIntoView();
};