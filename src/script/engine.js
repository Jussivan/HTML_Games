const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values:{
        gameVelocity: 1027,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions:{
        timerId: setInterval(RandomSquare, 1027),
        countDownTimerId: setInterval(countDown, 1027),
    },
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
        location.reload();
    }
}

function playSound() {
    let audio = new Audio();
}

function RandomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let RandomNumber = Math.floor(Math.random() * 9);
    let RandomSquare = state.view.squares[RandomNumber];
    RandomSquare.classList.add("enemy");
    state.values.hitPosition = RandomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
            }
        });
    });
}

function initialize() {
    addListenerHitBox();
}

initialize();