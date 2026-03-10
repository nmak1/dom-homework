import goblinImage from '../img/goblin.png';

export default class Goblin {
  constructor(board) {
    console.log('🟢 Goblin constructor called');
    console.log('Board received:', board);
    this.board = board;
    this.element = null;
    this.currentPosition = null;
    this.create();
  }

  create() {
    console.log('🟡 Creating goblin element');
    try {
      this.element = document.createElement('img');
      console.log('Element created:', this.element);

      this.element.src = goblinImage;
      console.log('Src set to:', this.element.src);

      this.element.classList.add('goblin');
      this.element.alt = 'Goblin';
      console.log('Classes:', this.element.classList);

      console.log('✅ Goblin element created successfully');
    } catch (error) {
      console.error('❌ Error creating goblin:', error);
    }
  }

  showAt(position) {
    console.log('🔵 showAt called with position:', position);
    console.log('Current position before show:', this.currentPosition);
    console.log('Element exists?', !!this.element);

    if (!this.element) {
      console.error('❌ Cannot show - element is null!');
      return;
    }

    if (this.currentPosition !== null) {
      console.log('Hiding previous goblin at position:', this.currentPosition);
      this.hide();
    }

    const cell = this.board.getCell(position);
    console.log('Target cell:', cell);

    if (!cell) {
      console.error('❌ Target cell not found!');
      return;
    }

    cell.append(this.element);
    console.log('Element appended to cell');

    this.currentPosition = position;
    console.log('Current position set to:', this.currentPosition);

    cell.classList.add('active');
    console.log('Cell active class added');

    // Проверяем, появился ли элемент в DOM
    const checkElement = document.querySelector('.goblin');
    console.log('Goblin in DOM after show:', checkElement);
  }

  hide() {
    console.log('🔴 hide called, current position:', this.currentPosition);

    if (this.element && this.element.parentNode) {
      console.log('Removing element from parent:', this.element.parentNode);
      this.element.parentNode.removeChild(this.element);
      console.log('Element removed');
    } else {
      console.log('Element has no parent or is null');
    }

    if (this.currentPosition !== null) {
      const cell = this.board.getCell(this.currentPosition);
      if (cell) {
        cell.classList.remove('active');
        console.log('Active class removed from cell:', this.currentPosition);
      }
    }

    this.currentPosition = null;
    console.log('Current position reset to null');
  }

  moveToRandomPosition() {
    const newPosition = this.board.getRandomCell(this.currentPosition);
    console.log('🟣 moveToRandomPosition, new position:', newPosition);
    this.showAt(newPosition);
    return newPosition;
  }

  getCurrentPosition() {
    return this.currentPosition;
  }

  isVisible() {
    return this.currentPosition !== null;
  }
}
