import GnomGame from '../packages/gnom-game/src/index.js';

describe('GnomGame', () => {
  beforeAll(() => {
    // Создаем мок для DOM
    document.body.innerHTML = '<div class="game-board"></div>';
  });

  test('class exists', () => {
    expect(GnomGame).toBeDefined();
  });

  test('can be instantiated', () => {
    const game = new GnomGame(4);
    expect(game).toBeInstanceOf(GnomGame);
    expect(game.boardSize).toBe(4);
  });

  test('has required methods', () => {
    const game = new GnomGame(4);
    expect(typeof game.init).toBe('function');
    expect(typeof game.startGame).toBe('function');
    expect(typeof game.stopGame).toBe('function');
    expect(typeof game.moveGnomeToRandomPosition).toBe('function');
  });
});
