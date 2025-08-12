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

    alert(`${result.toUpperCase()}, You chose ${playerChoice}, computer chose ${computerChoice}.`)
}

function pickComputerMove() {
    const randNumber = Math.random();
    if (randNumber < 1 / 3) return 'Rock';
    else if (randNumber < 2 / 3) return 'Paper';
    else return 'Scissors';
}