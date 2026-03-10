import Game from './Game';

export default class GameController {
  constructor() {
    this.game = null;
    this.restartBtn = document.getElementById('restartBtn');
    this.gameBoard = document.querySelector('.game-board');
    this.init();
  }

  init() {
    this.startNewGame();
    this.setupEventListeners();
  }

  startNewGame() {
    if (this.game) {
      this.game.destroy();
    }

    this.game = new Game();
    this.game.init();
  }

  setupEventListeners() {
    // Обработчик кликов по игровому полю
    this.gameBoard.addEventListener('click', (e) => {
      this.handleBoardClick(e);
    });

    // Обработчик кнопки рестарта
    if (this.restartBtn) {
      this.restartBtn.addEventListener('click', () => {
        this.handleRestart();
      });
    }

    // Обработчик клавиши Enter для рестарта
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && this.game && this.game.isGameOver) {
        this.handleRestart();
      }
    });
  }

  handleBoardClick(e) {
    const cell = e.target.closest('.cell');
    if (!cell) return;

    const cellIndex = parseInt(cell.dataset.index, 10);

    // Проверяем, кликнули ли по гоблину
    if (e.target.classList.contains('goblin')) {
      this.game.hitGoblin(cellIndex);

      // Анимация для молотка
      e.target.style.transform = 'scale(0.8)';
      setTimeout(() => {
        e.target.style.transform = '';
      }, 100);
    }
  }

  handleRestart() {
    this.startNewGame();
  }
}
