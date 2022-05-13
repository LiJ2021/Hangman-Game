/*Instructions:
You are tasked with building Hangman! The application should allow a user to: select a category, view the number of lives they have left, submit a guess, receive a hint, and just play a game of hangman! 

tweaked from original source - https://jsfiddle.net/phollott/x29ym2ag/ */

function pickWord(category,randomAnimals, randomFruits){
  let currentWord
  if (category === "Animal"){
    currentWord = randomAnimals[Math.floor(Math.random() * randomAnimals.length)];}
  else {
      currentWord = randomFruits[Math.floor(Math.random() * randomFruits.length)];}
return currentWord
}
//asking user to select a category
function selectCategory() {

    // let category = document.querySelector("button").value
    // console.log(category);
       let category = document.querySelector("input[name=category]:checked").value;
        console.log(category);

        alert(`You chose the ${category} Category. Lets Play! `)
        setup(category)
    }
    

  "use strict";
  let availableLetters, category, randomAnimals, randomFruits, guessInput, guess, guessButton, lettersGuessed, lettersMatched, output, man, letters, lives, currentWord, numLettersMatched, messages;

  function setup(category) {
    /* start config options */
    availableLetters = "abcdefghijklmnopqrstuvwxyz";
    lives = 6;
    randomAnimals = ['woodchuck', 'orangutang', 'tarantula', 'dachshund', 'cryptoclidus', 'bumblebee', 'chimpanzee'];
    randomFruits = ['persimmon', 'sapodilla', 'mangosteen', 'jackfruit', 'papaya', 'breadfruit', 'cherimoya', 'lychee'];
    /* messages object */
    messages = {
      win: 'You win!',
      lose: 'Game over!',
      guessed: ' already guessed, please try again...',
      validLetter: 'Please enter a letter from A-Z'
    };
    /* end config options */

    lettersGuessed = lettersMatched = '';
    numLettersMatched = 0;

    /* choose a word */

    
    currentWord = pickWord(category,randomAnimals, randomFruits)
    

      console.log(currentWord)

    /* make #man and #output blank, create lets for later access */
    output = document.getElementById("output");
    man = document.getElementById("man");
    guessInput = document.getElementById("letter");

    man.innerHTML = 'You have ' + lives + ' lives remaining';
    output.innerHTML = '';

    document.getElementById("letter").value = '';

    /* make sure guess button is enabled */
    guessButton = document.getElementById("guess");
    guessInput.style.display = 'inline';
    guessButton.style.display = 'inline';

    /* set up display of letters in current word */
    letters = document.getElementById("letters");
    letters.innerHTML = '<li class="current-word">Current word:</li>';

    let letter, i;
    for (i = 0; i < currentWord.length; i++) {
      letter = '<li class="letter letter' + currentWord.charAt(i).toUpperCase() + '">' + currentWord.charAt(i).toUpperCase() + '</li>';
      letters.insertAdjacentHTML('beforeend', letter);
    }
  }

  function gameOver(win) {
    if (win) {
      output.innerHTML = messages.win;
      output.classList.add('win');
    } else {
      output.innerHTML = messages.lose;
      output.classList.add('error');
    }

    guessInput.style.display = guessButton.style.display = 'none';
    guessInput.value = '';
  }

  /* Start game - should ideally check for existing functions attached to window.onload */
  window.onload = setup();

  /* buttons */
  document.getElementById("restart").onclick = setup;

  /* reset letter to guess on click */
  guessInput.onclick = function() {
    this.value = '';
  };

  /* main guess function when user clicks #guess */
  document.getElementById('hangman').onsubmit = function(e) {
    if (e.preventDefault) e.preventDefault();
    output.innerHTML = '';
    output.classList.remove('error', 'warning');
    guess = guessInput.value;

    /* does guess have a value? if yes continue, if no, error */
    if (guess) {
      /* is guess a valid letter? if so carry on, else error */
      if (availableLetters.indexOf(guess) > -1) {
        /* has it been guessed (missed or matched) already? if so, abandon & add notice */
        if ((lettersMatched && lettersMatched.indexOf(guess) > -1) || (lettersGuessed && lettersGuessed.indexOf(guess) > -1)) {
          output.innerHTML = '"' + guess.toUpperCase() + '"' + messages.guessed;
          output.classList.add("warning");
        }
        /* does guess exist in current word? if so, add to letters already matched, if final letter added, game over with win message */
        else if (currentWord.indexOf(guess) > -1) {
          let lettersToShow;
          lettersToShow = document.querySelectorAll(".letter" + guess.toUpperCase());

          for (let i = 0; i < lettersToShow.length; i++) {
            lettersToShow[i].classList.add("correct");
          }

          /* check to see if letter appears multiple times */
          for (let j = 0; j < currentWord.length; j++) {
            if (currentWord.charAt(j) === guess) {
              numLettersMatched += 1;
            }
          }

          lettersMatched += guess;
          if (numLettersMatched === currentWord.length) {
            gameOver(true);
          }
        }
        /* guess doesn't exist in current word and hasn't been guessed before, add to lettersGuessed, reduce lives & update user */
        else {
          lettersGuessed += guess;
          lives--;
          man.innerHTML = 'You have ' + lives + ' lives remaining';
          if (lives === 0) gameOver();
        }
      }
      /* not a valid letter, error */
      else {
        output.classList.add('error');
        output.innerHTML = messages.validLetter;
      }
    }
    /* no letter entered, error */
    else {
      output.classList.add('error');
      output.innerHTML = messages.validLetter;
    }
    return false;
  };

