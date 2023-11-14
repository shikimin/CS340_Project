function moveText(catID, catName, destination1, destination2) {
    document.getElementById(destination1).value = catID;
    document.getElementById(destination2).value = catName;
    document.getElementById(destination1).scrollIntoView();
};