class GuessView {
  constructor(element, parent) {
    this.parent = parent;
    this.element = element;
  }

  render() {
    const row = this.model.guesses;
    for (let i = 0; i < this.model.guess.length; i++) {
      const letter = this.model.guess[i];
      const rowElements = document.getElementsByClassName("row" + row);
      rowElements[i].innerHTML = letter;
    }
  }
}

class PastGuessView {
  constructor(element, parent) {
    this.parent = parent;
    this.element = element;
  }

  render() {
    for (let i = 0; i < this.model.pastGuesses.length; i++) {
      // if this is the most recent guess, do letter flip

      this.changeColor(this.curRow[i], "success");
      this.changeColor(document.getElementById(this.guess[i]), "success");
      this.flipLetters();
    }
  }
}
