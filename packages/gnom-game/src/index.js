import './css/style.css';
import gnomeImage from './img/goblin.png';

class GnomGame {
  constructor(boardSize = 4) {
    this.boardSize = boardSize;
    this.boardElement = document.querySelector('.game-board');
    this.cells = [];
    this.gnomeElement = null;
    this.currentPosition = null;
    this.interval = null;
    this.moveInterval = 1000;
  }

  init() {
    this.createBoard();
    this.createGnome();
    this.startGame();
  }

  createBoard() {
    for (let i = 0; i < this.boardSize * this.boardSize; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      this.boardElement.appendChild(cell);
      this.cells.push(cell);
    }
  }

  createGnome() {
    this.gnomeElement = document.createElement('img');
    this.gnomeElement.src = gnomeImage;
    this.gnomeElement.classList.add('gnome');
    this.gnomeElement.alt = 'Gnome';
    this.moveGnomeToRandomPosition();
  }

  getRandomPosition(excludePosition = null) {
    let newPosition;
    do {
      newPosition = Math.floor(Math.random() * this.cells.length);
    } while (newPosition === excludePosition);
    return newPosition;
  }

  moveGnomeToRandomPosition() {
    const newPosition = this.getRandomPosition(this.currentPosition);
    this.moveGnome(newPosition);
  }

  moveGnome(newPosition) {
    if (this.gnomeElement.parentNode) {
      this.gnomeElement.parentNode.removeChild(this.gnomeElement);
    }
    this.cells[newPosition].appendChild(this.gnomeElement);
    this.currentPosition = newPosition;
  }

  startGame() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      this.moveGnomeToRandomPosition();
    }, this.moveInterval);
  }

  stopGame() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  reset() {
    this.stopGame();
    this.moveGnomeToRandomPosition();
    this.startGame();
  }
}

function initGame() {
  const game = new GnomGame(4);
  game.init();

  document.querySelector('.game-board').addEventListener('click', (e) => {
    if (e.target.classList.contains('gnome')) {
      e.target.style.animation = 'none';
      // eslint-disable-next-line no-unused-expressions
      e.target.offsetHeight;
      e.target.style.animation = 'pop 0.3s ease-out';
      setTimeout(() => {
        game.moveGnomeToRandomPosition();
      }, 100);
    }
  });
}

if (document.querySelector('.game-board')) {
  document.addEventListener('DOMContentLoaded', initGame);
}

export default GnomGame;
