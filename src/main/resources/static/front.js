const setupScreen = document.getElementById("setup-screen");
const gameScreen  = document.getElementById("game-screen");

const playerCountInput = document.getElementById("playerCount");
const startBtn = document.getElementById("startbtn");
const resetBtn = document.getElementById("resetBtn");
const log = document.getElementById("log");

let playerCount = 0;

// Start Game
startBtn.addEventListener("click", async () => {
    playerCount = Number(playerCountInput.value);

    if (playerCount < 2 || playerCount > 6) {
        alert("Player count must be between 2 and 6.");
        return;
    }

    await fetch(`/start?p=${playerCount}`, { method: "POST" });

    setupScreen.style.display = "none";
    gameScreen.style.display = "block";
    log.innerHTML = "";
});

// Play Turn (+1, +2, +3)
async function playTurn(step) {
    const res = await fetch(`/turn?step=${step}`);
    const data = await res.json();

    log.innerHTML +=
        `Player ${data.player} advanced by ${step}. 
     Current number: ${data.number}<br>`;


    if (data.gameOver) {
        alert(`Player ${data.loser} said 21 and LOST!`);
    }

}

// Reset Game
resetBtn.addEventListener("click", async () => {
    await fetch("/reset", { method: "POST" });

    setupScreen.style.display = "block";
    gameScreen.style.display = "none";
    log.innerHTML = "";
});
