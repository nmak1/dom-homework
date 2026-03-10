import Board from './Board';
import Goblin from './Goblin';
import Score from './Score';

export default class Game {
  constructor() {
    console.log('Game constructor called');
    this.board = new Board(4);
    this.goblin = null;
    this.score = new Score(5);
    this.intervalId = null;
    this.appearanceInterval = 1000;
    this.isRunning = false;
    this.isGameOver = false;
  }

  init() {
    console.log('Game init called');
    console.log('Board element:', document.querySelector('.game-board'));

    this.board.create();
    console.log('Board created, cells:', this.board.cells.length);

    this.goblin = new Goblin(this.board);
    console.log('Goblin created');

    this.score.setGameOverCallback(() => this.gameOver());

    this.board.setGameOverState(false);
    this.isGameOver = false;
    this.isRunning = true;

    this.startGameLoop();
    console.log('Game loop started');
  }

  startGameLoop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.showGoblin();
    this.intervalId = setInterval(() => {
      this.onGoblinTimeout();
    }, this.appearanceInterval);
  }

  showGoblin() {
    if (!this.isRunning || this.isGameOver) {
      console.log('Cannot show goblin - game not running');
      return;
    }
    console.log('Showing goblin');
    this.goblin.moveToRandomPosition();
  }

  onGoblinTimeout() {
    if (!this.isRunning || this.isGameOver) return;

    if (this.goblin.isVisible()) {
      console.log('Goblin missed!');
      const isGameOver = this.score.incrementMisses();
      if (isGameOver) {
        this.gameOver();
        return;
      }
    }

    this.showGoblin();
  }

  hitGoblin(cellIndex) {
    if (!this.isRunning || this.isGameOver) return false;

    if (this.goblin.isVisible() && this.goblin.getCurrentPosition() === cellIndex) {
      console.log('Goblin hit!');
      this.score.incrementScore();
      this.goblin.hide();

      const cell = this.board.getCell(cellIndex);
      cell.style.animation = 'hit 0.3s ease-out';
      setTimeout(() => {
        cell.style.animation = '';
      }, 300);

      return true;
    }
    return false;
  }

  gameOver() {
    console.log('Game over!');
    this.isGameOver = true;
    this.isRunning = false;

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.goblin.hide();
    this.board.setGameOverState(true);
    this.score.setStatus('Игра окончена! Начните новую игру.');
  }

  restart() {
    console.log('Game restart');
    this.isGameOver = false;
    this.isRunning = true;

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.score.reset();
    this.goblin.hide();
    this.board.setGameOverState(false);
    this.startGameLoop();
  }

  destroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
  }
}
