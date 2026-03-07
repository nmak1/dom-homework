import MovieTableDataAttributes from '../packages/movie-table-data/src/index';

jest.mock('../packages/movie-table-data/src/data/movies.json', () => [
  { id: 1, title: 'Test Movie', year: 2020, imdb: 8.5 }
], { virtual: true });

describe('MovieTableDataAttributes', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <table class="movies-table">
        <thead>
          <tr>
            <th data-sort="id" class="sortable">ID</th>
          </tr>
        </thead>
        <tbody id="tableBody"></tbody>
      </table>
      <div id="currentSort"></div>
    `;
  });

  test('class exists', () => {
    expect(MovieTableDataAttributes).toBeDefined();
  });

  test('can be instantiated', () => {
    const table = new MovieTableDataAttributes();
    expect(table).toBeInstanceOf(MovieTableDataAttributes);
    expect(table.sortFields).toEqual(['id', 'title', 'year', 'imdb']);
  });
});
