let score = {
    won: 0,
    lost: 0,
    tie: 0
};

let round = 0;
let maxRounds;
let result;
let computerChoice;



window.onload = function () {
    startGame();
};

document.getElementById("rockBtn").addEventListener("click", function () {
    playGame("Rock");
});

document.getElementById("paperBtn").addEventListener("click", function () {
    playGame("Paper");
});

document.getElementById("scissorsBtn").addEventListener("click", function () {
    playGame("Scissors");
});

document.getElementById("resetBtn").addEventListener("click", function () {
    playGame("Reset");
});

function startGame() {
    showInputPopup(function (rounds) {
        if (rounds === null) return; // user canceled, do nothing


        maxRounds = rounds;
        score = {
            won: 0,
            lost: 0,
            tie: 0
        };
        round = 0;
        document.getElementById("resultText").textContent = `Game started: ${maxRounds} rounds!`;
    });
}

function playGame(playerChoice) {
    if (playerChoice === 'Reset') {
        startGame();
        return;
    }

    if (round >= maxRounds) {
        //alert('Game over! Press Reset to play again.');
        showPopup("Game over! Press Reset to play again.");

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

    resultAnimation(playerChoice, computerChoice, result);
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

    showPopup(`${finalMessage}\nFinal Score: Won=${score.won} Lost=${score.lost} Tie=${score.tie} \n Do You Want To Play again?`, function (confirmed) {
        if (confirmed) startGame();
    });

}

//animation classes
function resultAnimation(playerChoice, computerChoice, result) {
    const resultText = document.getElementById("resultText");
    resultText.textContent = `Round ${round} of ${maxRounds}: You chose ${playerChoice}, Computer chose ${computerChoice} → ${result.toUpperCase()}`;

    resultText.className = "result-message";

    if (result === "won") {
        resultText.classList.add("win");
    } else if (result === "lost") {
        resultText.classList.add("lose");
    } else {
        resultText.classList.add("tie");
    }
}


function showPopup(message, callback = null) {
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popupMessage");
    const okBtn = document.getElementById("popupOk");
    const cancelBtn = document.getElementById("popupCancel");

    popupMessage.textContent = message;
    popup.classList.remove("hidden");

    // Clear old events
    okBtn.onclick = null;
    cancelBtn.onclick = null;

    okBtn.onclick = function () {
        popup.classList.add("hidden");
        if (callback) callback(true);
    };

    cancelBtn.onclick = function () {
        popup.classList.add("hidden");
        if (callback) callback(false);
    };
}


function showInputPopup(callback) {
    const inputPopup = document.getElementById("inputPopup");
    const roundInput = document.getElementById("roundInput");
    const okBtn = document.getElementById("inputOk");
    const cancelBtn = document.getElementById("inputCancel");

    inputPopup.classList.remove("hidden");
    roundInput.value = "";
    roundInput.focus();

    okBtn.onclick = function () {
        let value = parseInt(roundInput.value, 10);
        inputPopup.classList.add("hidden");

        if (isNaN(value) || value <= 0) {
            showPopup("Invalid number of rounds! Defaulting to 5.");
            value = 5;
        } else if (value > 10) {
            showPopup("You should have entered a number less than 10. Now Round is 10");
            value = 5;
        }
        callback(value);
    };

    cancelBtn.onclick = function () {
        inputPopup.classList.add("hidden");
        callback(null);
    };
}