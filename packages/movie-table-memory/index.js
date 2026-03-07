import './css/style.css';
import moviesData from './data/movies.json';

class MovieTableInMemory {
  constructor() {
    this.movies = [...moviesData];
    this.tableBody = document.getElementById('tableBody');
    this.sortIndicator = document.getElementById('currentSort');
    this.timerElement = document.getElementById('timer');
    this.movieCountElement = document.getElementById('movieCount');
    this.avgRatingElement = document.getElementById('avgRating');
    
    this.sortFields = ['id', 'title', 'year', 'imdb'];
    this.currentSortIndex = 0;
    this.ascending = true;
    this.interval = null;
    this.countdownInterval = null;
    this.sortInterval = 2000;
    this.timeLeft = 2;
  }

  init() {
    this.renderTable();
    this.updateStats();
    this.updateSortIndicator();
    this.startSortingCycle();
    this.addSortListeners();
    this.startCountdown();
  }

  renderTable() {
    this.tableBody.innerHTML = '';
    this.movies.forEach(movie => {
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

  updateStats() {
    if (this.movieCountElement) {
      this.movieCountElement.textContent = this.movies.length;
    }
    if (this.avgRatingElement) {
      const avgRating = this.movies.reduce((sum, movie) => sum + movie.imdb, 0) / this.movies.length;
      this.avgRatingElement.textContent = avgRating.toFixed(2);
    }
  }

  sortMovies(field, ascending = true) {
    this.movies.sort((a, b) => {
      let valueA = a[field];
      let valueB = b[field];
      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
      if (valueA < valueB) return ascending ? -1 : 1;
      if (valueA > valueB) return ascending ? 1 : -1;
      return 0;
    });
    this.renderTable();
    this.updateStats();
    this.updateActiveHeader(field, ascending);
  }

  updateActiveHeader(field, ascending) {
    document.querySelectorAll('th.sortable').forEach(th => {
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
    const fieldNames = { id: 'ID', title: 'названию', year: 'году', imdb: 'рейтингу' };
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
    this.sortMovies(field, ascending);
    this.updateSortIndicator();
    this.resetCountdown();
  }

  startCountdown() {
    this.timeLeft = 2;
    this.updateTimerDisplay();
    this.countdownInterval = setInterval(() => {
      this.timeLeft -= 0.1;
      this.updateTimerDisplay();
      if (this.timeLeft <= 0) this.timeLeft = 2;
    }, 100);
  }

  updateTimerDisplay() {
    if (this.timerElement) {
      this.timerElement.textContent = `Следующая сортировка через: ${this.timeLeft.toFixed(1)}с`;
    }
  }

  resetCountdown() {
    this.timeLeft = 2;
  }

  startSortingCycle() {
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => this.nextSort(), this.sortInterval);
  }

  stopSortingCycle() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
  }

  addSortListeners() {
    document.querySelectorAll('th.sortable').forEach(th => {
      th.addEventListener('click', (e) => {
        const field = th.dataset.sort;
        const fieldIndex = this.sortFields.indexOf(field);
        
        if (fieldIndex === this.currentSortIndex) {
          this.ascending = !this.ascending;
        } else {
          this.currentSortIndex = fieldIndex;
          this.ascending = true;
        }

        this.sortMovies(field, this.ascending);
        this.updateSortIndicator();
        this.resetCountdown();
        this.stopSortingCycle();
        this.startSortingCycle();
      });
    });
  }
}

function initMovieTable() {
  const movieTable = new MovieTableInMemory();
  movieTable.init();
}

if (document.querySelector('.movies-table')) {
  document.addEventListener('DOMContentLoaded', initMovieTable);
}

export default MovieTableInMemory;