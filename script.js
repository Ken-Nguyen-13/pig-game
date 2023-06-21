'use strict';

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const diceEl = document.querySelector('.dice');
const player0 = document.querySelector(`.player--0`)
const player1 = document.querySelector(`.player--1`)

score0El.textContent = 0; // Sets scores to 0
score1El.textContent = 0;

diceEl.classList.add('hidden'); // Hides dice

let currentPlayer = 0;
let currentScore = 0;
let playerWon = false;

btnRoll.addEventListener('click', function () {
  // Code for the roll btn
  const diceValue = Math.trunc(Math.random() * 6) + 1; //Creates random dice value
  diceEl.classList.remove('hidden'); // Displays dice
  diceEl.src = `dice-${diceValue}.png`; // Sets dice image to matching number
  if (playerWon === false) {
    if (diceValue !== 1) {
      // If Dice is not 1
      currentScore += diceValue; // Updates current score
      currentPlayer === 0
        ? (current0El.textContent = currentScore)
        : (current1El.textContent = currentScore); // Checks which players current score to update
    } else {
      //If dice is 1 (A lot of code borrowed from the btnHold function)
      player0.classList.toggle('player--active'); // Removes "player--active" from the current player
      player1.classList.toggle('player--active'); // Adds "player--active" to the new current player
      currentPlayer = currentPlayer === 0 ? 1 : 0; // Switches current player
      current0El.textContent = 0; // Resets current
      current1El.textContent = 0;
      currentScore = 0;
    }
  }
});

btnHold.addEventListener('click', function () {
  // Code for the hold btn
  let score = Number(
    currentPlayer === 0 ? score0El.textContent : score1El.textContent
  );
  if (currentPlayer === 0) {
    // Checks which player's score to update
    score0El.textContent = score += Number(current0El.textContent); // Updates player 0's score
  } else {
    score1El.textContent = score += Number(current1El.textContent); // Updates player 1's score
  }
  if (
    Number(currentPlayer === 0 ? score0El.textContent : score1El.textContent) >=
    100
  ) {
    // Checks if either player won (playerScore > 100)
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add('player--winner');
    currentScore = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    playerWon = true;
  } else {
    // If player didn't win
    player0.classList.toggle('player--active'); // Removes "player--active" from the current player
    player1.classList.toggle('player--active'); // Adds "player--active" to the new current player
    currentPlayer = currentPlayer === 0 ? 1 : 0; // Switches currentPlayer value
    current0El.textContent = 0; // Resets current scores
    current1El.textContent = 0;
    currentScore = 0;
  }
});

btnNew.addEventListener('click', function () {
  // Code for the new game btn
  diceEl.classList.add('hidden'); // Hides dice
  score0El.textContent = 0; // Resets scores and currents
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentScore = 0;
  currentPlayer = 0;
  playerWon = false; // Sets playerWon to false
  player0.classList.remove('player--winner'); // Removes player winner from player 0
  player1.classList.remove('player--winner'); // Removes player winner from player 1
  document.querySelector('.player--1').classList.remove('player--active'); // Removes player--active from player 1
  document.querySelector('.player--0').classList.add('player--active'); // Adds player--active to player 1
});
