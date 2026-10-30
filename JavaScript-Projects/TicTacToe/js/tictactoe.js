// This variable keeps track of whose turn it is ('X' for human, 'O' for computer).
let activePlayer = 'X';
// This array stores all the moves that have been made on the board.
let selectedSquares = [];

// This function is called when a player clicks a square on the board.
function placeXorO(squareNumber) {
    // If it's the computer's turn ('O'), ignore any clicks from the human.
    if (activePlayer === 'O') {
        return;
    }

    // Check if the selected square has already been clicked.
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        // Get the HTML element (the square) that was clicked.
        let select = document.getElementById(squareNumber);

        // Place the 'X' image in the square.
        select.style.backgroundImage = 'url("images/x.png")';
        // Add the move to our history array (e.g., "0X").
        selectedSquares.push(squareNumber + activePlayer);

        // Check if this move resulted in a win or tie.
        checkWinConditions();

        // Play the placement sound effect.
        audio('./media/place.mp3');

        // Change the turn to the computer ('O').
        activePlayer = 'O';
        // Disable clicking so the human can't click while the computer "thinks".
        disableClick();
        // Wait 1 second, then let the computer take its turn.
        setTimeout(computersTurn, 1000);
        return true;
    }
}

// This function handles the computer's turn.
function computersTurn() {
    let success = false;
    let pickASquare;

    // Keep trying to pick a random square until we find an empty one.
    while (!success) {
        // Generate a random number between 0 and 8.
        pickASquare = String(Math.floor(Math.random() * 9));

        // Check if the random square is empty.
        if (!selectedSquares.some(element => element.includes(pickASquare))) {
            let select = document.getElementById(pickASquare);

            // Place the 'O' image in the square.
            select.style.backgroundImage = 'url("images/o.png")';
            // Add the move to our history array.
            selectedSquares.push(pickASquare + activePlayer);

            // Check if the computer's move resulted in a win or tie.
            checkWinConditions();

            // Play the placement sound effect.
            audio('./media/place.mp3');

            // Change the turn back to the human ('X').
            activePlayer = 'X';
            success = true;
        }
    }
}

// This function checks every possible winning combination on the board.
function checkWinConditions() {
    // Check for horizontal wins for 'X'.
    if (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100) }
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304) }
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508) }
    // Check for vertical wins for 'X'.
    else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558) }
    else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558) }
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558) }
    // Check for diagonal wins for 'X'.
    else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90) }
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 520, 520) }

    // Check for horizontal wins for 'O'.
    else if (arrayIncludes('0O', '1O', '2O')) { drawWinLine(50, 100, 558, 100) }
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 304, 558, 304) }
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508) }
    // Check for vertical wins for 'O'.
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 558) }
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 304, 558) }
    else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508, 50, 508, 558) }
    // Check for diagonal wins for 'O'.
    else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 510, 90) }
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 520, 520) }

    // If 9 squares are filled and no one won, it's a tie.
    else if (selectedSquares.length >= 9) {
        audio('./media/tie.mp3');
        // Wait half a second, show an alert, and reset the game.
        setTimeout(function () { alert("It's a tie!"); resetGame(); }, 500);
    }
}

// This helper function checks if 3 specific moves are in the selectedSquares array.
function arrayIncludes(squareA, squareB, squareC) {
    return selectedSquares.includes(squareA) && selectedSquares.includes(squareB) && selectedSquares.includes(squareC);
}

// This function temporarily locks the board so the player can't click.
function disableClick() {
    let body = document.getElementById('body');
    body.style.pointerEvents = 'none';
    // Unlocks the board after 1 second.
    setTimeout(function () { body.style.pointerEvents = 'auto'; }, 1000);
}

// This function plays audio files.
function audio(audioURL) {
    let audio = new Audio(audioURL);
    audio.play();
}

// This function draws the animated green line across the winning squares.
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    const canvas = document.getElementById('win-lines');
    const c = canvas.getContext('2d');
    let x1 = coordX1, y1 = coordY1, x2 = coordX2, y2 = coordY2;
    let x = x1, y = y1;

    // This internal function handles the animation frame by frame.
    function animateLineDrawing() {
        const animationLoop = requestAnimationFrame(animateLineDrawing);
        c.clearRect(0, 0, 608, 608);
        c.beginPath();
        c.moveTo(x1, y1);
        c.lineTo(x, y);
        c.lineWidth = 10;
        c.strokeStyle = 'rgba(70, 255, 33, .8)'; // Green line
        c.stroke();

        // Logic to move the line forward.
        if (x1 <= x2 && y1 <= y2) {
            if (x < x2) { x += 10; }
            if (y < y2) { y += 10; }
            if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); }
        }
        if (x1 <= x2 && y1 >= y2) {
            if (x < x2) { x += 10; }
            if (y > y2) { y -= 10; }
            if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); }
        }
    }

    // Internal function to clear the canvas.
    function clear() {
        const animationLoop = requestAnimationFrame(clear);
        c.clearRect(0, 0, 608, 608);
        cancelAnimationFrame(animationLoop);
    }

    disableClick();
    audio('./media/winGame.mp3');
    animateLineDrawing();

    // Wait 1 second, clear the line, and reset the game.
    setTimeout(function () { clear(); resetGame(); }, 1000);
}

// This function resets the game board to start a new round.
function resetGame() {
    // Loop through all 9 squares and remove their background images.
    for (let i = 0; i < 9; i++) {
        let square = document.getElementById(String(i));
        square.style.backgroundImage = '';
    }
    // Clear the history of moves.
    selectedSquares = [];
    // Reset the turn back to the human player.
    activePlayer = 'X';
}
