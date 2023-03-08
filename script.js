'use strict';

// Selecting Element

const score1El = document.querySelector('#score--0');
const score2El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnRolldice = document.querySelector('.btn--roll');
const btnNewGame = document.querySelector('.btn--new');
const btnHoldScore = document.querySelector('.btn--hold');
const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');
let currentScorePlayer1 = document.querySelector('#current--0');
let currentScorePlayer2 = document.querySelector('#current--1');
let activePlayer, currentScore, playingState, score;

// implement variable

//Creating  a function
const init = function () {
  score = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playingState = true;
  score1El.textContent = 0;
  score2El.textContent = 0;
  currentScorePlayer1.textContent = 0;
  currentScorePlayer2.textContent = 0;

  diceEl.classList.add('hidden');
  player1El.classList.add('player--active');
  player2El.classList.remove('player--active');
  player1El.classList.remove('player--winner');
  player2El.classList.remove('player--winner');
};

init();
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  if (player1El.classList.contains('player--active')) {
    player1El.classList.remove('player--active');
    player2El.classList.add('player--active');
  } else {
    player1El.classList.add('player--active');
    player2El.classList.remove('player--active');
  }
};

btnRolldice.addEventListener('click', function () {
  // Generate Random Number
  if (playingState) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    //Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //check for rolled 1 ,if true, switch to next player
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Adding  Event Listener  to button  Hold

btnHoldScore.addEventListener('click', function () {
  //Adding  current  score to  the total
  if (playingState) {
    score[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];

    //Check if score >= 100
    if (score[activePlayer] >= 50) {
      //Finished the game
      playingState = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    }
    //Switch  to next  Player
    else {
      switchPlayer();
    }
  }
});
btnNewGame.addEventListener('click', init);
