# Домашнее задание по DOM

[![Build and Deploy](https://github.com/nmak1/dom-homework/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/dom-homework/actions/workflows/ci.yml)

Монорепозиторий, содержащий три проекта для домашнего задания по DOM.

## Демо

[Ссылка на GitHub Pages](https://YOUR_USERNAME.github.io/dom-homework)

## Структура проектов

### 1. 🎮 Gnom Game
Игра с перемещающимся гномом. Гном случайным образом перемещается по игровому полю 4x4 каждую секунду.
- [Перейти к игре](/gnom-game)
- [Исходный код](/packages/gnom-game)

### 2. 📊 Movie Table (Data Attributes)
Таблица фильмов с сортировкой через data-атрибуты. Автоматическая циклическая сортировка каждые 2 секунды.
- [Перейти к таблице](/movie-table-data)
- [Исходный код](/packages/movie-table-data)

### 3. 💾 Movie Table (In-Memory)
Таблица фильмов с сортировкой в памяти. Хранение данных в массиве, полное пересоздание DOM.
- [Перейти к таблице](/movie-table-memory)
- [Исходный код](/packages/movie-table-memory)

## Технологии

- **Webpack** - сборка проектов
- **Babel** - транспиляция JavaScript
- **ESLint** - линтинг кода
- **Jest** - тестирование
- **GitHub Actions** - CI/CD
- **GitHub Pages** - хостинг

## Локальный запуск

```bash
# Клонирование репозитория
git clone https://github.com/YOUR_USERNAME/dom-homework.git
cd dom-homework

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm start

# Сборка всех проектов
npm run build

# Запуск линтера
npm run lint

# Запуск тестов
npm test