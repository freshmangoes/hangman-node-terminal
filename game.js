const inquirer = require(`inquirer`);

// regex expression for checking whether something is a lower case letter
const letters = /^[a-z]+$/;

let guessedLetters = [];
let word = `Applejacks`;
let wordDisplayArray = [];


for(let i = 0; i < word.length; i++) {
  wordDisplayArray.push(`_`);
}

const game = async() => {
  console.log(wordDisplayArray.join(` `));
  try { 
    const guesses = await inquirer.prompt([
      {
        type: `input`,
        message: `Guess a letter!`,
        name: `guess`,
        validate: async input => {
          // validate if input is one letter, and a lower case letter
          if(input.length == 1 && letters.test(input)) {
            return true;
          } else {
            return console.log(`A guess must be one letter and a lower case letter!`);
          }
        }
      }
    ]);
    console.log(guesses.guess);

    // make the word to be compared to completely lower case for consistency
    let comparatorWord = word.toLowerCase();
    
    // if the letter is guessed correctly
    if(comparatorWord.includes(guesses.guess)) {
    
      // if there is only one occurance of letter
      if(comparatorWord.indexOf(guesses.guess) == comparatorWord.lastIndexOf(guesses.guess)) {
        // get the index of the letter guessed
        let index = comparatorWord.indexOf(guesses.guess);

        // update wordDisplayArray[]
        wordDisplayArray[index] = guesses.guess;

      } else { // for multiple occurances of letter
        
        // array for indicies
        let indicies = [];
        
        // iterate through find indicies where the letter is contained
        for(let i = 0; i < comparatorWord.length; i++) {
          
          // checking each letter against the guess
          if(comparatorWord[i] === guesses.guess) {
            
            // push index to indicies[]
            indicies.push(i);
          }
        }
  
        // iterate through indicies to update wordDisplayArray[]
        for(let i = 0; i < indicies.length; i++) {
          let index = indicies[i];
          wordDisplayArray[index] = guesses.guess;
        }

      }
    }
    // if guessedLetters[] does not contain the guessed letter
    if(!guessedLetters.includes(guesses.guess)) {
      guessedLetters.push(guesses.guess);
    } else { // if the letter is already in guessedLetters[]
      console.log(`You've already guessed this letter!`);
    }
  } catch (error) {
    console.log(error);
  }

  // win condition - works, test for fringe cases
  if(!wordDisplayArray.includes(`_`)) {
    return console.log(`You won!`);
  }

  // display guessed letters
  console.log(`Guessed letters: ${guessedLetters.sort().join(` `)}`);
  game();
}

game();
