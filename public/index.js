const gameboard = document.getElementById('gameboard');     // The game board container

const winnerStatus = document.getElementById('status');      // Element to display game status/winner

const resetBtn = document.getElementById('resetBtn');        // Reset button

// Game state variables
let board = [[['','',''],['','',''],['','','']],[['','',''],[],[]],[[],[],[]]];            // Array representing the game board (empty initially)

let currentPlayer = 'X';                                     // Current player ('X' starts)

let gameActive = true;                                       // Flag to control game flow


function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = i;

        /*                                                                                                                                                                                                                                                                        
        
            !!! TODO !!!

            Task 1: For each cell created here, attach an event listener for 'click' to call the "handleCellClick" function


        */

        cell.addEventListener('click',handleCellClick);

        /* 
        
            !!! TODO !!!

            Task 2: For each cell, attach an event listener for 'mouseover' to call 'highlightAvailableMoves'                                                                                                                                                                                                                 

        */

        cell.addEventListener('mouseover',highlightAvailableMoves);

        /* 
        
            !!! TODO !!!

            Task 3: For each cell, attach an event listener for 'mouseout' to call 'clearHighlights'                                                                                                                                                                                                                         


        */

        cell.addEventListener('mouseout',clearHighlights);


        gameboard.appendChild(cell);
        

    };
};


function handleCellClick(event) {
    const cellId = event.target.id;

    if (currentPlayer === 'O') {
        return;
    }

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

/

function handleMove(cellId) {
    // Ensure valid move and game is active
    if (board[cellId] !== '' || !gameActive) {
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


function highlightAvailableMoves() {
    if (currentPlayer !== 'X' || !gameActive) return; // Only highlight during player's turn

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



