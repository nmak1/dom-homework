// Мокаем импорт картинки
jest.mock('../packages/gnom-game/src/img/goblin.png', () => 'mocked-image', { virtual: true });

// Импортируем класс
import GnomGame from '../packages/gnom-game/src/index.js';

describe('GnomGame', () => {
  beforeEach(() => {
    // Создаем DOM для каждого теста
    document.body.innerHTML = '<div class="game-board"></div>';
  });

  afterEach(() => {
    // Очищаем DOM после каждого теста
    document.body.innerHTML = '';
  });

  test('класс GnomGame существует', () => {
    expect(GnomGame).toBeDefined();
  });

  test('можно создать экземпляр класса', () => {
    const game = new GnomGame(4);
    expect(game).toBeInstanceOf(GnomGame);
    expect(game.boardSize).toBe(4);
  });

  test('класс имеет необходимые методы', () => {
    const game = new GnomGame(4);
    expect(typeof game.init).toBe('function');
    expect(typeof game.startGame).toBe('function');
    expect(typeof game.stopGame).toBe('function');
    expect(typeof game.moveGnomeToRandomPosition).toBe('function');
  });

  test('метод getRandomPosition возвращает число', () => {
    const game = new GnomGame(4);
    // Создаем клетки
    game.cells = new Array(16).fill(null);
    const pos = game.getRandomPosition();
    expect(typeof pos).toBe('number');
    expect(pos).toBeGreaterThanOrEqual(0);
    expect(pos).toBeLessThan(16);
  });
});
