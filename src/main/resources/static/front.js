const setupScreen = document.getElementById("setup-screen");
const gameScreen  = document.getElementById("game-screen");

const playerCountInput = document.getElementById("playerCount");
const startBtn         = document.getElementById("startbtn");
const nextTurnBtn      = document.getElementById("nextturnBtn");
const log              = document.getElementById("log");

let playerCount = 0;

startBtn.addEventListener("click", async() => {
    playerCount = Number(playerCountInput.value);

    if(playerCount < 2 || playerCount > 6) {
        alert("Player count must be between 2 and 6.");
        return;
    }


    //send the player number to the server
    await fetch(`/start?p=${playerCount}`, { method: 'POST' });

    //change screens
    setupScreen.style.display = "none";
    gameScreen.style.display  = "block";
});

nextTurnBtn.addEventListener("click", async() => {
    const res  = await fetch("/turn");
    const data = await res.json();

    log.innerHTML +=
        `Player ${data.player} advanced to turn ${data.step}. 
            Current number: ${data.number}<br>`;

    if (data.gameOver){
        alert(`Player ${data.winner} wins the game!<br>`);
    }
});
