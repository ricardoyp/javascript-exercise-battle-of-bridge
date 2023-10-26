const dice = new Dice();
const player = new Player("Heroe", 100, 2);
const enemy = new Player("Enemigo", 100, 3);
const game = new BattleGame(dice, player, enemy);

const ul = document.getElementById("history");
const diceElement = document.getElementById("dice-value");

function play() {
  document.getElementById("attack").disabled = true;
  const player = game.player;
  const enemy = game.enemy;

  game.battle(player, enemy);

  renderBattleLog(player, enemy);

  if (enemy.isDead()) return;

  game.battle(enemy, player);

  setTimeout(() => {
    renderBattleLog(enemy, player);
    if (player.isDead()) return;  // si el heroe muere acaba el juego
    document.getElementById("attack").disabled = false;
  }, 2000);
}

renderLife(game.player);
renderLife(game.enemy);

document.getElementById("attack").addEventListener("click", play);
document.getElementById("refresh").addEventListener('click', _ => { location.reload();}) //resfresca la pagina


function renderLife(player) {
  const lifeBar = document.getElementById(
    "health-" + player.name.toLowerCase()
  );

  if(player.life <= 0){  //Si el personaje muere la barra se queda en 0%
    player.life = 0;
  }

  lifeBar.setAttribute("style", "width:" + player.life + "%"); //si el porcentaje es negativo se pone al 100%
}

function renderPoints(player) {
  const lifePoints = document.getElementById("life-" + player.name.toLowerCase());
  lifePoints.innerHTML = player.life;
}

function renderBattleLog(attacker, defender) {
  diceElement.innerText = game.dice.value; // Cambia el valor del hueco del dado
  let text, defeatText;

  text = `${attacker.name} ataca a ${defender.name} y le hace ${
    attacker.attack * game.dice.value
  } puntos de daño`;

  let elementText = document.createTextNode(text);
  let li = document.createElement("li");
  li.className = "typing";
  li.appendChild(elementText);
  ul.appendChild(li);
  renderLife(defender);
  renderPoints(defender); // Va cambiando el valor de Life:

  if (defender.isDead()) {
    defeatText =
      defender.name + " ha sido derrotado y " + attacker.name + " ha ganado";
    elementText = document.createTextNode(defeatText);
    li = document.createElement("li");
    li.className = "typing";
    li.appendChild(elementText);
    ul.appendChild(li);
    renderLife(defender);
    renderPoints(defender);


    document.getElementById("game-over").className = "show";

    document.getElementById("attack").disabled = true;
  
    document.getElementById("gameOver").addEventListener("click", resetGame);

  }
}

function resetGame(){

  game.player.life = 100;
  game.enemy.life = 100;

  renderPoints(game.player);
  renderPoints(game.enemy);

  renderLife(game.player);
  renderLife(game.enemy);

  ul.innerHTML = ''; // Vacia el cuadro de texto

  document.getElementById("attack").disabled = false; // Para que cuando muera alguno no se pueda seguir atacando hasta que le des a ResetGame
  document.getElementById("game-over").className = "hidden"; //Esconde todo el div de gameOver

}
