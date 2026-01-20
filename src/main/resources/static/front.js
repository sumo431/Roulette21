const setupScreen = document.getElementById("setup-screen");
const gameScreen  = document.getElementById("game-screen");

const playerCountInput = document.getElementById("playerCount");
const startBtn = document.getElementById("startbtn");
const resetBtn = document.getElementById("resetBtn");

const nameInputsDiv = document.getElementById("nameInputs");
const log = document.getElementById("log");
const currentNumberDisplay = document.getElementById("numberDisplay");
const currentPlayerDisplay = document.getElementById("playerDisplay");

let playerCount = 0;

//Change the number of people & name input fields
playerCountInput.addEventListener("change", () => {
    nameInputsDiv.innerHTML = "";
    const count = Number(playerCountInput.value);

    for (let i = 1; i <= count; i++) {
        const input = document.createElement("input");
        input.placeholder = `Player ${i}`;
        input.id = `playerName${i}`;
        input.style.margin = "5px";
        nameInputsDiv.appendChild(input);
        nameInputsDiv.appendChild(document.createElement("br"));
    }
});

// ===== Start Game =====
startBtn.addEventListener("click", async () => {
    playerCount = Number(playerCountInput.value);

    if (playerCount < 2 || playerCount > 6) {
        alert("Player count must be between 2 and 6.");
        return;
    }

    //name (if it is empty it will be playerX)
    const names = [];
    for (let i = 1; i <= playerCount; i++) {
        const value = document.getElementById(`playerName${i}`).value.trim();
        names.push(value === "" ? `Player ${i}` : value);
    }

    await fetch("/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(names)
    });

    setupScreen.style.display = "none";
    gameScreen.style.display = "block";
    log.innerHTML = "";

    await nextPlayer();
});

// ===== Decide next player =====
async function nextPlayer() {
    const res = await fetch("/next");
    const data = await res.json();

    currentPlayerDisplay.textContent = `${data.playerName}'s turn`;
    currentNumberDisplay.textContent = data.number;
}

// ===== Play =====
async function playTurn(step) {
    const res = await fetch(`/turn?step=${step}`);
    const data = await res.json();

    currentNumberDisplay.textContent = data.number;

    log.innerHTML +=
        `${data.playerName} chose +${step}. Current number: ${data.number}<br>`;

    if (data.gameOver) {
        alert(`${data.loserName} said 21 and LOST!`);
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
