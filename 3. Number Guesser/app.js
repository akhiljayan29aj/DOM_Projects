// GAME FUNCTION:
// - Player must guess a number between min and max.
// - Player gets a certain amount of guesses.
// - Notify player of the guesses remaining.
// - Notify the player of the correct answer if loose
// - Let player choose to play again.

// Game Values
let min = 1,
    max = 10,
    winningNum = 2,
    guessesLeft = 3;


// UI Vars
const game = document.querySelector('#game'),
      guessInput = document.getElementById('guess-input'),
      guessBtn = document.getElementById('guess-btn'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      message = document.querySelector('.message');


// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  // Validate
  if(isNaN(guess) || guess < min || guess > max){
    setMesaage(`Please enter a number between ${min} & ${max}.`, 'red');
  }

  // Check if Won
  if(guess === winningNum){
    // Game Over - Win
    gameOver(`${winningNum} is the correct guess. You Win.`, 'green', 'green', true);
  } else {
    
    guessesLeft -= 1;

    if(guessesLeft === 0){
      // Game Over - Lose
      gameOver(`No guesses left, you Lost. Correct number was ${winningNum}.`, 'red', 'red', true);

    } else {
      // Game Continues - answer wrong

      // Clear Input
      guessInput.value = '';

      gameOver(`Wrong guess. ${guessesLeft} guesses left.`, 'red', 'red', false);
    }
  }
});

// Game Over Function
function gameOver(msg,color,borderColour,inputDis){
  guessInput.disabled = inputDis;
  guessInput.style.borderColor = borderColour;
  setMesaage(msg, color);
}

// Set Message
function setMesaage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}