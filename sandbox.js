const startGame = document.querySelector('button')
const gameWrapper = document.querySelector('.startGameWrapper')

const humanWeapon = document.querySelector('.humanWeapon')
const computerWeapon = document.querySelector('.computerWeapon')

const humanScorePara = document.querySelector('.humanScore')
const computerScorePara = document.querySelector('.computerScore')

const endGameWrapper = document.querySelector('.endGameWrapper')
const endGameMsg = document.querySelector('.endGameMsg')
const restartBtn = document.querySelector('.playAgain')

restartBtn.addEventListener('click', playAgain)
endGameWrapper.addEventListener('click', closeEndGameWrapper)

startGame.addEventListener('click', () => {
    gameWrapper.classList.toggle('displayNone')
});

let humanScore = 0;
let computerScore = 0;
let roundWinner = '';

// computer selection
function getRandomChoice() {
    let randomNumber = Math.floor(Math.random() * 3)
    switch (randomNumber) {
        case 0:
            return 'rock';
        case 1:
            return 'paper';
        case 2:
            return 'scissors';
    }
}

// outcomes
function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        roundWinner = 'tie';
    }
    if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'scissors' && computerSelection === 'paper') ||
        (playerSelection === 'paper' && computerSelection === 'rock')
    ) {
        humanScore++;
        roundWinner = 'human';
    }
    if (
        (computerSelection === 'rock' && playerSelection === 'scissors') ||
        (computerSelection === 'scissors' && playerSelection === 'paper') ||
        (computerSelection === 'paper' && playerSelection === 'rock')
    ) {
        computerScore++;
        roundWinner = 'computer';
    }
    updateScoreMessage(roundWinner, playerSelection, computerSelection)
}

// Get references to the buttons and result div
const rockBtn = document.querySelector('.rock')
const paperBtn = document.querySelector('.paper')
const scissorsBtn = document.querySelector('.scissors')

const scoreInfo = document.querySelector('.scoreInfo')
const results = document.querySelector('.results')

rockBtn.addEventListener('click', () => handleClick('rock'))
paperBtn.addEventListener('click', () => handleClick('paper'))
scissorsBtn.addEventListener('click', () => handleClick('scissors'))

// player selection to handle game
function handleClick(playerSelection) {
    if (isGameOver()) {
        openEndGameWrapper()
        return
    }

    const computerSelection = getRandomChoice();

    playRound(playerSelection, computerSelection);
    updateChoices(playerSelection, computerSelection);
    updateScore();

    if (isGameOver()) {
        openEndGameWrapper()
        setFinalMessage()
    }
}

// round results
function updateScore() {
    if (roundWinner === 'tie') {
        results.textContent = "It's a tie!";
        humanWeapon.classList.remove('fa-fade');
        computerWeapon.classList.remove('fa-fade');

    } else if (roundWinner === 'human') {
        results.textContent = 'You won!';
        humanWeapon.classList.add('fa-fade');
        computerWeapon.classList.remove('fa-fade');
        
    } else if (roundWinner === 'computer') {
        results.textContent = 'You lost!';
        computerWeapon.classList.add('fa-fade')
        humanWeapon.classList.remove('fa-fade');
    }

    humanScorePara.textContent = `Score: ${humanScore}`;
    computerScorePara.textContent = `Score: ${computerScore}`;
}


function isGameOver() {
    return humanScore === 5 || computerScore === 5
}


function updateChoices(playerSelection, computerSelection) {
    switch (playerSelection) {
        case 'rock':
            humanWeapon.innerHTML = `<i class="fa-regular fa-hand-back-fist fa-rotate-90"></i>`;
            break;
        case 'paper':
            humanWeapon.innerHTML = `<i class="fa-regular fa-hand fa-rotate-90"></i>`;
            break;
        case 'scissors':
            humanWeapon.innerHTML = `<i class="fa-regular fa-hand-scissors fa-flip-horizontal"></i>`;
            break;
    }

    switch (computerSelection) {
        case 'rock':
            computerWeapon.innerHTML = `<i class="fa-regular fa-hand-back-fist flip"></i>`;
            break
        case 'paper':
            computerWeapon.innerHTML = `<i class="fa-regular fa-hand flip"></i>`;
            break
        case 'scissors':
            computerWeapon.innerHTML = `<i class="fa-regular fa-hand-scissors"></i>`;
            break
    }
}


function updateScoreMessage(winner, playerSelection, computerSelection) {
    if (winner === 'human') {
        scoreInfo.textContent = `${capitalizeFirstLetter(
            playerSelection
        )} beats ${computerSelection.toLowerCase()}`
        return
    }
    if (winner === 'computer') {
        scoreInfo.textContent = `${capitalizeFirstLetter(
            playerSelection
        )} is beaten by ${computerSelection.toLowerCase()}`
        return
    }

    scoreInfo.textContent = `${capitalizeFirstLetter(
        playerSelection
    )} ties with ${computerSelection.toLowerCase()}`
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}


function openEndGameWrapper() {
    endGameWrapper.classList.remove('endActive')
}

function closeEndGameWrapper() {
    endGameWrapper.classList.add('endActive')
}

//final score msg
function setFinalMessage() {
    return humanScore > computerScore
        ? (endGameMsg.textContent = 'You won!')
        : (endGameMsg.textContent = 'You lost...')
}

// play again 
function playAgain() {
    humanScore = 0;
    computerScore = 0;
    humanScorePara.textContent = 'Score: 0';
    computerScorePara.textContent = 'Score: 0';
    results.textContent = '';
    scoreInfo.textContent = '';
    humanWeapon.innerHTML = '';
    computerWeapon.innerHTML = '';
    endGameWrapper.classList.add('endActive')
}