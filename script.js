let score = {
    won: 0,
    lost: 0,
    tie: 0
};

function playGame(playerChoice) {

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

    alert(`You chose ${playerChoice}, computer chose ${computerChoice}. \n Won=${score.won}\n Lost=${score.lost}\n Tie=${score.tie}`)
}

function pickComputerMove() {
    const randNumber = Math.random();
    if (randNumber < 1 / 3) return 'Rock';
    else if (randNumber < 2 / 3) return 'Paper';
    else return 'Scissors';
}