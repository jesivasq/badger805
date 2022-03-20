class Game {
  constructor() {
    // global vars for the game
    this.gameOver = false; // this will be true upon solve or fail
    this.pointer = 0; // this points to the current column of guesses
    this.curRowNum = 0; // this points to the current row of guesses
    const guessElement = document.getElementById("board");
    this.guessView = new GuessView(this, guessElement);
    this.guessModel = new GuessModel(this.guessView);

    this.pastGuessView = new PastGuessView(this, guessElement);
    this.pastGuessModel = new PastGuessModel(this.pastGuessView);

    // choose a target word
    this.target = [];
    this.listOfWords =
      "about above raids abuse actor acute admit adopt adult after again agent agree ahead alarm album alert alike alive allow alone along alter among anger angle angry apart apple apply arena argue arise array aside asset audio audit avoid award aware badly baker bares bases basic basis beach bears beers began begin begun being below bench billy birth black blame blind block blood board boost booth bound brain brand bread break breed brief bring broad broke brown build built buyer cable calif carry catch cause chain chair chart chase cheap check chest chief child china chose civil claim class clean clear click clock close coach coast could count court cover craft crash cream crime cross crowd crown curve cycle daily dance dated dealt death debut delay depth doing doubt dozen draft drama drawn dream dress drill drink drive drove dying eager early earth eight elite empty enemy enjoy enter entry equal error event every exact exist extra faith false fares farts fault fears fiber field fifth fifty fight final first fixed flash fleet floor fluid focus force forth forty forum found frame frank fraud fresh front fruit fully funny giant given glass globe going grace grade grand grant grass great green gross group grown guard guess guest guide happy harry heart heavy hence henry horse hotel house human ideal image index inner input issue japan jimmy joint jones judge known label large laser later laugh layer learn lease least leave legal level lewis light limit links lives local logic loose lower lucky lunch lying magic major maker march maria match maybe mayor meant media metal might minor minus mixed model money month moral motor mount mouse mouth movie music needs never newly night noise north noted novel nurse occur ocean offer often order other ought paint panel paper party peace peter phase phone photo piece pilot pitch place plain plane plant plate point pound power press price pride prime print prior prize proof proud prove queen quick quiet quite radio raise range rapid ratio reach ready refer right rival river robin roger roman rough round route royal rural scale scene scope score sense serve seven shall shape share sharp sheet shelf shell shift shirt shock shoot short shown sides sight since sixth sixty sized skill sleep slide small smart smile smith smoke solid solve sorry sound south space spare speak speed spend spent split spoke sport staff stage stake stand start state steam steel stick still stock stone stood store storm story strip stuck study stuff style sugar suite super sweet table taken taste taxes teach teeth terry texas thank theft their theme there these thick thing think third those three threw throw tight times tired title today topic total touch tough tower track trade train treat trend trial tried tries truck truly trust truth twice under undue union unity until upper upset urban usage usual valid value video virus visit vital voice waste watch water wheel where which while white whole whose woman women world worry worse worst worth would wound write wrong wrote  yield young youth";
    this.listOfWords = this.listOfWords.toUpperCase();
    this.aryOfWords = this.listOfWords.split(" ");
    // from the Array of words, pick a random word
    this.rando = Math.floor(Math.random() * this.aryOfWords.length);
    console.log("rando:", this.rando, this.aryOfWords[this.rando]);
    this.choice = this.aryOfWords[this.rando];
    for (this.letter of this.choice) {
      this.target.push(this.letter);
    }
    // target word is now loaded into an Array named target[]

    // this initializes the GSAP custom wiggle for "word is not in list"
    gsap.registerPlugin(CustomEase, CustomWiggle);
    CustomWiggle.create("myWiggle", { wiggles: 6 });

    // the following throws an error:
    //this.myModal = new bootstrap.Modal(document.getElementById("solutionModal"), {keyboard: true});
    //console.log(this.myModal);

    // the following results in null:
    // var myModalEl = document.getElementById("solutionModal");
    // var modal = bootstrap.Modal.getInstance(myModalEl); // Returns a Bootstrap modal instance?
    // console.log(modal); // null
  }

  changeColor(element, colorClass) {
    // rather than try to figure out what needs to be removed and what can
    // stay, just remove everything and then put a new class on it
    if (Object.values(element.classList)[0].indexOf("btn") >= 0) {
      element.classList.remove("btn-light");
      element.classList.remove("btn-warning");
      element.classList.remove("btn-success");
      element.classList.add("btn-" + colorClass);
    } else {
      element.classList.remove("bg-warning");
      element.classList.remove("bg-success");
      element.classList.add("bg-" + colorClass);
    }
  }

  flipLetters() {
    // rotate the letters on the X-axis, one after the other
    for (let i = 0; i < 5; i++) {
      gsap.from(this.curRow[i], {
        rotationX: 90,
        delay: i / 3,
        duration: 1,
      });
    }
  }

  alertPlayer(string) {
    console.log(string);
  }

  validateGuess() {
    if (this.gameOver) {
      this.alertPlayer("can't do anything: game over");
      return false;
    }
    if (this.guessModel.guess.length < 5) {
      this.alertPlayer("not enough letters");
      return false;
    }
    // one more reason to reject the guess
    if (!this.aryOfWords.includes(this.guess.join(""))) {
      this.alertPlayer("That word is not on the list");
      gsap.to(".row" + this.curRowNum, {
        duration: 1,
        x: 20,
        ease: "myWiggle",
      });
      return false;
    }
  }

  gameOverSequence(won) {
    this.gameOver = true;
    if (won) {
      this.flipLetters();
      this.alertPlayer("Game Over. You win.");

      // stagger deltaY
      for (let i = 0; i < 5; i++) {
        gsap.to(this.curRow[i], {
          y: -10,
          delay: 1.7 + i / 5,
          duration: 0.4,
          yoyo: true,
          repeat: 1,
        });
      }
      return true;
    }

    this.alertPlayer("Game Over. You lost. The word was", this.target.join(""));
  }

  determineColor(guess) {
    // Takes in a string and returns a double array. Each top level array represent a single character and the color it should have
    // each sub array has two elements, the first is a character, the second is a color
    // [['a', 'green'], ['b', 'yellow']]

    const result = [];
    for (const letter in guess) {
      result.append([letter, null]);
    }

    // Guess=frees, Target=geese
    // f=black
    // r=black
    // e=green
    // e=yellow
    // s=yellow
    // Loop through and set black and green.
    // Determine how many leftover letters there are
    // Loop again and upgrade some blacks to yellows, decrementing leftover letters

    console.log("guess #:", this.guessModel.guesses);

    const leftovers = {};
    for (const letter in this.target) {
      leftovers[letter] = (leftovers[letter] ?? 0) + 1;
    }
    // one loop to remove the greens so that only legit dupes get yellow
    for (let i = 0; i < 5; i++) {
      if (this.target[i] === this.guess[i]) {
        result[i][1] = "green";
        leftovers[this.target[i]] -= 1;
      }

      if (!this.target.includes(this.guess[i])) {
        result[i][1] = "gray";
      }
    }
    // for turning yellow
    for (let i = 0; i < 5; i++) {
      if (
        this.target.includes(this.guess[i]) &&
        !this.target[i] === this.guess[i] &&
        leftovers[this.guess[i]] > 0
      ) {
        result[i][1] = "yellow";
        leftovers[this.target[i]] -= 1;
      }
    }
    return result;
  }

  enterGuess() {
    if (!this.validateGuess()) {
      return; // Guess was not valid.
    }
    const currentGuess = this.guessModel.guess.join("");
    const finalizedGuess = this.determineColor(currentGuess);

    this.pastGuessModel.appendGuess(finalizedGuess);

    if (this.target.join("") === currentGuess) {
      // they win the game
      this.gameOverSequence(true);
    } else if (this.curRowNum > 4) {
      // that was their final guess
      gameOverSequence(false);
      // Even if they lose we will still do the color change for the final guess
    }

    // re/set the global counters for the next row
    this.guessModel.makeGuess();
  }

  startGame() {
    // get a reference to the 5 columns of the current row
    this.curRow = document.getElementsByClassName("row" + this.curRowNum);

    // add a listener to each button in our keyboard
    this.keyboard = document.getElementsByClassName("letter");
    this.btns = Object.values(this.keyboard);
    this.btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        console.log(this.pointer, this.curRowNum, this.gameOver);
        this.guessModel.appendValue(btn.id);
      });
    });
    document.getElementById("ENTER").addEventListener("click", () => {
      this.enterGuess();
    });
    document.getElementById("DELETE").addEventListener("click", () => {
      console.log("ENTER was clicked");
      this.guessModel.deleteValue();
    });
  }
}

let game;
window.onload = function () {
  game = new Game();
  game.startGame();
};
