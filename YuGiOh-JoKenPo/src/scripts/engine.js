const state = {
    score:{
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_box"),
    },
    cardSprites:{
        avatar: document.getElementById("card_image"),
        name: document.getElementById("card_name"),
        type: document.getElementById("card_type"),
        status: document.getElementById("status"),
    },
    fieldCards:{
        player: document.getElementById("player_infield_card"),
        computer: document.getElementById("computer_infield_card"),
    },
    button: document.getElementById("next_duel"),
};

const playerSides = {
    player1: "player_cards",
    computer: "computer_cards",
};

const cardData = [
    {
        id:0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: "./src/assets/icons/dragon.png",
        winOf: [1],
        loseOf: [2],
        status: [3000,2500],
    },
    {
        id:1,
        name: "Exodia",
        type: "Rock",
        img: "./src/assets/icons/exodia.png",
        winOf: [2],
        loseOf: [0],
        status: ["9999","9999"],
    },
    {
        id:2,
        name: "Dark Magician",
        type: "Scissors",
        img: "./src/assets/icons/magician.png",
        winOf: [0],
        loseOf: [1],
        status: [2500,2100],
    },
];

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function createCardImage(IdCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", IdCard);
    cardImage.classList.add("card");

    if(fieldSide===playerSides.player1) {
        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        });

        cardImage.addEventListener("mouseover", () => {
            drawSelectCard(IdCard);
        });
    }

    return cardImage;
}

async function setCardsField(cardId) {
    await removeAllCardsImages();
    let computerCardId = await getRandomCardId();
    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";

    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;

    let duelResults = await checkDuelResults(cardId, computerCardId);

    await drawButton(duelResults);
    await updateScore();
}

async function drawButton(duelResults) {
    let originalText = duelResults;
    state.button.innerText = duelResults;
    state.button.style.display = "block";

    var isClicked = false;
    state.button.addEventListener("click", () => {
        isClicked = true;
    });
}

async function updateScore() {
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

async function checkDuelResults(playerCardId, computerCardId) {
    let duelResults = "DRAW";
    let playerCard = cardData[playerCardId];

    if (playerCard.winOf.includes(computerCardId)) {
        duelResults = "YOU WIN";
        await playAudio(duelResults);
        state.score.playerScore++;
    } else if (playerCard.loseOf.includes(computerCardId)) {
        duelResults = "YOU LOSE";
        await playAudio(duelResults);
        state.score.computerScore++;
    }

    return duelResults;
}

async function removeAllCardsImages() {
    let cards = document.querySelector("#computer_cards");
    let imgElements = cards.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    cards = document.querySelector("#player_cards");
    imgElements = cards.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
}

async function drawSelectCard(id) {
    state.cardSprites.avatar.src = cardData[id].img;
    state.cardSprites.name.innerText = cardData[id].name;
    state.cardSprites.type.innerText = "Attibute: " + cardData[id].type;
    state.cardSprites.status.innerText = "ATK / " + cardData[id].status[0] + " DEF / " + cardData[id].status[1];
}

async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

async function resetDuel() {
    state.cardSprites.avatar.src = "";
    state.button.style.display = "none";

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    state.cardSprites.name.innerText = "";
    state.cardSprites.type.innerText = "";
    state.cardSprites.status.innerText = "";

    init();
}

async function playAudio(duelResults) {
    winAudio = new Audio("./src/assets/audios/win.wav");
    winAudio.volume = 0.25;
    loseAudio = new Audio("./src/assets/audios/lose.wav");
    loseAudio.volume = 0.25;

    if(duelResults==="YOU WIN") {
        winAudio.play();
    } else if (duelResults==="YOU LOSE") {
        loseAudio.play();
    }
    
}

async function playMusic() {
        const bgm = document.getElementById("bgm");
        bgm.volume = 0.5;
        bgm.play();
}

function init() {
    playMusic();
    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);
}

init();