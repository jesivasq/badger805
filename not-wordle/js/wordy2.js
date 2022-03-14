class Letter {
    constructor(char, position){
        this.char = char;
        this.pos = position;
        this.btnClass = "btn btn-light";
        this.charClass = "bg-dark"
    }
}

/*
okay, think this through. a letter in a guess has a char and a color
and a position; a letter in the target word has a char and a position

a guess has 5 letters
a target has 5 letters

does the guess also know its row number?

when the user makes a guess, 
- we search for a letter-position match
  - set color to green
  - remove letter from the yellow search
- we search for a letter match
  - only among the letters that aren't already green
  - set color to yellow
- we change the color based on the matches


*/

class Game {
  gameOver = false;
  pointer = 0;
  curRowNum = 0;
  constructor(){
    // global vars for the game
    this.gameOver = false;  // this will be true upon solve or fail
    this.pointer = 0; // this points to the current column of guesses
    this.curRowNum = 0; // this points to the current row of guesses

    // choose a target word
    this.target = [];
    this.listOfWords =
    "about above  abuse actor acute admit adopt adult after again agent agree ahead alarm album alert alike alive allow alone along alter among anger angle angry apart apple apply arena argue arise array aside asset audio audit avoid award aware badly baker bares bases basic basis beach bears beers began begin begun being below bench billy birth black blame blind block blood board boost booth bound brain brand bread break breed brief bring broad broke brown build built buyer cable calif carry catch cause chain chair chart chase cheap check chest chief child china chose civil claim class clean clear click clock close coach coast could count court cover craft crash cream crime cross crowd crown curve cycle daily dance dated dealt death debut delay depth doing doubt dozen draft drama drawn dream dress drill drink drive drove dying eager early earth eight elite empty enemy enjoy enter entry equal error event every exact exist extra faith false fares farts fault fears fiber field fifth fifty fight final first fixed flash fleet floor fluid focus force forth forty forum found frame frank fraud fresh front fruit fully funny giant given glass globe going grace grade grand grant grass great green gross group grown guard guess guest guide happy harry heart heavy hence henry horse hotel house human ideal image index inner input issue japan jimmy joint jones judge known label large laser later laugh layer learn lease least leave legal level lewis light limit links lives local logic loose lower lucky lunch lying magic major maker march maria match maybe mayor meant media metal might minor minus mixed model money month moral motor mount mouse mouth movie music needs never newly night noise north noted novel nurse occur ocean offer often order other ought paint panel paper party peace peter phase phone photo piece pilot pitch place plain plane plant plate point pound power press price pride prime print prior prize proof proud prove queen quick quiet quite radio raise range rapid ratio reach ready refer right rival river robin roger roman rough round route royal rural scale scene scope score sense serve seven shall shape share sharp sheet shelf shell shift shirt shock shoot short shown sides sight since sixth sixty sized skill sleep slide small smart smile smith smoke solid solve sorry sound south space spare speak speed spend spent split spoke sport staff stage stake stand start state steam steel stick still stock stone stood store storm story strip stuck study stuff style sugar suite super sweet table taken taste taxes teach teeth terry texas thank theft their theme there these thick thing think third those three threw throw tight times tired title today topic total touch tough tower track trade train treat trend trial tried tries truck truly trust truth twice under undue union unity until upper upset urban usage usual valid value video virus visit vital voice waste watch water wheel where which while white whole whose woman women world worry worse worst worth would wound write wrong wrote  yield young youth";
    this.listOfWords = this.listOfWords.toUpperCase();
    this.aryOfWords = this.listOfWords.split(" ");
    console.log("length:", this.aryOfWords.length);
    this.rando = Math.floor(Math.random() * this.aryOfWords.length);
    console.log("rando:", this.rando, this.aryOfWords[this.rando]);
    this.choice = this.aryOfWords[this.rando];
    for(this.letter of this.choice){
      this.target.push(this.letter);
    }
    // target word is now loaded into an array named target[]
  }

  insertLetter(letter){
    if(this.pointer >= 0 && this.pointer <= 4 && this.curRowNum < 6 && !this.gameOver){
      this.curRow[this.pointer].innerHTML = letter;
      this.pointer++;
    }
  }

  startGame(){
    // get a reference to the 5 columns of the current row
    this.curRow = document.getElementsByClassName("row" + this.curRowNum);
    console.log(this.curRow);
    // add a listener to each button in our keyboard
    this.keyboard = document.getElementsByClassName("letter");
    console.log("keyboard:", this.keyboard);
    console.log(typeof this.keyboard)
    this.btns = Object.values(this.keyboard);
    this.btns.forEach(btn => {
      console.log(btn);
      btn.addEventListener("click", function(){
        this.insertLetter(btn.id);
        // this currently doesn't work. it says insertLetter isn't a 
        // function. It also thinks pointer, curRowNum, and gameOver
        // are undefined
      })
    });
    
  }



  deleteLetter() {
    if (this.pointer > 0 && this.curRowNum < 6 && !gameOver) {
      this.pointer--;
      this.curRow[this.pointer].innerHTML = "&nbsp;";
      console.log("Delete. Pointer is now", this.pointer);
    }
  }

}

let game = new Game();
console.log(game);
console.log(game.target);
console.log(game.pointer);
game.startGame();

game.insertLetter("A");