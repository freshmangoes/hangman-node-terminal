const Letter = require(`./letter`);

class Word {
	constructor(str) {
    this.word = str;
    this.wordArr = [];
    this.complete = false;

    for(let i = 0; i < str.length; i++) {
      let letter = new Letter(str[i]);
      // console.log(`letter:: ${letter}``);
      this.wordArr.push(letter);
    }
	}

  // takes in guess array
	displayWord(guessArr) {
    // string to append letters to
    let result= ``; 
    // iterate through letters in word
		for(let i = 0; i < this.wordArr.length; i++) {
      // runs compare function to see if letter will be displayed
      result += `${this.wordArr[i].showLetter(guessArr)} `;
    }
    // outputs result
    console.log(result);
    if(!result.includes(`_`)) {
      this.complete = true;
    }
  }
}

// let word = `apple`;
// const apple = new Word(word);
// apple.displayWord(guessArr);

module.exports = Word;

