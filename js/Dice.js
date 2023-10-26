class Dice {
    constructor(value) {
        this.value = 0;
    }
    roll() {
        return this.value = Math.floor(Math.random() * 6) + 1;  // si no devuelvo en roll(), 
    }                                                           // en game.js no puedo pasar 
}                                                               // this.dice.roll() como diceValue