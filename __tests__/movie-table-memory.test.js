import MovieTableInMemory from '../packages/movie-table-memory/src/index';

jest.mock('../packages/movie-table-memory/src/data/movies.json', () => [
  { id: 1, title: 'Test Movie', year: 2020, imdb: 8.5 }
], { virtual: true });

describe('MovieTableInMemory', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <table class="movies-table">
        <tbody id="tableBody"></tbody>
      </table>
      <div id="currentSort"></div>
      <div id="timer"></div>
      <div id="movieCount"></div>
      <div id="avgRating"></div>
    `;
  });

  test('class exists', () => {
    expect(MovieTableInMemory).toBeDefined();
  });

  test('can be instantiated', () => {
    const table = new MovieTableInMemory();
    expect(table).toBeInstanceOf(MovieTableInMemory);
    expect(table.sortFields).toEqual(['id', 'title', 'year', 'imdb']);
  });

  test('has initial data', () => {
    const table = new MovieTableInMemory();
    expect(Array.isArray(table.movies)).toBe(true);
  });
});
