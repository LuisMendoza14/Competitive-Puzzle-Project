const gameboard = document.getElementById('container');
const outerTable = document.createElement('table');
outerTable.className = "mega-grid";
const winnerStatus =  document.getElementById('status')
const diffSelect = document.getElementById('difficulty');
let grid = new Array(9).fill(0).map(() => new Array(9).fill(0));
let winGrid;
let startGrid;
let rowArr = new Array(9).fill().map(() => new Array().fill());
let colArr = new Array(9).fill().map(() => new Array().fill());

console.log(rowArr)
console.log(colArr)

// Get all td elements by the class name "cell"
// Withe the array of elements return this way, I need to map over them and determin if they are in the came row and column
// If the element is in the same row and colunn, I will apply a css styling to it

let k = 40;

diffSelect.addEventListener('change', setDiffuculty);

// JavaScript program to generate a valid sudoku 
// with k empty cells

// Returns false if given 3x3 block contains num
// Ensure the number is not used in the box
function unUsedInBox(grid, rowStart, colStart, num) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[rowStart + i][colStart + j] === num) {
                return false;
            }
        }
    }
    return true;
}

// Fill a 3x3 matrix
// Assign valid random numbers to the 3x3 subgrid
function fillBox(grid, row, col) {
    let num;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            do {
                // Generate a random number between 1 and 9
                num = Math.floor(Math.random() * 9) + 1;
            } while (!unUsedInBox(grid, row, col, num));
            grid[row + i][col + j] = num;
        }
    }
}

// Check if it's safe to put num in row i
// Ensure num is not already used in the row
function unUsedInRow(grid, i, num) {
    for (let j = 0; j < 9; j++) {
        if (grid[i][j] === num) {
            return false;
        }
    }
    return true;
}

// Check if it's safe to put num in column j
// Ensure num is not already used in the column
function unUsedInCol(grid, j, num) {
    for (let i = 0; i < 9; i++) {
        if (grid[i][j] === num) {
            return false;
        }
    }
    return true;
}

// Check if it's safe to put num in the cell (i, j)
// Ensure num is not used in row, column, or box
function checkIfSafe(grid, i, j, num) {
    return unUsedInRow(grid, i, num) && unUsedInCol(grid, j, num) &&
           unUsedInBox(grid, i - (i % 3), j - (j % 3), num);
}

// Fill the diagonal 3x3 matrices
// The diagonal blocks are filled to simplify the process
function fillDiagonal(grid) {
    
    for (let i = 0; i < 9; i += 3) {
        
        // Fill each 3x3 subgrid diagonally
        fillBox(grid, i, i);
    }
}

// Fill remaining blocks in the grid
// Recursively fill the remaining cells with valid numbers
function fillRemaining(grid, i, j) {
    
    // If we've reached the end of the grid
    if (i === 9) {
        return true;
    }

    // Move to next row when current row is finished
    if (j === 9) {
        return fillRemaining(grid, i + 1, 0);
    }

    // Skip if cell is already filled
    if (grid[i][j] !== 0) {
        return fillRemaining(grid, i, j + 1);
    }

    // Try numbers 1-9 in current cell
    for (let num = 1; num <= 9; num++) {
        if (checkIfSafe(grid, i, j, num)) {
            grid[i][j] = num;
            if (fillRemaining(grid, i, j + 1)) {
                return true;
            }
            grid[i][j] = 0;
        }
    }

    return false;
}

// Remove K digits randomly from the grid
// This will create a Sudoku puzzle by removing digits
function removeKDigits(grid, k) {
    winGrid = structuredClone(grid);
    while (k > 0) {
        
        // Pick a random cell
        let cellId = Math.floor(Math.random() * 81);

        // Get the row index
        let i = Math.floor(cellId / 9);

        // Get the column index
        let j = cellId % 9;

        // Remove the digit if the cell is not already empty
        if (grid[i][j] !== 0) {
            // Empty the cell
            grid[i][j] = 0;

            // Decrease the count of digits to remove
            k--;
        }
    }
    startGrid = structuredClone(grid);
}

// Generate a Sudoku grid with K empty cells
function sudokuGenerator(k) {

    // Fill the diagonal 3x3 matrices
    fillDiagonal(grid);

    // Fill the remaining blocks in the grid
    fillRemaining(grid, 0, 0);

    // Remove K digits randomly to create the puzzle
    removeKDigits(grid, k);

    return grid;
}

function splitId(id){
    return id.split(",");
}

function setValue(ev) {
    
    const split_id = splitId(ev.target.id);
    
    let newValue = prompt("Enter Value");
    
    if (!newValue.match("[1-9]{1}")){
        return;
    }    
    if (newValue == winGrid[split_id[0]][split_id[1]]){
         grid[split_id[0]][split_id[1]] = Number(newValue);

        console.log(grid)
        
        //ev.target.style.backgroundColor = "90D5FF";
        ev.target.textContent = newValue;
    
        
        if(checkWinner()){
            alert("Winner!");
            winnerStatus = "Winner!"
        };
    } else {
        alert("Incorrect!");
    }

   


}

function highlight() {
    
}

function clearHighlights() {

    
    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => cell.classList.remove('potential-move'));
};

function setDiffuculty(e){
    console.log(e);
    let newVal = Number(e.target.value);
    k = newVal;
}

function checkWinner() {

    for(i = 0; i < 9; i++){
        for(j = 0; j < 9; j++){
            if(grid[i][j] != winGrid[i][j]){
                return false;
            }
        }
    }

    return true;
}


    
// i = outer row of blocks (0-2)
function paintBoard (grid) {
    
    for (let i = 0; i < 3; i++) { 
        const outerRow = document.createElement('tr');
        
        // j = outer column of blocks (0-2)
        for (let j = 0; j < 3; j++) {
            const boardContainerCell = document.createElement('td');
            const innerTable = document.createElement('table');
            innerTable.className = "sudoku-board";

            // k = inner row within a specific block (0-2)
            for (let k = 0; k < 3; k++) { 
                const innerRow = document.createElement('tr');
                
                // h = inner column within a specific block (0-2)
                for (let h = 0; h < 3; h++) { 
                    const cell = document.createElement('td');
                    
                    // Calculate the global 9x9 indices
                    const absoluteRow = (i * 3) + k; 
                    const absoluteCol = (j * 3) + h;
                    
                    // Fetch the correct value using the calculated global indices
                    const value = grid[absoluteRow][absoluteCol];
                    
                    cell.id = (absoluteRow).toString() + "," + (absoluteCol).toString()
                    cell.classList.add("sudoku_cell") 
                    if(value !== 0){
                        cell.textContent = value;
                    } else {
                        cell.addEventListener('click', setValue);
                    }

                    cell.addEventListener('hover', highlight);

                    rowArr[absoluteRow].push(cell)
                    colArr[absoluteCol].push(cell)

                    innerRow.appendChild(cell);
                }
                innerTable.appendChild(innerRow);
            }
            boardContainerCell.appendChild(innerTable);
            outerRow.appendChild(boardContainerCell);
            
            if(checkWinner()){
                resetBttn.addEventListener('click', resetGame);
            }
        }
        outerTable.appendChild(outerRow);
    }
    gameboard.appendChild(outerTable);

}

/* Originl Check Funtions (unused)
    function checkRows() {

        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){

            }
        }
    }
    function checkCols() {
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                
            }
        }
    }
    function checkGrids() {}
*/

function resetGame(e) {
    paintBoard(sudokuGenerator(e));

    winnerStatus.textContent = "No Winner Yet!";

    const cells = document.querySelectorAll('.cell');

};


paintBoard(sudokuGenerator(k))

winnerStatus.textContent = "No Winner Yet!";



