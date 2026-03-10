export default class Board {
  constructor(size = 4) {
    this.size = size;
    this.totalCells = size ** 2;
    this.boardElement = document.querySelector('.game-board');
    this.cells = [];
  }

  create() {
    this.boardElement.innerHTML = '';
    this.cells = [];

    for (let i = 0; i < this.totalCells; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      this.boardElement.append(cell);
      this.cells.push(cell);
    }
  }

  getCell(index) {
    return this.cells[index];
  }

  getAllCells() {
    return this.cells;
  }

  getRandomCell(excludeIndex = null) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * this.totalCells);
    } while (randomIndex === excludeIndex);
    return randomIndex;
  }

  clearActiveClass() {
    this.cells.forEach((cell) => cell.classList.remove('active'));
  }

  setGameOverState(isGameOver) {
    if (isGameOver) {
      this.boardElement.classList.add('game-over');
      this.boardElement.classList.remove('playing');
    } else {
      this.boardElement.classList.remove('game-over');
      this.boardElement.classList.add('playing');
    }
  }
}
