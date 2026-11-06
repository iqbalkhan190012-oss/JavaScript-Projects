function getReceipt() {
    var text1 = "<h3>You Ordered:</h3>";
    var runningTotal = 0;
    var sizeTotal = 0;
    var sizeArray = document.getElementsByClassName("size");

    for (var i = 0; i < sizeArray.length; i++) {
        if (sizeArray[i].checked) {
            var selectedSize = sizeArray[i].value;
            text1 = text1 + selectedSize + "<br>";
        }
    }

    if (selectedSize === "Personal Pizza") { sizeTotal = 6; }
    else if (selectedSize === "Small Pizza") { sizeTotal = 8; }
    else if (selectedSize === "Medium Pizza") { sizeTotal = 10; }
    else if (selectedSize === "Large Pizza") { sizeTotal = 14; }
    else if (selectedSize === "Extra Large Pizza") { sizeTotal = 16; }

    runningTotal = sizeTotal;
    getTopping(runningTotal, text1);
};

function getTopping(runningTotal, text1) {
    var toppingTotal = 0;
    var selectedTopping = [];

    // Get Meats
    var toppingArray = document.getElementsByClassName("toppings");
    for (var j = 0; j < toppingArray.length; j++) {
        if (toppingArray[j].checked) {
            selectedTopping.push(toppingArray[j].value);
            text1 = text1 + toppingArray[j].value + "<br>";
        }
    }

    // Get Vegetables (NEW!)
    var veggieArray = document.getElementsByClassName("vegetables");
    for (var k = 0; k < veggieArray.length; k++) {
        if (veggieArray[k].checked) {
            selectedTopping.push(veggieArray[k].value);
            text1 = text1 + veggieArray[k].value + "<br>";
        }
    }

    // Calculate Total (First one is free)
    var toppingCount = selectedTopping.length;
    if (toppingCount > 1) {
        toppingTotal = (toppingCount - 1);
    } else {
        toppingTotal = 0;
    }

    runningTotal = (runningTotal + toppingTotal);

    // Display the receipt
    document.getElementById("showText").innerHTML = text1;
    document.getElementById("totalPrice").innerHTML = "<h3>Total: <strong>$" + runningTotal + ".00" + "</strong></h3>";
};
