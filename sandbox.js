const startGame = document.querySelector("button")
const gameWrapper = document.querySelector(".startGameWrapper")

const scoreInfo = document.querySelector('.scoreInfo')
const results = document.querySelector('.results')

const computerScore = document.querySelector('.humanScore')
const humanScore = document.querySelector('.computerScore')

const rockBtn = document.querySelector('.rock')
const paperBtn = document.querySelector('.paper')
const scissorsBtn = document.querySelector('.scissors')

const humanWeapon = document.querySelector('.humanWeapon')
const computerWeapon = document.querySelector('computerWeapon')
const weapons = document.querySelectorAll(".weapon")

const endgameModal = document.getElementById('endgameModal')
const endgameMsg = document.getElementById('endgameMsg')

const overlay = document.getElementById('overlay')
const restartBtn = document.getElementById('restartBtn')

rockBtn.addEventListener('click', () => {
    handleClick('rock')
    humanWeapon.innerHTML = innerHTMLOfRock;
})


paperBtn.addEventListener('click', () => handleClick('paper'))
scissorsBtn.addEventListener('click', () => handleClick('scissors'))

restartBtn.addEventListener('click', restartGame)
overlay.addEventListener('click', closeEndgameModal)


startGame.addEventListener('click', () => {
    gameWrapper.classList.toggle("displayNone")
});

let playerScore = 0
let randomScore = 0
let roundWinner = '';

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        roundWinner = 'tie'
    }
    if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'scissors' && computerSelection === 'paper') ||
        (playerSelection === 'paper' && computerSelection === 'rock')
    ) {
        playerScore++
        roundWinner = 'human'
    }
    if (
        (computerSelection === 'rock' && playerSelection === 'scissors') ||
        (computerSelection === 'scissors' && playerSelection === 'paper') ||
        (computerSelection === 'paper' && playerSelection === 'rock')
    ) {
        computerScore++
        roundWinner = 'computer'
    }
    updateScoreMessage(roundWinner, playerSelection, computerSelection)
}

// computer selection
function getRandomChoice() {
    let randomNumber = Math.floor(Math.random() * 3)
    switch (randomNumber) {
        case 0:
            return 'rock'
        case 1:
            return 'paper'
        case 2:
            return 'scissors'
    }
}

function isGameOver() {
    return playerScore === 5 || computerScore === 5
}


function handleClick(playerSelection) {
    // if (isGameOver()) {
    //     openEndgameModal()
    //     return
    // }

    const computerSelection = getRandomChoice()
    playRound(playerSelection, computerSelection)
    updateChoices(playerSelection, computerSelection)
    updateScore()

    if (isGameOver()) {
        openEndgameModal()
        setFinalMessage()
    }
}
const innerHTMLOfRock = rockBtn.innerHTML;

function updateChoices(playerSelection, computerSelection) {
    switch (playerSelection) {
        case 'rock':
            humanWeapon.innerHTML = innerHTMLOfRock;
            break
        case 'paper':
            playerSign.textContent = '✋'
            break
        case 'scissors':
            playerSign.textContent = '✌'
            break
    }

    switch (computerSelection) {
        case 'rock':
            computerWeapon.innerHTML = '✊'
            break
        case 'paper':
            computerSign.textContent = '✋'
            break
        case 'scissors':
            computerSign.textContent = '✌'
            break
    }
}

function updateScore() {
    if (roundWinner === 'tie') {
        results.textContent = "It's a tie!"
    } else if (roundWinner === 'player') {
        results.textContent = 'You won!'
    } else if (roundWinner === 'computer') {
        results.textContent = 'You lost!'
    }

    humanScore.textContent = `Player: ${playerScore}`
    computerScore.textContent = `Computer: ${computerScore}`
}

function updateScoreMessage(winner, playerSelection, computerSelection) {
    if (winner === 'player') {
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

    scoreMessage.textContent = `${capitalizeFirstLetter(
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

function closeEndgameModal() {
    endgameModal.classList.remove('active')
    overlay.classList.remove('active')
}

function setFinalMessage() {
    return playerScore > computerScore
        ? (endgameMsg.textContent = 'You won!')
        : (endgameMsg.textContent = 'You lost...')
}

function restartGame() {
    humanScore = 0
    computerScore = 0
    playerScore.textContent = 'Player: 0'
    computerScore.textContent = 'Computer: 0'
    humanWeapon.textContent = '❔'
    computerWeapon.textContent = '❔'
    endgameModal.classList.remove('active')
    overlay.classList.remove('active')
}