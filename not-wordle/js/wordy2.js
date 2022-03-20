class Game {
  constructor() {
    // global vars for the game
    this.gameOver = false; // this will be true upon solve or fail
    this.pointer = 0; // this points to the current column of guesses
    this.curRowNum = 0; // this points to the current row of guesses
    const guessElement = document.getElementById("board");
    this.view = new GuessView(this, guessElement);
    this.guessModel = new GuessModel(this.view);

    // choose a target word
    this.target = [];
    this.listOfWords =
      "about above  abuse actor acute admit adopt adult after again agent agree ahead alarm album alert alike alive allow alone along alter among anger angle angry apart apple apply arena argue arise array aside asset audio audit avoid award aware badly baker bares bases basic basis beach bears beers began begin begun being below bench billy birth black blame blind block blood board boost booth bound brain brand bread break breed brief bring broad broke brown build built buyer cable calif carry catch cause chain chair chart chase cheap check chest chief child china chose civil claim class clean clear click clock close coach coast could count court cover craft crash cream crime cross crowd crown curve cycle daily dance dated dealt death debut delay depth doing doubt dozen draft drama drawn dream dress drill drink drive drove dying eager early earth eight elite empty enemy enjoy enter entry equal error event every exact exist extra faith false fares farts fault fears fiber field fifth fifty fight final first fixed flash fleet floor fluid focus force forth forty forum found frame frank fraud fresh front fruit fully funny giant given glass globe going grace grade grand grant grass great green gross group grown guard guess guest guide happy harry heart heavy hence henry horse hotel house human ideal image index inner input issue japan jimmy joint jones judge known label large laser later laugh layer learn lease least leave legal level lewis light limit links lives local logic loose lower lucky lunch lying magic major maker march maria match maybe mayor meant media metal might minor minus mixed model money month moral motor mount mouse mouth movie music needs never newly night noise north noted novel nurse occur ocean offer often order other ought paint panel paper party peace peter phase phone photo piece pilot pitch place plain plane plant plate point pound power press price pride prime print prior prize proof proud prove queen quick quiet quite radio raise range rapid ratio reach ready refer right rival river robin roger roman rough round route royal rural scale scene scope score sense serve seven shall shape share sharp sheet shelf shell shift shirt shock shoot short shown sides sight since sixth sixty sized skill sleep slide small smart smile smith smoke solid solve sorry sound south space spare speak speed spend spent split spoke sport staff stage stake stand start state steam steel stick still stock stone stood store storm story strip stuck study stuff style sugar suite super sweet table taken taste taxes teach teeth terry texas thank theft their theme there these thick thing think third those three threw throw tight times tired title today topic total touch tough tower track trade train treat trend trial tried tries truck truly trust truth twice under undue union unity until upper upset urban usage usual valid value video virus visit vital voice waste watch water wheel where which while white whole whose woman women world worry worse worst worth would wound write wrong wrote  yield young youth";
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

  insertLetter(letter) {
    // the player chooses a letter to go in the current slot in the current row
    if (
      this.pointer >= 0 &&
      this.pointer <= 4 &&
      this.curRowNum < 6 &&
      !this.gameOver
    ) {
      this.curRow[this.pointer].innerHTML = letter;
      this.pointer++;
    }
  }

  deleteLetter() {
    // so the player can backspace
    if (this.pointer > 0 && this.curRowNum < 6 && !this.gameOver) {
      this.pointer--;
      this.curRow[this.pointer].innerHTML = "&nbsp;";
      console.log("Delete. Pointer is now", this.pointer);
    }
  }

  enterGuess() {
    // for when the player clicks ENTER
    console.log("ENTER was clicked");

    // reasons to quickly reject the guess
    if (this.gameOver) {
      console.log("can't do anything: game over");
      return false;
    }
    if (this.pointer < 5) {
      console.log(this.pointer, "not enough letters");
      return false;
    }

    // put each letter of the current guess into a var
    let temp = "";
    for (let i = 0; i < 5; i++) {
      this.guess[i] = this.curRow[i].innerHTML;
      // create a temporary variable to hold the target as a string
      // (we'll delete each char that the player guesses correctly)
      temp += this.target[i];
    }

    // one more reason to reject the guess
    if (!this.aryOfWords.includes(this.guess.join(""))) {
      console.log("That word is not on the list");
      gsap.to(".row" + this.curRowNum, {
        duration: 1,
        x: 20,
        ease: "myWiggle",
      });
      return false;
    }

    if (this.target.join("") === this.guess.join("")) {
      // they win the game
      this.gameOver = true;
      this.flipLetters();
      console.log("Game Over. You win.");
      // turn all the letters green
      for (let i = 0; i < 5; i++) {
        this.changeColor(this.curRow[i], "success");
        this.changeColor(
          document.getElementById(this.curRow[i].innerHTML),
          "success"
        );
      }
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
    } else if (this.curRowNum > 4) {
      // that was their final guess
      this.gameOver = true;
      console.log("Game Over. You lost. The word was", this.target.join(""));
      // don't return a value; instead, let it fall through to the color
      // change and the letter flip

      // also, add code for modal with solution here
    }
    console.log("curRow:", this.curRow);

    // one loop to remove the greens so that only legit dupes get yellow
    for (let i = 0; i < 5; i++) {
      if (this.target[i] === this.guess[i]) {
        // remove it from temp so if it occurs more than once in guess,
        // the extra instance isn't turned yellow in the next loop;
        temp = temp.replace(this.guess[i], "");
      }
    }

    // for turning yellow
    for (let i = 0; i < 5; i++) {
      if (temp.includes(this.guess[i])) {
        // turn that letter yellow
        this.changeColor(this.curRow[i], "warning");
        this.changeColor(document.getElementById(this.guess[i]), "warning");
        // remove it from temp
        temp = temp.replace(this.guess[i], "");
        console.log(temp);
      } else {
        // it's not in the target word: turn it dark grey
        this.changeColor(this.curRow[i], "secondary");
        this.changeColor(document.getElementById(this.guess[i]), "secondary");
      }
    }

    // turn letters green
    for (let i = 0; i < 5; i++) {
      if (this.target[i] === this.guess[i]) {
        // turn that letter green
        this.changeColor(this.curRow[i], "success");
        this.changeColor(document.getElementById(this.guess[i]), "success");
      }
    }

    // has to be a separate loop for yellow to avoid false positives
    // on double letters (e.g. if the target is FREES and the player
    // guesses GEESE, only one E turns green and only one E turns yellow)

    this.flipLetters();

    // re/set the global counters for the next row
    this.pointer = 0;
    this.curRowNum++;
    this.curRow = document.getElementsByClassName("row" + this.curRowNum);
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
        this.insertLetter(btn.id);
      });
    });
    document.getElementById("ENTER").addEventListener("click", () => {
      this.enterGuess();
    });
    document.getElementById("DELETE").addEventListener("click", () => {
      this.deleteLetter();
    });
  }
}

let game;
window.onload = function () {
  game = new Game();
  game.startGame();
};
