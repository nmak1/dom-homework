import MovieTableDataAttributes from '../packages/movie-table-data/src/index.js';

describe('MovieTableDataAttributes', () => {
  test('class exists', () => {
    expect(MovieTableDataAttributes).toBeDefined();
  });

  test('can be instantiated', () => {
    document.body.innerHTML = `
      <table class="movies-table">
        <tbody id="tableBody"></tbody>
      </table>
      <div id="currentSort"></div>
    `;
    const table = new MovieTableDataAttributes();
    expect(table).toBeInstanceOf(MovieTableDataAttributes);
    expect(table.sortFields).toEqual(['id', 'title', 'year', 'imdb']);
  });
});
