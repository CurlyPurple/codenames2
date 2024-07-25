/*-------------------------------- Constants --------------------------------*/
const wordPool = ["MYTH","PUZZLE","VILLAIN","MYSTERY","TREASURE","DRAGON","DREAM","LOVE","THUNDER","WALLET","TRAIN","MIRROR","CLOUD","GARDEN","METAL","MICROWAVE","RADIO","INTERNET","MUSIC","MUSEUM","CONCERT","BIRTHDAY","DESTINY","MOUNTAIN","PIRATE","VOLCANO","PYRAMID","COMPASS","GALAXY","SCIENTIST","BLOOD","SPY","MYSTERY","CRIME","GHOST","VAMPIRE","CEMETERY","DIAMOND","MUTINY","CASTAWAY","MARSHMALLOW","TREEHOUSE","KITE","CLOWN","ILLUSION","JOKER","PLUTO","MAGNET","PARTICLE","FUSION","EQUATION","CHAOS","AVATAR","VIRUS","ARMOR","WAR","MEMORY","BITCOIN","INTEREST","BANK","CIGARETTE","OCEAN"]


/*---------------------------- Variables (state) ----------------------------*/

let wordsForGame = []
let winningWords = []
let bystanderWords = []
let assassinWords = []
let userRole = "SPYMASTER"
let currentGuesses = []

/*------------------------ Cached Element References ------------------------*/
const cardEls = document.querySelectorAll(".card")
const toggleBtn = document.getElementById('togglebtn')
const playAgainBtn = document.getElementById('reset')


/*-------------------------------- Functions --------------------------------*/



/*----------------------------- Event Listeners -----------------------------*/
playAgainBtn.addEventListener('click', start)
toggleBtn.addEventListener('click', switchUsers)


init()
function init() {
    currentGuesses = []
    wordsForGame = []
    winningWords = []
    bystanderWords = []
    assassinWords = []
    cardEls.forEach((card, idx) => {
        cardEls[idx].textContent = ''
        cardEls[idx].style.backgroundColor = "white";
    })
    if (playAgainBtn.textContent === "Play Again?") {
        playAgainBtn.textContent = "START"
        playAgainBtn.removeEventListener('click', init)
        playAgainBtn.addEventListener('click', start)
    }
    userRole = "SPYMASTER"
    toggleBtn.textContent = "SPYMASTER"
}

function start() {
    if (playAgainBtn.textContent === "START") {
    playAgainBtn.innerHTML = "Play Again?"
    playAgainBtn.removeEventListener('click', start)
    playAgainBtn.addEventListener('click', init)
    }
    pullGameWords()
    assignGameWords()
    displayGameWords()
    switchUsers()
    cardAction()
}

function pullGameWords() {
    while (wordsForGame.length < 16) {
        let randomIndex = Math.floor(Math.random() * wordPool.length)
        if (!wordsForGame.includes(wordPool[randomIndex])) {
            wordsForGame.push(wordPool[randomIndex])
        }
    }
}

function assignGameWords() {
    while (winningWords.length + bystanderWords.length + assassinWords.length < 16) {
        let randomIndex = Math.floor(Math.random() * wordsForGame.length)
        if (!winningWords.includes(wordsForGame[randomIndex]) && winningWords.length < 8) {
            winningWords.push(wordsForGame[randomIndex])
        } else if (!bystanderWords.includes(wordsForGame[randomIndex]) && !winningWords.includes(wordsForGame[randomIndex]) && bystanderWords.length < 7) {
            bystanderWords.push(wordsForGame[randomIndex])
        } else if (!winningWords.includes(wordsForGame[randomIndex]) && !bystanderWords.includes(wordsForGame[randomIndex])) {
            assassinWords.push(wordsForGame[randomIndex])
        }
    }
}

function displayGameWords() {
    cardEls.forEach((card, idx) => {
        cardEls[idx].textContent = wordsForGame[idx]
        if (winningWords.includes(wordsForGame[idx])) {
            cardEls[idx].style.backgroundColor = "#71B340";
            cardEls[idx].style.color = "white";
        } else if (bystanderWords.includes(wordsForGame[idx])) {
            cardEls[idx].style.backgroundColor = "#F24236";
            cardEls[idx].style.color = "white";
         } else if (assassinWords.includes(wordsForGame[idx])) {
            cardEls[idx].style.backgroundColor = "#2B2D42"
            cardEls[idx].style.color = "white";
        }
     })
    }
     
function switchUsers() {
    if (userRole === "SPYMASTER") {
        userRole = "GUESSER"
        toggleBtn.textContent = `${userRole}`
        guesserRole()
    } else if (userRole === "GUESSER") {
        userRole = "SPYMASTER"
        toggleBtn.textContent = `${userRole}`
        spymasterRole()
    }
}

function spymasterRole() {
        cardEls.forEach((card, idx) => {
            cardEls[idx].textContent = wordsForGame[idx]
            if (winningWords.includes(wordsForGame[idx])) {
                cardEls[idx].style.backgroundColor = "#71B340";
                cardEls[idx].style.color = "white";
            } else if (bystanderWords.includes(wordsForGame[idx])) {
                cardEls[idx].style.backgroundColor = "#F24236";
                cardEls[idx].style.color = "white";
             } else if (assassinWords.includes(wordsForGame[idx])) {
                cardEls[idx].style.backgroundColor = "#2B2D42"
                cardEls[idx].style.color = "white";
            }
         })
    }

function guesserRole() {
        cardEls.forEach((card, idx) => {
            if (!currentGuesses.includes(idx)) {
            cardEls[idx].textContent = wordsForGame[idx]
            cardEls[idx].style.backgroundColor = "white";
            cardEls[idx].style.color = "black";
            } else if (currentGuesses.includes(idx) && bystanderWords.includes(wordsForGame[idx])) {
                    cardEls[idx].style.backgroundColor = "#F24236";
                    cardEls[idx].style.color = "white";
            } else if (currentGuesses.includes(idx) && winningWords.includes(wordsForGame[idx])) {
                    cardEls[idx].style.backgroundColor = "#71B340";
                    cardEls[idx].style.color = "white";
            }
        })
    }

function cardAction() {
    cardEls.forEach((card, idx) => {
        cardEls[idx].addEventListener('click', pickResult)
    })
}

function pickResult(event) {
    pickedCard = parseInt(event.target.id)
    if (assassinWords.includes(wordsForGame[pickedCard])) {
        cardEls[pickedCard].style.backgroundColor = "#2B2D42";
        cardEls[pickedCard].textContent = "Game Over!"
        cardEls[pickedCard].style.color = "white";
    } else if (bystanderWords.includes(wordsForGame[pickedCard])) {
        cardEls[pickedCard].style.backgroundColor = "#F24236";
        cardEls[pickedCard].style.color = "white";
        currentGuesses.push(pickedCard)
    } else if (winningWords.includes(wordsForGame[pickedCard])) {
        cardEls[pickedCard].style.backgroundColor = "#71B340";
        cardEls[pickedCard].style.color = "white";
        currentGuesses.push(pickedCard)

    }
}