const startGame = document.querySelector('button')
const gameWrapper = document.querySelector('.startGameWrapper')

const humanWeapon = document.querySelector('.humanWeapon')
const computerWeapon = document.querySelector('.computerWeapon')

const humanScorePara = document.querySelector('.humanScore')
const computerScorePara = document.querySelector('.computerScore')

// const endgameModal = document.getElementById('endgameModal')
// const endgameMsg = document.getElementById('endgameMsg')

// const overlay = document.getElementById('overlay')
// const restartBtn = document.getElementById('restartBtn')

// restartBtn.addEventListener('click', restartGame)
// overlay.addEventListener('click', closeEndgameModal)


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
    // if (isGameOver()) {
    //     openEndgameModal()
    //     return
    // }

    const computerSelection = getRandomChoice();

    playRound(playerSelection, computerSelection);
    updateChoices(playerSelection, computerSelection);
    updateScore();

    // if (isGameOver()) {
    //     openEndgameModal()
    //     setFinalMessage()
    // }
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


// function isGameOver() {
//     return playerScore === 5 || computerScore === 5
// }


function updateChoices(playerSelection, computerSelection) {
    switch (playerSelection) {
        case 'rock':
            humanWeapon.innerHTML = `<i class="fa-regular fa-hand-back-fist"></i>`;
            break;
        case 'paper':
            humanWeapon.innerHTML = `<i class="fa-regular fa-hand"></i>`;
            break;
        case 'scissors':
            humanWeapon.innerHTML = `<i class="fa-regular fa-hand-scissors"></i>`;
            break;
    }

    switch (computerSelection) {
        case 'rock':
            computerWeapon.innerHTML = `<i class="fa-regular fa-hand-back-fist weapon"></i>`;
            break
        case 'paper':
            computerWeapon.innerHTML = `<i class="fa-regular fa-hand weapon"></i>`;
            break
        case 'scissors':
            computerWeapon.innerHTML = `<i class="fa-regular fa-hand-scissors weapon"></i>`;
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

// function openEndgameModal() {
//     endgameModal.classList.add('active')
//     overlay.classList.add('active')
// }

// function closeEndgameModal() {
//     endgameModal.classList.remove('active')
//     overlay.classList.remove('active')
// }

// function setFinalMessage() {
//     return playerScore > computerScore
//         ? (endgameMsg.textContent = 'You won!')
//         : (endgameMsg.textContent = 'You lost...')
// }

// function restartGame() {
//     humanScore = 0
//     computerScore = 0
//     playerScore.textContent = 'Player: 0'
//     computerScore.textContent = 'Computer: 0'
//     humanWeapon.textContent = '❔'
//     computerWeapon.textContent = '❔'
//     endgameModal.classList.remove('active')
//     overlay.classList.remove('active')
// }