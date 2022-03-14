class Letter {
    constructor(char, position){
        this.char = char;
        this.pos = position;
        this.class = "btn btn-light";
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