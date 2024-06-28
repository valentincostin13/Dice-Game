"use strict";

let scoreCurrent1 = 0;
let scoreCurrent2 = 0;
let scoreTotal1 = 0;
let scoreTotal2 = 0;

const getADice = function () {
  let randomNumber = Math.floor(Math.random() * 6) + 1;
  console.log(`Random Number: ${randomNumber}`);
  console.log(`Setting image src to: ./images/dice-${randomNumber}.png`);
  document.querySelector(".dice").src = `./images/dice-${randomNumber}.png`;
  if (randomNumber == 1) {
    scoreCurrent1 = 0;
    scoreCurrent2 = 0;
    setScore();
  } else {
    if (
      document.querySelector(".player--0").classList.contains("player--active")
    ) {
      scoreCurrent1 += randomNumber;
      document.querySelector("#current--0").textContent = scoreCurrent1;
    } else {
      scoreCurrent2 += randomNumber;
      document.querySelector("#current--1").textContent = scoreCurrent2;
    }
  }
};

const setScore = function () {
  if (
    document.querySelector(".player--0").classList.contains("player--active")
  ) {
    scoreTotal1 += scoreCurrent1;
    document.querySelector("#score--0").textContent = scoreTotal1;
    checkScore(scoreTotal1);
    scoreCurrent1 = 0;
    document.querySelector("#current--0").textContent = scoreCurrent1;
    changeFocus();
  } else {
    scoreTotal2 += scoreCurrent2;
    document.querySelector("#score--1").textContent = scoreTotal2;
    checkScore(scoreTotal2);
    scoreCurrent2 = 0;
    document.querySelector("#current--1").textContent = scoreCurrent2;
    changeFocus();
  }
};

const newGame = function () {
  scoreCurrent1 = 0;
  scoreCurrent2 = 0;
  scoreTotal1 = 0;
  scoreTotal2 = 0;
  document.querySelector("#score--0").textContent = scoreTotal1;
  scoreCurrent1 = 0;
  document.querySelector("#current--0").textContent = scoreCurrent1;
  document.querySelector("#score--1").textContent = scoreTotal2;
  scoreCurrent1 = 0;
  document.querySelector("#current--1").textContent = scoreCurrent2;
  const firstPlayerFocus = document.querySelector(".player--0");
  firstPlayerFocus.classList.add("player--active");
  const secondPlayerFocus = document.querySelector(".player--1");
  secondPlayerFocus.classList.remove("player--active");
  document.querySelector("h1").textContent = "";
};
document.querySelector(".btn--roll").addEventListener("click", getADice);
document.querySelector(".btn--hold").addEventListener("click", setScore);
document.querySelector(".btn--new").addEventListener("click", newGame);

async function checkScore(score) {
  if (score >= 10)
    if (
      document.querySelector(".player--0").classList.contains("player--active")
    ) {
      document.querySelector("h1").textContent = "The winner is Player1";
      await sleep(2000);
      newGame();
    } else {
      document.querySelector("h1").textContent = "The winner is Player2";
      await sleep(2000);
      newGame();
    }
}

function changeFocus() {
  if (
    document.querySelector(".player--0").classList.contains("player--active")
  ) {
    const firstPlayerFocus = document.querySelector(".player--0");
    firstPlayerFocus.classList.remove("player--active");
    const secondPlayerFocus = document.querySelector(".player--1");
    secondPlayerFocus.classList.add("player--active");
  } else {
    const firstPlayerFocus = document.querySelector(".player--0");
    firstPlayerFocus.classList.add("player--active");
    const secondPlayerFocus = document.querySelector(".player--1");
    secondPlayerFocus.classList.remove("player--active");
  }
}

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
