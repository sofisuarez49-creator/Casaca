const baseNames = ['Guerrero', 'Maga', 'Explorador'];

let characters = [];
let selected = null;
let playerScore = 0;
let enemyScore = 0;
let round = 0;

const container = document.getElementById('characters');
const fightBtn = document.getElementById('fightBtn');
const resetBtn = document.getElementById('resetBtn');
const log = document.getElementById('log');
const playerScoreEl = document.getElementById('playerScore');
const enemyScoreEl = document.getElementById('enemyScore');
const roundEl = document.getElementById('round');

function randomStat() {
  return Math.floor(Math.random() * 41) + 60;
}

function createCharacters() {
  characters = baseNames.map((name) => ({
    name,
    stats: {
      fuerza: randomStat(),
      defensa: randomStat(),
      velocidad: randomStat(),
    },
  }));
}

function renderCharacters() {
  container.innerHTML = '';

  characters.forEach((character, index) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <h3>${character.name}</h3>
      <p>Fuerza: ${character.stats.fuerza}</p>
      <p>Defensa: ${character.stats.defensa}</p>
      <p>Velocidad: ${character.stats.velocidad}</p>
    `;

    card.addEventListener('click', () => {
      selected = index;
      document.querySelectorAll('.card').forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      fightBtn.disabled = false;
      addLog(`Elegiste a ${character.name}.`);
    });

    container.appendChild(card);
  });
}

function addLog(message) {
  const entry = document.createElement('p');
  entry.textContent = message;
  log.prepend(entry);
}

function sumStats(character) {
  const { fuerza, defensa, velocidad } = character.stats;
  return fuerza + defensa + velocidad;
}

function fightRound() {
  if (selected === null || round >= 3 || playerScore === 2 || enemyScore === 2) return;

  round += 1;
  const player = characters[selected];
  const enemyOptions = characters.filter((_, idx) => idx !== selected);
  const enemy = enemyOptions[Math.floor(Math.random() * enemyOptions.length)];

  const playerPower = sumStats(player);
  const enemyPower = sumStats(enemy);

  addLog(`Ronda ${round}: ${player.name} (${playerPower}) vs ${enemy.name} (${enemyPower}).`);

  if (playerPower > enemyPower) {
    playerScore += 1;
    addLog('Ganaste la ronda.');
  } else if (enemyPower > playerPower) {
    enemyScore += 1;
    addLog('Perdiste la ronda.');
  } else {
    addLog('Empate en la ronda.');
  }

  playerScoreEl.textContent = playerScore;
  enemyScoreEl.textContent = enemyScore;
  roundEl.textContent = round;

  if (playerScore === 2 || enemyScore === 2 || round === 3) {
    fightBtn.disabled = true;
    if (playerScore > enemyScore) addLog('¡Victoria final!');
    else if (enemyScore > playerScore) addLog('Derrota final.');
    else addLog('Empate final.');
  }
}

function resetGame() {
  selected = null;
  playerScore = 0;
  enemyScore = 0;
  round = 0;
  fightBtn.disabled = true;
  playerScoreEl.textContent = '0';
  enemyScoreEl.textContent = '0';
  roundEl.textContent = '0';
  log.innerHTML = '';
  createCharacters();
  renderCharacters();
  addLog('Juego reiniciado. Elige un personaje.');
}

fightBtn.addEventListener('click', fightRound);
resetBtn.addEventListener('click', resetGame);

resetGame();
