const cells = document.querySelectorAll('.cell');
let isGameActive = true; 
let isXNext = true; 


const winningCombinations = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6],
];


cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (isGameActive && !cell.classList.contains('taken')) {
            
            cell.textContent = 'X';
            cell.classList.add('taken', 'X');
            checkWinner('X'); 
            if (isGameActive) {
                setTimeout(computerMove, 500); 
            }
        }
    });
});


function checkWinner(player) {
    const playerCells = Array.from(cells).filter((cell) => cell.classList.contains(player));
    const playerIndexes = playerCells.map((cell) => Array.from(cells).indexOf(cell));

    for (const combination of winningCombinations) {
        if (combination.every((index) => playerIndexes.includes(index))) {
            isGameActive = false;
            highlightWinningCells(combination);
            alert(`${player} wins!`);
            return;
        }
    }

    
    if (Array.from(cells).every((cell) => cell.classList.contains('taken'))) {
        isGameActive = false;
        alert("It's a draw!");
    }
}


function highlightWinningCells(combination) {
    combination.forEach((index) => {
        cells[index].style.backgroundColor = 'lightgreen';
    });
}


function computerMove() {
    if (!isGameActive) return;

    const availableCells = Array.from(cells).filter((cell) => !cell.classList.contains('taken'));
    if (availableCells.length === 0) return;

    
    const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    randomCell.textContent = 'O';
    randomCell.classList.add('taken', 'O');
    checkWinner('O'); 
}
