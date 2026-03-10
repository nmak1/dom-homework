import './css/style.css';
import GameController from './js/GameController';

// Инициализация игры при загрузке страницы
function initGame() {
  console.log('Gnom Game: инициализация');
  const gameController = new GameController();

  // Очищаем интервал при уходе со страницы
  window.addEventListener('beforeunload', () => {
    if (gameController.game) {
      gameController.game.destroy();
    }
  });
}

// Запускаем игру только если мы на странице с игровым полем
if (document.querySelector('.game-board')) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
  } else {
    initGame();
  }
}

export default GameController;
