class GuessModel {
//
 constructor defines 'guess'
// we move the validator logic here.
// We define accessor method
// Whenever the accessor method is called, we validate, and then tell any viewers that we were updated.

    constructor(view) {
        this.view = view;
        this.guess = []
    }

    changed() {
        this.view.render();
    }

    appendValue(value) {
        // Add a new character to guess if able
        this.changed();
    }

    deleteValue() {
        // Remove the latest character if there is one
        this.changed();
    }
}