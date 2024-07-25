/*-------------------------------- Constants --------------------------------*/
const wordPool = ["MYTH","PUZZLE","VILLAIN","MYSTERY","TREASURE","DRAGON","DREAM","LOVE","THUNDER","WALLET","TRAIN","MIRROR","CLOUD","GARDEN","METAL","MICROWAVE","RADIO","INTERNET","MUSIC","MUSEUM","CONCERT","BIRTHDAY","DESTINY","MOUNTAIN","PIRATE","VOLCANO","PYRAMID","COMPASS","GALAXY","SCIENTIST","BLOOD","SPY","MYSTERY","CRIME","GHOST","VAMPIRE","CEMETERY","DIAMOND","MUTINY","CASTAWAY","MARSHMALLOW","TREEHOUSE","KITE","CLOWN","ILLUSION","JOKER","PLUTO","MAGNET","PARTICLE","FUSION","EQUATION","CHAOS","AVATAR","VIRUS","ARMOR","WAR","MEMORY","BITCOIN","INTEREST","BANK","CIGARETTE","OCEAN"]


/*---------------------------- Variables (state) ----------------------------*/

let round = 1
let wordsLeft = 8
let gameOver = false
let endRound = false
let wordsForGame = []
let winningWords = []
let bystanderWords = []
let assassinWords = []
let userRole = "SPYMASTER"

/*------------------------ Cached Element References ------------------------*/
const cardEls = document.querySelectorAll(".card")
const toggleBtn = document.getElementById('togglebtn')



/*-------------------------------- Functions --------------------------------*/



/*----------------------------- Event Listeners -----------------------------*/


init()
function init() {
    cardEls.forEach((card, idx) => {
        cardEls[idx].textContent = ''
    })
    round = 1
    wordsLeft = 8
    gameOver = false
    endRound = false
}

// function pullGameWords() {
    while (wordsForGame.length < 16) {
        let randomIndex = Math.floor(Math.random() * wordPool.length)
        if (!wordsForGame.includes(wordPool[randomIndex])) {
            wordsForGame.push(wordPool[randomIndex])
        }
    }

console.log(wordsForGame);

// function assignGameWords() {
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
    console.log(winningWords);
        console.log(bystanderWords);
        console.log(assassinWords);

// function displayGameWords() {
    cardEls.forEach((card, idx) => {
        cardEls[idx].textContent = wordsForGame[idx]
            console.log(wordsForGame[idx]);
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
     
     toggleBtn.addEventListener('click', switchUsers)
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
            cardEls[idx].textContent = wordsForGame[idx]
     })
    }
