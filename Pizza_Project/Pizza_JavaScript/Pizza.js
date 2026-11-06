// This function calculates the base price based on the selected pizza size.
function getReceipt() {
    // This initializes our string so it can get passed from function to function.
    var text1 = "<h3>You Ordered:</h3>";
    var runningTotal = 0;
    var sizeTotal = 0;

    // Get all elements with the class "size" (the radio buttons).
    var sizeArray = document.getElementsByClassName("size");

    // Loop through the size options to find which one is checked.
    for (var i = 0; i < sizeArray.length; i++) {
        if (sizeArray[i].checked) {
            var selectedSize = sizeArray[i].value;
            text1 = text1 + selectedSize + "<br>";
        }
    }

    // Assign a price based on the selected size.
    if (selectedSize === "Personal Pizza") { sizeTotal = 6; }
    else if (selectedSize === "Small Pizza") { sizeTotal = 8; }
    else if (selectedSize === "Medium Pizza") { sizeTotal = 10; }
    else if (selectedSize === "Large Pizza") { sizeTotal = 14; }
    else if (selectedSize === "Extra Large Pizza") { sizeTotal = 16; }

    // Add the size price to our running total.
    runningTotal = sizeTotal;

    // Pass the current total and text to the next function to handle toppings.
    getTopping(runningTotal, text1);
};

// This function calculates the price for the vegetables and meats.
function getTopping(runningTotal, text1) {
    var toppingTotal = 0;
    var selectedTopping = [];

    // Get all the meats (class "toppings").
    var toppingArray = document.getElementsByClassName("toppings");
    // Loop through meats and add checked ones to our list.
    for (var j = 0; j < toppingArray.length; j++) {
        if (toppingArray[j].checked) {
            selectedTopping.push(toppingArray[j].value);
            text1 = text1 + toppingArray[j].value + "<br>";
        }
    }

    // Get all the vegetables (class "vegetables").
    var veggieArray = document.getElementsByClassName("vegetables");
    // Loop through veggies and add checked ones to our list.
    for (var k = 0; k < veggieArray.length; k++) {
        if (veggieArray[k].checked) {
            selectedTopping.push(veggieArray[k].value);
            text1 = text1 + veggieArray[k].value + "<br>";
        }
    }

    // Count how many total toppings were selected.
    var toppingCount = selectedTopping.length;

    // The first topping is free, so we subtract 1 from the count to get the price.
    if (toppingCount > 1) {
        toppingTotal = (toppingCount - 1);
    } else {
        toppingTotal = 0;
    }

    // Add the topping price to the running total.
    runningTotal = (runningTotal + toppingTotal);

    // Display the final receipt and total price on the screen.
    document.getElementById("showText").innerHTML = text1;
    document.getElementById("totalPrice").innerHTML = "<h3>Total: <strong>$" + runningTotal + ".00" + "</strong></h3>";
};
