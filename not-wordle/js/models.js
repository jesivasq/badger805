class GuessModel {
  //
  // constructor defines 'guess'
  // we move the validator logic here.
  // We define accessor method
  // Whenever the accessor method is called, we validate, and then tell any viewers that we were updated.

  constructor(view) {
    this.view = view;
    this.view.model = this;
    this.guess = [];
    this.guesses = 0;
  }

  changed() {
    console.log(this.guess);
    this.view.render();
  }

  appendValue(value) {
    // Add a new character to guess if able
    this.guess.push(value);
    if (!this.validate()) {
      this.guess.pop();
    } else {
      this.changed();
    }
  }

  deleteValue() {
    // Remove the latest character if there is one
    if (this.guess.length > 0) {
      this.guess.pop();
      this.changed();
    }
  }

  makeGuess() {
    this.guesses += 1;
    this.guess = [];
    this.changed();
  }

  validate() {
    return this.guess.length <= 5;
  }
}

class PastGuessModel {
  constructor(view) {
    this.view = view;
    this.view.model = this;
    this.pastGuesses = [];
  }

  appendGuess(guess) {
    this.pastGuesses.push(guess);
    this.view.render();
  }
}
