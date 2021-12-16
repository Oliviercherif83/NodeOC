// des constantes pour le jeu pour éviter le hard coding
const SHEET = "sheet";
const ROCK = "rock";
const CHISEL = "chisel";

// Etat général des données pour l'application 
const state = {
  elements: [SHEET, ROCK, CHISEL],
  players: [
    { name: "Alan", count: 0 },
    { name: "Sophie", count: 0 },
  ],
  count: 0,
  max: 20,
};

const choice = () => {
  const max = state.elements.length;

  return state.elements[Math.floor(Math.random() * max)];
};

const run = () => {
  while (state.count < state.max) {

    let [player1, player2] = [choice(), choice()];

    while (player1 == player2) {
      console.log(`coup nul on rejoue, p1 : ${player1}, p2 : ${player2}`);
      [player1, player2] = [choice(), choice()];
    }

    // On compte les points
    if (player1 == ROCK) {
      if (player2 == CHISEL) {
        state.players[0].count++;
      } else {
        state.players[1].count++;
      }
    }

    if (player1 == SHEET) {
      if (player2 == ROCK) {
        state.players[0].count++;
      } else {
        state.players[1].count++;
      }
    }

    if (player1 == CHISEL) {
      if (player2 == SHEET) {
        state.players[0].count++;
      } else {
        state.players[1].count++;
      }
    }

    state.count++;
  }

  return state.count;
};

// on utilise un raccourci pour les clés noms de state et run => {state: state, run: run } <=> {state, run }
exports.chiffoumi = {
  state,
  run,
};