import './css/style.css';

class GnomGame {
  constructor(boardSize = 4) {
    this.boardSize = boardSize;
    this.boardElement = document.querySelector('.game-board');
    this.cells = [];
    this.currentPosition = 0;
  }

  init() {
    this.createBoard();
    this.placeGnome();
    this.startGame();
  }

  createBoard() {
    for (let i = 0; i < 16; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      this.boardElement.appendChild(cell);
      this.cells.push(cell);
    }
  }

  placeGnome() {
    this.currentPosition = Math.floor(Math.random() * 16);
    this.cells[this.currentPosition].classList.add('gnome');
  }

  moveGnome() {
    this.cells[this.currentPosition].classList.remove('gnome');
    let newPosition;
    do {
      newPosition = Math.floor(Math.random() * 16);
    } while (newPosition === this.currentPosition);
    this.currentPosition = newPosition;
    this.cells[this.currentPosition].classList.add('gnome');
  }

  startGame() {
    setInterval(() => this.moveGnome(), 1000);
  }
}

function initGame() {
  if (document.querySelector('.game-board')) {
    const game = new GnomGame();
    game.init();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}

export default GnomGame;
