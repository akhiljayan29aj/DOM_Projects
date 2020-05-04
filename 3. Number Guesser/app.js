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
    // Disable Input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = 'green';
    // Set message
    setMesaage(`${winningNum} is the correct guess. You Win.`, 'green');
  }
});

// Set Message
function setMesaage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}