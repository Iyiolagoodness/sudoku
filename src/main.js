import './css/style.css';
import $  from 'jquery'

let initialBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

let board = initialBoard.map(row => [...row]);


function createBoard() {
    const boardContainer = document.getElementById("sudoku-board");
    boardContainer.innerHTML = "";
    document.getElementById("result").innerHTML = "";
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement("input");
            cell.type = "text";
            cell.maxLength = 1;
            cell.classList.add("cell");
            if (board[i][j] !== 0) {
                cell.value = board[i][j];
                cell.classList.add("fixed");
                cell.readOnly = true;
            }
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener("input", validateInput);
            boardContainer.appendChild(cell);
        }
    }
}

function validateInput(event) {
    let cell = event.target;
    let row = parseInt(cell.dataset.row);
    let col = parseInt(cell.dataset.col);
    let value = cell.value;
    
    if (!cell.dataset.attempts) {
        cell.dataset.attempts = "0"; // Initialize attempts if not set
    }
    
    if (!/^[1-9]$/.test(value) || !isValid(board, row, col, parseInt(value))) {
        let attempts = parseInt(cell.dataset.attempts) + 1;
        cell.dataset.attempts = attempts;
        cell.classList.add("invalid");
        
        if (attempts >= 9) {
            document.getElementById("result").innerHTML = "<span class='failure'>You Lose! ❌</span>";
            setTimeout(resetSudoku, 1000); // Reset board after 1s delay
        }
    } else {
        cell.classList.remove("invalid");
        cell.dataset.attempts = "0"; // Reset attempts if correct
        board[row][col] = parseInt(value);
    }
}

function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) return false;
        let boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        let boxCol = 3 * Math.floor(col / 3) + (i % 3);
        if (board[boxRow][boxCol] === num) return false;
    }
    return true;
}

function solveSudoku() {
    function isValid(board, row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num || board[i][col] === num) return false;
            let boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
            let boxCol = 3 * Math.floor(col / 3) + (i % 3);
            if (board[boxRow][boxCol] === num) return false;
        }
        return true;
    }

    function solve(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            if (solve(board)) return true;
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    solve(board);
    createBoard();
}


function giveUp() {
    document.getElementById("result").innerHTML = "<span class='failure'>You Lose! </span>";
    document.querySelector(".submit-btn").style.display = "none";
}

function resetSudoku() {
    board = JSON.parse(JSON.stringify(initialBoard));
    createBoard();
    document.getElementById("result").innerHTML = "";
    document.querySelector(".submit-btn").style.display = "inline-block";
    createBoard(); // Recreate board
    startTimer(); // Restart the timer
}
function startGame() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("sudoku-board").style.display = "grid";
    document.querySelector(".buttons").style.display = "block";
    createBoard();
    startTimer(); // Start the timer when the game begins
}
function valentinesSpecial() {
    board = [
        [0, 0, 0, 3, 0, 0, 0, 0, 1],
        [0, 1, 0, 0, 2, 0, 3, 0, 0],
        [2, 0, 3, 0, 0, 4, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 2, 0],
        [0, 4, 0, 0, 0, 0, 0, 1, 0],
        [0, 2, 0, 0, 0, 3, 0, 0, 0],
        [0, 0, 0, 4, 0, 0, 1, 0, 2],
        [0, 0, 1, 0, 3, 0, 0, 4, 0],
        [4, 0, 0, 0, 0, 2, 0, 0, 0]
    ];
    document.getElementById("sudoku-board").style.backgroundColor = "pink";
    document.getElementById("sudoku-board").style.backgroundImage = "url('https://www.transparenttextures.com/patterns/hearts.png')";
    createBoard();
    startGame();
}


document.querySelector(".solve-btn").textContent = "Give Up";
document.querySelector(".solve-btn").addEventListener("click", giveUp);
// Show Sudoku title animation
window.onload = function() {
    let body = document.body;
    let title = document.createElement("h1");
    title.textContent = "😶Sudoku😶";
    title.style.position = "absolute";
    title.style.top = "50%";
    title.style.left = "50%";
    title.style.transform = "translate(-50%, -50%)";
    title.style.fontSize = "50px";
    title.style.opacity = "0";
    body.appendChild(title);
    
    setTimeout(() => {
        title.style.transition = "opacity 2s";
        title.style.opacity = "1";
    }, 500);
    
    setTimeout(() => {
        title.style.transition = "opacity 2s";
        title.style.opacity = "0";
    }, 2500);
    
    setTimeout(() => {
        title.remove();
        let menu = document.createElement("div");
        menu.id = "menu";
        menu.style.textAlign = "center";
        
        let valentineBtn = document.createElement("button");
        valentineBtn.textContent = "Valentine's Day Special";
        valentineBtn.onclick = valentinesSpecial;
        
        let startBtn = document.createElement("button");
        startBtn.textContent = "Start Game";
        startBtn.onclick = startGame;
        
        menu.appendChild(valentineBtn);
        menu.appendChild(startBtn);
        body.appendChild(menu);
    }, 4500);
}

document.getElementById("sudoku-board").style.display = "none";
document.querySelector(".buttons").style.display = "none";


document.getElementById("sudoku-board").style.display = "none";
document.querySelector(".buttons").style.display = "none";

function submitSolution() {
    if (isBoardFilled() && isSolutionCorrect()) {
        document.getElementById("result").innerHTML = "<span class='success'>You get sense! ✅</span>";
    } else {
        document.getElementById("result").innerHTML = "<span class='failure'>🤣of course You can never make it! ❌</span>";
    }
}

function isBoardFilled() {
    return Array.from(document.querySelectorAll('.cell:not(.fixed)')).every(cell => /^[1-9]$/.test(cell.value));
}

function isSolutionCorrect() {
    return true; 
}
let timeLeft = 600; 
let timerInterval;

function startTimer() {
    clearInterval(timerInterval); 
    timeLeft = 600 ; 
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            document.getElementById("result").innerHTML = "<span class='failure'> u are too slow ! ❌</span>";
            setTimeout(resetSudoku, 2000); 
        }
    }, 1000);
}

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById("time-left").textContent = 
        `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}



createBoard();

$('.solve-btn').click(() => solveSudoku())
$('.reset-btn').click(() => resetSudoku())
$('.submit-btn').click(() => submitSolution())