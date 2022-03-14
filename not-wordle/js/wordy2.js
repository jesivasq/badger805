
class Game {
  
  constructor(){
    // global vars for the game
    this.gameOver = false;  // this will be true upon solve or fail
    this.pointer = 0; // this points to the current column of guesses
    this.curRowNum = 0; // this points to the current row of guesses
    this.guess = [];

    // choose a target word
    this.target = [];
    this.listOfWords =
    "about above  abuse actor acute admit adopt adult after again agent agree ahead alarm album alert alike alive allow alone along alter among anger angle angry apart apple apply arena argue arise array aside asset audio audit avoid award aware badly baker bares bases basic basis beach bears beers began begin begun being below bench billy birth black blame blind block blood board boost booth bound brain brand bread break breed brief bring broad broke brown build built buyer cable calif carry catch cause chain chair chart chase cheap check chest chief child china chose civil claim class clean clear click clock close coach coast could count court cover craft crash cream crime cross crowd crown curve cycle daily dance dated dealt death debut delay depth doing doubt dozen draft drama drawn dream dress drill drink drive drove dying eager early earth eight elite empty enemy enjoy enter entry equal error event every exact exist extra faith false fares farts fault fears fiber field fifth fifty fight final first fixed flash fleet floor fluid focus force forth forty forum found frame frank fraud fresh front fruit fully funny giant given glass globe going grace grade grand grant grass great green gross group grown guard guess guest guide happy harry heart heavy hence henry horse hotel house human ideal image index inner input issue japan jimmy joint jones judge known label large laser later laugh layer learn lease least leave legal level lewis light limit links lives local logic loose lower lucky lunch lying magic major maker march maria match maybe mayor meant media metal might minor minus mixed model money month moral motor mount mouse mouth movie music needs never newly night noise north noted novel nurse occur ocean offer often order other ought paint panel paper party peace peter phase phone photo piece pilot pitch place plain plane plant plate point pound power press price pride prime print prior prize proof proud prove queen quick quiet quite radio raise range rapid ratio reach ready refer right rival river robin roger roman rough round route royal rural scale scene scope score sense serve seven shall shape share sharp sheet shelf shell shift shirt shock shoot short shown sides sight since sixth sixty sized skill sleep slide small smart smile smith smoke solid solve sorry sound south space spare speak speed spend spent split spoke sport staff stage stake stand start state steam steel stick still stock stone stood store storm story strip stuck study stuff style sugar suite super sweet table taken taste taxes teach teeth terry texas thank theft their theme there these thick thing think third those three threw throw tight times tired title today topic total touch tough tower track trade train treat trend trial tried tries truck truly trust truth twice under undue union unity until upper upset urban usage usual valid value video virus visit vital voice waste watch water wheel where which while white whole whose woman women world worry worse worst worth would wound write wrong wrote  yield young youth";
    this.listOfWords = this.listOfWords.toUpperCase();
    this.aryOfWords = this.listOfWords.split(" ");
    //console.log("length:", this.aryOfWords.length);
    this.rando = Math.floor(Math.random() * this.aryOfWords.length);
    console.log("rando:", this.rando, this.aryOfWords[this.rando]);
    this.choice = this.aryOfWords[this.rando];
    for(this.letter of this.choice){
      this.target.push(this.letter);
    }
    // target word is now loaded into an array named target[]

    gsap.registerPlugin(CustomEase, CustomWiggle);
    CustomWiggle.create("myWiggle", { wiggles: 6 });
  }

  changeColor(element, colorClass){
    // some code here
    if(!element.classList.contains("bg-success") && !element.classList.contains("btn-success")){
      //element.classList.add("btn-" + colorClass);
    }
  }

  flipLetters(){
    for (let i = 0; i < 5; i++) {
      gsap.from(this.curRow[i], {
        rotationX: 90,
        delay: i / 3,
        duration: 1,
      })
    }
  }

  insertLetter(letter){
    if(this.pointer >= 0 && this.pointer <= 4 && this.curRowNum < 6 && !this.gameOver){
      this.curRow[this.pointer].innerHTML = letter;
      this.pointer++;
    }
  }

  deleteLetter() {
    if (this.pointer > 0 && this.curRowNum < 6 && !this.gameOver) {
      this.pointer--;
      this.curRow[this.pointer].innerHTML = "&nbsp;";
      console.log("Delete. Pointer is now", this.pointer);
    }
  }

  enterGuess(){
    // for when the player clicks ENTER
    console.log("ENTER was clicked");
    if(this.gameOver){
      console.log("can't do anything: game over");
      return false;
    }
    if(this.pointer < 5){
      console.log(this.pointer, "not enough letters");
      return false;
    }

    let temp = "";
    for(let i = 0; i < 5; i++){
      this.guess[i] = this.curRow[i].innerHTML;
      temp += this.target[i];
    }
    //console.log("aryOfWords:", this.aryOfWords, temp);
    if(!this.aryOfWords.includes(this.guess.join(""))){
      console.log("That word is not on the list");
      gsap.to(".row" + this.curRowNum, {
        duration: 1,
        x: 20,
        ease: "myWiggle",
      });
      return false;
    }

    if(this.target.join("") === this.guess.join("")){
      // they win the game
      this.gameOver = true;
      this.flipLetters();
      console.log("Game Over. You win.");
      // turn all the letters green
      
      for(let i = 0; i < 5; i++){
        this.curRow[i].classList.add("bg-success");
        let curDiv = document.getElementById(this.curRow[i].innerHTML);
        curDiv.classList.add("btn-success");
        curDiv.classList.remove("btn-light");
        curDiv.classList.remove("btn-warning");
      }
      // stagger deltaY
      return true;
    } else if(this.curRowNum > 4) { 
      // that was their final guess
      this.gameOver = true;
      console.log("Game Over. You lost. The word was", this.target.join(""));
      this.flipLetters();
      return false;
    }
    console.log("curRow:", this.curRow);
    for(let i = 0; i < 5; i++){
      if(this.target[i] === this.guess[i]){
       // console.log(i);
        // turn that letter green
       // this.curRow[i].className += "bg-success";
       this.curRow[i].classList.add("bg-success");
       let curDiv = document.getElementById(this.target[i]);
       curDiv.classList.remove("btn-light");
       curDiv.classList.remove("btn-warning");
       curDiv.classList.add("btn-success");
        // remove it from temp
        temp = temp.replace(this.guess[i], "");
      //  console.log(temp);
      }
    }

    // has to be a separate loop for yellow to avoid false positives
    // on double letters (e.g. if the target is FREES and the player
    // guesses GEESE, only one E turns green and only one E turns yellow)
    for(let i = 0; i < 5; i++){
     // console.log("temp:", temp, "guess[i]:", this.guess[i]);
      if(temp.includes(this.guess[i])){
       // console.log(this.guess[i]);
        // turn that letter yellow
        this.curRow[i].classList.add("bg-warning");
        let curDiv = document.getElementById(this.guess[i]);
        curDiv.classList.remove("btn-light");
        curDiv.classList.remove("btn-success");
        curDiv.classList.add("btn-warning");
        // remove it from temp
        temp = temp.replace(this.guess[i], "");
        console.log(temp);
      } else {
        this.curRow[i].classList.add("bg-secondary");
        let curDiv = document.getElementById(this.guess[i]);
        curDiv.classList.remove("btn-light");
        //curDiv.classList.remove("btn-success");
        //curDiv.classList.remove("btn-warning");
        curDiv.classList.add("btn-secondary");
        // remove it from temp
        temp = temp.replace(this.guess[i], "");
      }
    }
    //flip the letters
    // for (let i = 0; i < 5; i++) {
    //   gsap.from(this.curRow[i], {
    //     rotationX: 90,
    //     delay: i / 3,
    //     duration: 1,
    //   })
    // }
    this.flipLetters();

    // re/set the global counters for the next row
    this.pointer = 0;
    this.curRowNum++;
    this.curRow = document.getElementsByClassName("row" + this.curRowNum);
  }


  startGame(){
    // get a reference to the 5 columns of the current row
    this.curRow = document.getElementsByClassName("row" + this.curRowNum);
    //console.log(typeof this.curRow);
    // add a listener to each button in our keyboard
    this.keyboard = document.getElementsByClassName("letter");
    //console.log("keyboard:", this.keyboard);
    //console.log(typeof this.keyboard)
    this.btns = Object.values(this.keyboard);
    this.btns.forEach(btn => {
      //console.log(btn);
      // okay, this is where it gets weird. <self = this> makes it work.
      // why? I don't know. I saw it in the first example here:
      // https://www.toptal.com/javascript/10-most-common-javascript-mistakes
      let self = this;
      btn.addEventListener("click", (self) => {
        //console.log(this.pointer, this.curRowNum, this.gameOver);
        this.insertLetter(btn.id);
      });
    });  
    document.getElementById("ENTER").addEventListener("click", () => {
      this.enterGuess();
    });
    document.getElementById("DELETE").addEventListener("click", () => {
      this.deleteLetter();
    })
  }




}

let game;
window.onload = function(){
  game = new Game();
  game.startGame();
}

//console.log(game);
//console.log(game.target);
//console.log(game.pointer);


