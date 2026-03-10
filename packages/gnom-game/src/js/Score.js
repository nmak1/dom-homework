export default class Score {
  constructor(maxMisses = 5) {
    this.score = 0;
    this.misses = 0;
    this.maxMisses = maxMisses;
    this.scoreElement = document.getElementById('score');
    this.missesElement = document.getElementById('misses');
    this.statusElement = document.getElementById('gameStatus');
    this.onGameOver = null;
  }

  incrementScore() {
    this.score++;
    this.updateDisplay();
  }

  incrementMisses() {
    this.misses++;
    this.updateDisplay();

    if (this.misses >= this.maxMisses) {
      if (this.onGameOver) {
        this.onGameOver();
      }
      return true;
    }
    return false;
  }

  reset() {
    this.score = 0;
    this.misses = 0;
    this.updateDisplay();
    this.setStatus('');
  }

  updateDisplay() {
    if (this.scoreElement) {
      this.scoreElement.textContent = this.score;
    }
    if (this.missesElement) {
      this.missesElement.textContent = `${this.misses}/${this.maxMisses}`;
    }
  }

  setStatus(message) {
    if (this.statusElement) {
      this.statusElement.textContent = message;
    }
  }

  setGameOverCallback(callback) {
    this.onGameOver = callback;
  }

  isGameOver() {
    return this.misses >= this.maxMisses;
  }
}
