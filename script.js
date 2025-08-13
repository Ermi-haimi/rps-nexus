let score = {
    won: 0,
    lost: 0,
    tie: 0
};

let round = 0;
let maxRounds;
let result;
let computerChoice;

function startGame() {
    maxRounds = parseInt(prompt("How many rounds do you want to play?"), 10);
    if (isNaN(maxRounds) || maxRounds <= 0) {
        alert("Invalid number of rounds! Defaulting to 5.");
        maxRounds = 5;
    }
    score = {
        won: 0,
        lost: 0,
        tie: 0
    };
    round = 0;
}

// Start game when page loads
window.onload = startGame;

function playGame(playerChoice) {
    if (playerChoice === 'Reset') {
        startGame();
        return;
    }

    if (round >= maxRounds) {
        alert('Game over! Press Reset to play again.');
        return;
    }

    computerChoice = pickComputerMove();

    if (playerChoice === 'Rock') {
        if (computerChoice === 'Scissors') {
            result = 'won';
        } else if (computerChoice === 'Paper') result = 'lost';
        else result = 'tie';
    } else if (playerChoice === 'Paper') {
        if (computerChoice === 'Rock') result = 'won';
        else if (computerChoice === 'Scissors') result = 'lost';
        else result = 'tie';
    } else if (playerChoice === 'Scissors') {
        if (computerChoice === 'Rock') result = 'lost';
        else if (computerChoice === 'Paper') result = 'won';
        else result = 'tie';
    }

    score[result]++;
    round++;

    alert(`You chose ${playerChoice}, computer chose ${computerChoice}. \n Won=${score.won}\n Lost=${score.lost}\n Tie=${score.tie}`)
    if (round === maxRounds) {
        endGame();
    }
}

function pickComputerMove() {
    const randNumber = Math.random();
    if (randNumber < 1 / 3) return 'Rock';
    else if (randNumber < 2 / 3) return 'Paper';
    else return 'Scissors';
}

function endGame() {
    let finalMessage;
    if (score.won > score.lost) {
        finalMessage = `🎉 You won the game!`;
    } else if (score.lost > score.won) {
        finalMessage = `😢 You lost the game!`;
    } else {
        finalMessage = `🤝 It's a tie!`;
    }

    if (confirm(`${finalMessage}\nFinal Score: Won=${score.won} Lost=${score.lost} Tie=${score.tie}\n\nPlay again?`)) {
        startGame();
    }
}