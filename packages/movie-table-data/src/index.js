import './css/style.css';
import moviesData from './data/movies.json';

console.log("🔥 Movie Table Data загружен");
console.log("📦 Данные из movies.json:", moviesData);
console.log("📊 Количество фильмов:", moviesData.length);

class MovieTableDataAttributes {
  constructor() {
    console.log("🏗️ Создание экземпляра класса");
    this.tableBody = document.getElementById('tableBody');
    console.log("🔍 tableBody элемент:", this.tableBody);
    
    this.sortIndicator = document.getElementById('currentSort');
    console.log("🔍 sortIndicator элемент:", this.sortIndicator);
    
    this.sortFields = ['id', 'title', 'year', 'imdb'];
    this.currentSortIndex = 0;
    this.ascending = true;
    this.interval = null;
    this.sortInterval = 2000;
  }

  init() {
    console.log("🚀 init() вызван");
    if (!this.tableBody) {
      console.error("❌ tableBody не найден!");
      return;
    }
    this.renderTable(moviesData);
    this.updateSortIndicator();
    this.startSortingCycle();
    this.addSortListeners();
    console.log("✅ Инициализация завершена");
  }

  renderTable(movies) {
    console.log("🎨 renderTable() вызван с", movies.length, "фильмами");
    
    if (!this.tableBody) {
      console.error("❌ tableBody отсутствует при рендере");
      return;
    }
    
    this.tableBody.innerHTML = '';
    
    if (!movies || movies.length === 0) {
      console.warn("⚠️ Нет данных для отображения");
      this.tableBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Нет данных</td></tr>';
      return;
    }
    
    movies.forEach((movie, index) => {
      console.log(`📽️ Фильм ${index + 1}:`, movie);
      
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
    
    console.log("✅ Рендер завершен, создано строк:", this.tableBody.children.length);
  }

  sortTable(field, ascending = true) {
    console.log(`📊 sortTable() вызван с полем ${field}, направление: ${ascending ? 'возрастание' : 'убывание'}`);
    
    const rows = Array.from(this.tableBody.querySelectorAll('tr'));
    console.log("📏 Количество строк для сортировки:", rows.length);
    
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

    sortedRows.forEach(row => this.tableBody.appendChild(row));
    this.updateActiveHeader(field, ascending);
    console.log("✅ Сортировка завершена");
  }

  updateActiveHeader(field, ascending) {
    console.log(`🎯 updateActiveHeader() для поля ${field}`);
    
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
      console.log("✅ Заголовок обновлен");
    } else {
      console.warn(`⚠️ Заголовок для поля ${field} не найден`);
    }
  }

  updateSortIndicator() {
    const field = this.sortFields[this.currentSortIndex];
    const fieldNames = { id: 'ID', title: 'названию', year: 'году', imdb: 'рейтингу' };
    const direction = this.ascending ? 'возрастание' : 'убывание';
    
    if (this.sortIndicator) {
      this.sortIndicator.textContent = `${fieldNames[field]} (${direction})`;
      console.log(`📌 Индикатор сортировки обновлен: ${fieldNames[field]} (${direction})`);
    } else {
      console.warn("⚠️ sortIndicator не найден");
    }
  }

  nextSort() {
    console.log("⏭️ nextSort() вызван");
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
    console.log("🔄 startSortingCycle() вызван");
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => this.nextSort(), this.sortInterval);
    console.log(`✅ Цикл сортировки запущен с интервалом ${this.sortInterval}ms`);
  }

  addSortListeners() {
    console.log("👂 addSortListeners() вызван");
    document.querySelectorAll('th.sortable').forEach(th => {
      th.addEventListener('click', (e) => {
        console.log("🖱️ Клик по заголовку:", th.dataset.sort);
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
    console.log("✅ Слушатели событий добавлены");
  }

  stopSortingCycle() {
    console.log("⏹️ stopSortingCycle() вызван");
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

function initMovieTable() {
  console.log("🎬 initMovieTable() вызван");
  console.log("🔍 document.readyState:", document.readyState);
  
  const tableElement = document.querySelector('.movies-table');
  console.log("🔍 .movies-table элемент:", tableElement);
  
  if (tableElement) {
    console.log("✅ Таблица найдена, инициализация...");
    const movieTable = new MovieTableDataAttributes();
    movieTable.init();
  } else {
    console.error("❌ .movies-table не найден на странице!");
    console.log("📄 document.body:", document.body.innerHTML);
  }
}

if (document.readyState === 'loading') {
  console.log("⏳ Документ еще загружается, ждем DOMContentLoaded");
  document.addEventListener('DOMContentLoaded', initMovieTable);
} else {
  console.log("⚡ Документ уже загружен, запускаем сразу");
  initMovieTable();
}

export default MovieTableDataAttributes;
