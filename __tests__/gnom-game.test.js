import GnomGame from '../packages/gnom-game/src/index.js';

describe('GnomGame', () => {
  test('class exists', () => {
    expect(GnomGame).toBeDefined();
  });

  test('can be instantiated', () => {
    // Создаем мок для DOM элемента
    document.body.innerHTML = '<div class="game-board"></div>';
    const game = new GnomGame(4);
    expect(game).toBeInstanceOf(GnomGame);
    expect(game.boardSize).toBe(4);
  });
});
