import './css/style.css';
import moviesData from './data/movies.json';

console.log('Movie Table Data загружен');
console.log('Данные из movies.json:', moviesData);
console.log('Количество фильмов:', moviesData.length);

class MovieTableDataAttributes {
  constructor() {
    this.tableBody = document.getElementById('tableBody');
    this.sortIndicator = document.getElementById('currentSort');
    this.sortFields = ['id', 'title', 'year', 'imdb'];
    this.currentSortIndex = 0;
    this.ascending = true;
    this.interval = null;
    this.sortInterval = 2000;
  }

  init() {
    if (!this.tableBody) {
      console.error('tableBody не найден!');
      return;
    }
    this.renderTable(moviesData);
    this.updateSortIndicator();
    this.startSortingCycle();
    this.addSortListeners();
  }

  renderTable(movies) {
    if (!this.tableBody) {
      console.error('tableBody отсутствует при рендере');
      return;
    }

    this.tableBody.innerHTML = '';

    if (!movies || movies.length === 0) {
      console.warn('Нет данных для отображения');
      this.tableBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Нет данных</td></tr>';
      return;
    }

    movies.forEach((movie) => {
      const row = document.createElement('tr');

      row.dataset.id = movie.id;
      row.dataset.title = movie.title;
      row.dataset.year = movie.year;
      row.dataset.imdb = movie.imdb.toFixed(2);

      row.innerHTML = `
        <td>#${movie.id}</td>
        <td>${movie.title}</td>
        <td>(${movie.year})</td>
        <td>imdb: ${movie.imdb.toFixed(2)}</td>
      `;

      this.tableBody.appendChild(row);
    });
  }

  sortTable(field, ascending = true) {
    const rows = Array.from(this.tableBody.querySelectorAll('tr'));

    const sortedRows = rows.sort((a, b) => {
      let valueA = a.dataset[field];
      let valueB = b.dataset[field];

      if (field === 'id' || field === 'year') {
        valueA = parseInt(valueA, 10);
        valueB = parseInt(valueB, 10);
      } else if (field === 'imdb') {
        valueA = parseFloat(valueA);
        valueB = parseFloat(valueB);
      }

      if (valueA < valueB) return ascending ? -1 : 1;
      if (valueA > valueB) return ascending ? 1 : -1;
      return 0;
    });

    sortedRows.forEach((row) => this.tableBody.appendChild(row));
    this.updateActiveHeader(field, ascending);
  }

  updateActiveHeader(field, ascending) {
    document.querySelectorAll('th.sortable').forEach((th) => {
      th.classList.remove('active');
      const arrow = th.querySelector('.arrow');
      if (arrow) arrow.textContent = '';
    });

    const activeHeader = document.querySelector(`th[data-sort="${field}"]`);
    if (activeHeader) {
      activeHeader.classList.add('active');
      const arrow = activeHeader.querySelector('.arrow');
      if (arrow) arrow.textContent = ascending ? '↑' : '↓';
    }
  }

  updateSortIndicator() {
    const field = this.sortFields[this.currentSortIndex];
    const fieldNames = {
      id: 'ID',
      title: 'названию',
      year: 'году',
      imdb: 'рейтингу',
    };
    const direction = this.ascending ? 'возрастание' : 'убывание';

    if (this.sortIndicator) {
      this.sortIndicator.textContent = `${fieldNames[field]} (${direction})`;
    }
  }

  nextSort() {
    this.currentSortIndex++;

    if (this.currentSortIndex >= this.sortFields.length) {
      this.currentSortIndex = 0;
      this.ascending = !this.ascending;
    }

    const field = this.sortFields[this.currentSortIndex];
    const ascending = this.currentSortIndex === 0 ? this.ascending : true;

    this.sortTable(field, ascending);
    this.updateSortIndicator();
  }

  startSortingCycle() {
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => this.nextSort(), this.sortInterval);
  }

  addSortListeners() {
    document.querySelectorAll('th.sortable').forEach((th) => {
      th.addEventListener('click', () => {
        const field = th.dataset.sort;
        const fieldIndex = this.sortFields.indexOf(field);

        if (fieldIndex === this.currentSortIndex) {
          this.ascending = !this.ascending;
        } else {
          this.currentSortIndex = fieldIndex;
          this.ascending = true;
        }

        this.sortTable(field, this.ascending);
        this.updateSortIndicator();

        this.stopSortingCycle();
        this.startSortingCycle();
      });
    });
  }

  stopSortingCycle() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

function initMovieTable() {
  const tableElement = document.querySelector('.movies-table');

  if (tableElement) {
    const movieTable = new MovieTableDataAttributes();
    movieTable.init();
  } else {
    console.error('.movies-table не найден на странице!');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMovieTable);
} else {
  initMovieTable();
}

export default MovieTableDataAttributes;
