// ==============================
// Constants and Global Variables
// ==============================

// Constants to represent the players
const PLAYER_ONE = 'R';
const PLAYER_TWO = 'Y';
let currentPlayer = PLAYER_ONE; // Tracks the current player

// The game board representation as a 2D array
const board = Array(6).fill().map(() => Array(7).fill(null));


// ===============
// Initialization
// ===============

// Function to initialize the game
function initializeGame() {
    createBoard();
    renderBoard();
}

// Function to create the board in HTML
function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Clear the game board (useful for resetting the game)

    // Generate the cells
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 7; c++) {
            const cell = document.createElement('div');
            cell.id = `cell-${r}-${c}`; // Gives a unique ID for each cell
            cell.classList.add('cell');
            cell.addEventListener('click', handleCellClick); // Adds a click event listener to each cell
            gameBoard.appendChild(cell);
        }
    }
}

// Start the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeGame);


// =======================
// Game Play Functionality
// =======================

// Function to handle cell clicks
function handleCellClick(event) {
    const column = event.target.id.split('-')[2]; // Extracts the column number from the clicked cell's ID

    // Find the first open cell in the column
    for (let r = 5; r >= 0; r--) {
        if (!board[r][column]) {
            board[r][column] = currentPlayer; // Place the current player's disc in the cell
            break;
        }
    }

    const gameState = checkGameState(); // Check the game's state after the move
    if (gameState) {
        endGame(gameState); // Handle the end of the game if there's a winner or a draw
    } else {
        // Switch players if the game is still ongoing
        currentPlayer = currentPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
    }
    renderBoard(); // Re-render the board to reflect the new state
}

// Function to render the board to the UI
function renderBoard() {
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 7; c++) {
            const cell = document.getElementById(`cell-${r}-${c}`);
            cell.className = 'cell'; // Reset the class
            if (board[r][c] === PLAYER_ONE) {
                cell.classList.add('red'); // Mark the cell as red if it contains PLAYER_ONE's disc
            } else if (board[r][c] === PLAYER_TWO) {
                cell.classList.add('yellow'); // Mark the cell as yellow if it contains PLAYER_TWO's disc
            }
        }
    }
}

// Function to check the game state (win, draw, or ongoing)
function checkGameState() {
    if (hasWon(PLAYER_ONE)) {
        return PLAYER_ONE; // PLAYER_ONE wins
    } else if (hasWon(PLAYER_TWO)) {
        return PLAYER_TWO; // PLAYER_TWO wins
    } else if (isDraw()) {
        return 'draw'; // The game is a draw
    }
    return null; // The game is still ongoing
}

// Function to end the game (called when there's a winner or a draw)
function endGame(result) {
    const gameMessage = document.getElementById('game-message');
    if (result === PLAYER_ONE) {
        gameMessage.textContent = 'Player Red wins!'; // Display win message for PLAYER_ONE
    } else if (result === PLAYER_TWO) {
        gameMessage.textContent = 'Player Yellow wins!'; // Display win message for PLAYER_TWO
    } else if (result === 'draw') {
        gameMessage.textContent = 'It\'s a draw!'; // Display message for a draw
    }
    // Optionally, disable further cell clicks here
}


// =======================
// Game Logic: Win Checks
// =======================

// Function to check if the specified player has won
function hasWon(player) {
    // Check horizontal lines for a win
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c] === player &&
                board[r][c + 1] === player &&
                board[r][c + 2] === player &&
                board[r][c + 3] === player) {
                return true; // Found a horizontal win
            }
        }
    }

    // Check vertical lines for a win
    for (let c = 0; c < 7; c++) {
        for (let r = 0; r < 3; r++) {
            if (board[r][c] === player &&
                board[r + 1][c] === player &&
                board[r + 2][c] === player &&
                board[r + 3][c] === player) {
                return true; // Found a vertical win
            }
        }
    }

    // Check diagonal (top-left to bottom-right) for a win
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c] === player &&
                board[r + 1][c + 1] === player &&
                board[r + 2][c + 2] === player &&
                board[r + 3][c + 3] === player) {
                return true; // Found a diagonal win
            }
        }
    }

    // Check diagonal (bottom-left to top-right) for a win
    for (let r = 3; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c] === player &&
                board[r - 1][c + 1] === player &&
                board[r - 2][c + 2] === player &&
                board[r - 3][c + 3] === player) {
                return true; // Found a diagonal win
            }
        }
    }

    return false; // No win found for the player
}

// Function to check for a draw
function isDraw() {
    return board.every(row => row.every(cell => cell !== null)); // Check if all cells are filled
}


// ====================
// Game Reset Function
// ====================

// Function to reset the game
function resetGame() {
    // Clear the board and reset the currentPlayer
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 7; c++) {
            board[r][c] = null;
        }
    }
    currentPlayer = PLAYER_ONE; // Reset to the first player
    renderBoard(); // Re-render the board to reflect the reset state

    // Clear any win/draw messages
    const gameMessage = document.getElementById('game-message');
    gameMessage.textContent = ''; 
}

// Event listener for the reset button
document.getElementById('reset-button').addEventListener('click', resetGame);