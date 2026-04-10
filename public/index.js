const gameboard = document.getElementById('container');     // The game board container
const outerTable = document.createElement('table');
const winnerStatus = document.getElementById('status');      // Element to display game status/winner

const resetBtn = document.getElementById('resetBtn');        // Reset button

const arr = [
    [[9, 8, 1], [9, 8, 1], [9, 8, 1]], // Board 0
    [[1, 2, 3], [4, 5, 6], [7, 8, 9]], // Board 1
    [[9, 8, 1], [9, 8, 1], [9, 8, 1]], // Board 2
    [[9, 8, 1], [9, 8, 1], [9, 8, 1]], // Board 3
    [[9, 8, 1], [9, 8, 1], [9, 8, 1]], // Board 4
    [[9, 8, 1], [9, 8, 1], [9, 8, 1]], // Board 5
    [[9, 8, 1], [9, 8, 1], [9, 8, 1]], // Board 6
    [[9, 8, 1], [9, 8, 1], [9, 8, 1]], // Board 7
    [[9, 8, 1], [9, 8, 1], [9, 8, 1]]  // Board 8
];

/*
// 3D Array Board
let board = [[[['','',''],['','',''],['','','']],[['','',''],['','',''],['','','']],[['','',''],['','',''],['','','']]],
             [[['','',''],['','',''],['','','']],[['','',''],['','',''],['','','']],[['','',''],['','',''],['','','']]],
             [[['','',''],['','',''],['','','']],[['','',''],['','',''],['','','']],[['','',''],['','',''],['','','']]]];            // Array representing the game board (empty initially)
*/

/*
// 2D Array Board
let board = [['','','','','','','','',''],
             ['','','','','','','','',''],
             ['','','','','','','','',''],
             ['','','','','','','','',''],
             ['','','','','','','','',''],
             ['','','','','','','','',''],
             ['','','','','','','','',''],
             ['','','','','','','','',''],
             ['','','','','','','','','']];            // Array representing the game board (empty initially)
*/

let gameActive = true;                                       // Flag to control game flow


function createBoard() {

    for (let i = 0; i < 3; i++) { 
    const outerRow = document.createElement('tr');
    
    for (let j = 0; j < 3; j++) {
        
        const boardContainerCell = document.createElement('td');
        const innerTable = document.createElement('table');
        innerTable.className = "sudoku-board";

        for (let k = 0; k < 3; k++) { 
            const innerRow = document.createElement('tr');
            
            for (let h = 0; h < 3; h++) { 
                const cell = document.createElement('td');
                const value = arr[j][k][h];
                cell.textContent = value !== 0 ? value : "";
                innerRow.appendChild(cell);

                cell.addEventListener('click',handleCellClick)
                cell.addEventListener('mouseover',highlightAvailableMoves)
                cell.addEventListener('mouseout',clearHighlights);
            }
                innerTable.appendChild(innerRow);
            }
            boardContainerCell.appendChild(innerTable);
            outerRow.appendChild(boardContainerCell);
        }
        outerTable.appendChild(outerRow);
    }
    gameboard.appendChild(outerTable);
    
};


function handleCellClick(event) {
    const cellId = event.target.id;
    console.log(cellId)
    handleMove(cellId); // Reuse the logic for handling a move

    // Clear highlights after the player's move
    clearHighlights();
}

/*
 * computerMove function:
 * 
 * This function handles the computer's turn. It randomly selects an
 * available cell and calls the 'handleMove' function to process the move.
 * The 'handleMove' function will then check for a winner, a draw, or 
 * switch the turn back to the player.
 * 
 * 
 */
function computerMove() {

    let availableCells = board.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
    }, []);

    let randomIndex = Math.floor(Math.random() * availableCells.length);

    let cellId = availableCells[randomIndex];

    handleMove(cellId); // Reuse the logic for handling a move
};

function handleMove(cellId) {
    // Ensure valid move and game is active
    if (board[cellId] !== '0' || !gameActive) {
        return;
    };

    // Update board and cell display
    board[cellId] = currentPlayer;

    document.getElementById(cellId).textContent = currentPlayer;

    // Check for win or draw
    if (checkWinner()) {

        winnerStatus.textContent = 'Player ${currentPlayer} wins!';
        gameActive = false;

    } else if (board.every(cell => cell !== '')) {

        winnerStatus.textContent = "It's a draw!";
        gameActive = false;

    } else {

        // Switch player 
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        winnerStatus.textContent = (currentPlayer === 'O') ? "Computer's turn" : `Player ${currentPlayer}'s turn`;

        setTimeout(highlightAvailableMoves, 500);

        // If it's the computer's turn, trigger its move after a delay
        if (currentPlayer === 'O') {
            setTimeout(computerMove, 500); 
        };

    };
};


function highlightAvailableMoves() { // Only highlight during player's turn

    const availableCells = board.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
    }, []);

    availableCells.forEach(cellId => {
        const cell = document.getElementById(cellId);
        cell.classList.add('potential-move');
    });

};

function clearHighlights() {

    
    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => cell.classList.remove('potential-move'));
};


function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {

            document.getElementById(a).classList.add('winner');
            document.getElementById(b).classList.add('winner');
            document.getElementById(c).classList.add('winner');

            return true;
        }
    }
    return false;
}


function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];

    currentPlayer = 'X';

    gameActive = true;

    winnerStatus.textContent = "Player X's turn";

    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner'); 
    });

};


createBoard();

winnerStatus.textContent = "Player X's turn";



