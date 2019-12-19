class Letter {
  constructor(character) {
    this.character = character;
    this.underscore = `_`;
    this.show = false;
  }

  showLetter (guessArray) {
    if(this.character == ` `) {
      return this.character;
    }
    if(guessArray.includes(this.character)) {
      return this.character;
    }

    return this.underscore;
  }

  showDisplay() {
    console.log(this.display);
  }
}

module.exports = Letter;
