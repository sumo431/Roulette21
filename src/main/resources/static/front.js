const setupScreen = document.getElementById("setup-screen");
const gameScreen  = document.getElementById("game-screen");

const playerCountInput = document.getElementById("playerCount");
const startBtn = document.getElementById("startbtn");
const resetBtn = document.getElementById("resetBtn");

const log = document.getElementById("log");
const currentNumberDisplay = document.getElementById("numberDisplay");
const currentPlayerDisplay = document.getElementById("playerDisplay");

let playerCount = 0;

// ===== Start Game =====
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

    await nextPlayer();
});

// ===== Decide next player BEFORE pressing =====
async function nextPlayer() {
    const res = await fetch("/next");
    const data = await res.json();

    currentPlayerDisplay.textContent = `Player ${data.player}'s turn`;
    currentNumberDisplay.textContent = data.number;
}

// ===== Player chooses +1 +2 +3 =====
async function playTurn(step) {
    const res = await fetch(`/turn?step=${step}`);
    const data = await res.json();

    currentNumberDisplay.textContent = data.number;

    log.innerHTML +=
        `Player ${data.player} chose +${step}. Current number: ${data.number}<br>`;

    if (data.gameOver) {
        alert(`Player ${data.loser} said 21 and LOST!`);
        return;
    }

    await nextPlayer();
}

// ===== Reset =====
resetBtn.addEventListener("click", async () => {
    await fetch("/reset", { method: "POST" });

    setupScreen.style.display = "block";
    gameScreen.style.display = "none";
    log.innerHTML = "";
});
