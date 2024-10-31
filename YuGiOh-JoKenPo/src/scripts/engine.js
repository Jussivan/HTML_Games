const state = {
    score:{
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites:{
        avatar: document.getElementById("card_image"),
        name: document.getElementById("card_name"),
        type: document.getElementById("card_type"),
    },
    fieldCards:{
        player: document.getElementById("player_field_card"),
        computer: document.getElementById("computer_field_card"),
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
    },
    {
        id:1,
        name: "Exodia",
        type: "Rock",
        img: "./src/assets/icons/exodia.png",
        winOf: [2],
        loseOf: [0],
    },
    {
        id:2,
        name: "Dark Magician",
        type: "Scissors",
        img: "./src/assets/icons/magician.png",
        winOf: [0],
        loseOf: [1],
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
    }

    cardImage.addEventListener("mouseover", () => {
        drawSelectCard(IdCard);
    });

    return cardImage;
}

async function drawSelectCard(id) {
    state.cardSprites.avatar.src = cardData[id].img;
    state.cardSprites.name.innerText = cardData[id].name;
    state.cardSprites.type.innerText = "Attibute: " + cardData[id].type;
}

async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

function init() {
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);
}

init();