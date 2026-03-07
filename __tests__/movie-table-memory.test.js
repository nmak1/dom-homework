import MovieTableInMemory from '../packages/movie-table-memory/src/index.js';

describe('MovieTableInMemory', () => {
  test('class exists', () => {
    expect(MovieTableInMemory).toBeDefined();
  });

  test('can be instantiated', () => {
    document.body.innerHTML = `
      <table class="movies-table">
        <tbody id="tableBody"></tbody>
      </table>
      <div id="currentSort"></div>
      <div id="timer"></div>
      <div id="movieCount"></div>
      <div id="avgRating"></div>
    `;
    const table = new MovieTableInMemory();
    expect(table).toBeInstanceOf(MovieTableInMemory);
    expect(table.sortFields).toEqual(['id', 'title', 'year', 'imdb']);
  });
});
