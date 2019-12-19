const inquirer = require(`inquirer`);
const Word = require(`./word`);
const Letter = require(`./letter`);

const letters = /^[a-z]+$/;

let word = `truck`;
let guessedLetters = [];

const game = async () => {
	const test = new Word(word);
	await runPrompt(test);
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

		// push guess to guessedLetters []
		guessedLetters.push(prompt.guess);

		// checking if letter was a correct guess
		if (word.includes(prompt.guess)) {
			console.log(`CORRECT!`);
		} else {
			console.log(`Try again :(`);
		}
		// display word and last guessed letter
		gameWord.displayWord(guessedLetters, prompt.guess);
		console.log(gameWord.complete);
		if (gameWord.complete) {
      console.log(`You win!`);
      await nextWord();
		}

		runPrompt(gameWord);
	} catch (e) {
		console.log(e);
	}
};

const nextWord = async() => {
  const result = await inquirer.prompt([
    {
      message: `Next word?`,
      type: `list`,
      choices: [`Yes!`, `No :(`],
      name: `response`
    }
  ]);
  if(result.response == `Yes!`) {
    guessedLetters = [];
    word = `applesauce`;
    console.log(word);
    game();
    console.log(`New Game!`);
  }
}

game();
