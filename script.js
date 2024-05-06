const tiles = document.querySelectorAll('.box');
const restartButton = document.getElementById('restartButton');
const themeSelector = document.getElementById('themeSelector');
const currentTurnElement = document.getElementById('current-turn');
let currentPlayer = 'X';
let playerNames = { 'X': 'Player 1', 'O': 'Player 2' };

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('setNamesButton').addEventListener('click', setPlayers);
    setEventListeners();
    updateTurnDisplay();
});

function setEventListeners() {
    tiles.forEach(tile => {
        tile.addEventListener('click', function() {
            if (!this.textContent && document.getElementById('endMessage').textContent === '') {
                this.textContent = currentPlayer;
                if (checkWin(currentPlayer)) {
                    document.getElementById('endMessage').textContent = `${playerNames[currentPlayer]} has won!`;
                    setTimeout(resetBoard, 2000);
                } else if (isBoardFull()) {
                    document.getElementById('endMessage').textContent = "It's a tie!";
                    setTimeout(resetBoard, 2000);
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    updateTurnDisplay();
                }
            }
        });
    });

    restartButton.addEventListener('click', resetBoard);
    themeSelector.addEventListener('change', changeTheme);
}

function setPlayers() {
    let player1Name = document.getElementById('player1Name').value.trim() || 'Player 1';
    let player2Name = document.getElementById('player2Name').value.trim() || 'Player 2';
    playerNames['X'] = player1Name;
    playerNames['O'] = player2Name;
    updateTurnDisplay();
}

function updateTurnDisplay() {
    currentTurnElement.textContent = `Turn: ${playerNames[currentPlayer]}`;
}

function checkWin(player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombinations.some(combination => {
        return combination.every(index => tiles[index].textContent === player);
    });
}

function isBoardFull() {
    return [...tiles].every(cell => cell.textContent);
}

function resetBoard() {
    tiles.forEach(tile => tile.textContent = '');
    document.getElementById('endMessage').textContent = '';
    document.getElementById('player1Name').value = '';
    document.getElementById('player2Name').value = '';
    currentPlayer = 'X';
    updateTurnDisplay();
}

function changeTheme() {
    const selectedTheme = themeSelector.value;
    document.body.className = selectedTheme;
}
