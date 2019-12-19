const inquirer = require(`inquirer`);
const Word = require(`./word`);
const fs = require(`mz/fs`);

const letters = /^[a-z]+$/;

let guessedLetters = [];
let guesses = 0;

// takes in a path to a text file with words in it
const chooseWord = async txtFile => {
	try {
		// reads in file as a string
		let fileWords = await fs.readFile(txtFile, `utf8`);
		// separates words by new line
		fileWords = fileWords.split(`\n`);
		// selects a pseudorandom index to get a word
		return (word = fileWords[Math.floor(Math.random() * fileWords.length)]);
	} catch (e) {
		console.log(e);
	}
};

const newGame = async () => {
  // getting game word
  const str = await chooseWord(`./words.txt`);
  // setting number of guesses
	guesses = 5 + str.length;
	// creating new word object
	const wordObj = new Word(str);
	await runPrompt(wordObj);
};

const runPrompt = async (gameWord, lastGuess = ``) => {
	try {
		const prompt = await inquirer.prompt([
			{
				type: `input`,
				message: `Guess a letter! ${lastGuess}`,
				name: `guess`,
				validate: async input => {
					// validate if input is one letter, and a lower case letter
					if (input.length == 1 && letters.test(input)) {
						return true;
					} else {
						return console.log(
							`A guess must be one letter and a lower case letter!`
						);
					}
				}
			}
    ]);
    // runs a check to see if the letter was already guessed
    if(!guessedLetters.includes(prompt.guess)) {
      // push guess to guessedLetters []
      guessedLetters.push(prompt.guess);
  
      // checking if letter was a correct guess
      if (word.includes(prompt.guess)) {
        console.log(`CORRECT!`);
      } else {
        console.log(`Try again :(`);
        guesses--;
        console.log(`Guesses left: ${guesses}`);
      }
      // display word and last guessed letter
      gameWord.displayWord(guessedLetters, prompt.guess);
      console.log(gameWord.complete);
      if (gameWord.complete) {
        console.log(`You win!`);
        return null;
      }
    } else {
      console.log(`You've already guessed this letter!`);
    }

		if (guesses == 0) return console.log(`You lost :(`);
		runPrompt(gameWord);
	} catch (e) {
		console.log(e);
	}
};

newGame();
