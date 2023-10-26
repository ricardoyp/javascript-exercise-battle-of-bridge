class Player {
    constructor(name, life, attack) {
        this.name = name;
        this.life = life;
        this.attack = attack;
    }

    attackPlayer(player, diceValue){
        if (!this.isDead()){
            player.life -= this.attack * diceValue;
            if((this.attack * diceValue)>10){
                console.log(`¡Ataque crítico! de ${this.name} a ${player.name}`)
            }
        }
    }

    isDead(){
        if (this.life <= 0){
            // console.log("Muerto")
            return true;
        } else {
            // console.log("No muerto")
            return false;
        }
    }
}