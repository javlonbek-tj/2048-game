// ! Selectors
const gridDisplay = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const resultDisplay = document.querySelector('.result');
const newGame = document.querySelector('.new-game');

const width = 4;

const squares = [];
let score = 0;

function createBoard() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div');
    square.innerHTML = 0;
    gridDisplay.append(square);
    squares.push(square);
  }
  generate();
  generate();
}

createBoard();

function generate() {
  const randomNumber = Math.floor(Math.random() * squares.length);
  if (squares[randomNumber].innerHTML == 0) {
    squares[randomNumber].innerHTML = 2;
    // CheckForGameOver()
  } else generate();
}

function moveRight() {
  for (let i = 0; i < width * width; i++) {
    if (i % 4 === 0) {
      const totalOne = squares[i].innerHTML;
      const totalTwo = squares[i + 1].innerHTML;
      const totalThree = squares[i + 2].innerHTML;
      const totalFour = squares[i + 3].innerHTML;
      const row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

      const noneZeros = row.filter((num) => num);
      const missingZeros = width - noneZeros.length;
      const zeros = Array(missingZeros).fill(0);

      const newRow = zeros.concat(noneZeros);
      squares[i].innerHTML = newRow[0];
      squares[i + 1].innerHTML = newRow[1];
      squares[i + 2].innerHTML = newRow[2];
      squares[i + 3].innerHTML = newRow[3];
    }
  }
}

function moveLeft() {
  for (let i = 0; i < width * width; i++) {
    if (i % 4 === 0) {
      const totalOne = squares[i].innerHTML;
      const totalTwo = squares[i + 1].innerHTML;
      const totalThree = squares[i + 2].innerHTML;
      const totalFour = squares[i + 3].innerHTML;
      const row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

      const noneZeros = row.filter((num) => num);
      const missingZeros = width - noneZeros.length;
      const zeros = Array(missingZeros).fill(0);

      const newRow = noneZeros.concat(zeros);
      squares[i].innerHTML = newRow[0];
      squares[i + 1].innerHTML = newRow[1];
      squares[i + 2].innerHTML = newRow[2];
      squares[i + 3].innerHTML = newRow[3];
    }
  }
}

function moveUp() {
  for (let i = 0; i < width; i++) {
    const totalOne = squares[i].innerHTML;
    const totalTwo = squares[i + width].innerHTML;
    const totalThree = squares[i + width * 2].innerHTML;
    const totalFour = squares[i + width * 3].innerHTML;
    const column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

    const noneZeros = column.filter((num) => num);
    const missing = width - noneZeros.length;
    const zeros = Array(missing).fill(0);
    const newColumn = noneZeros.concat(zeros);

    squares[i].innerHTML = newColumn[0];
    squares[i + width].innerHTML = newColumn[1];
    squares[i + width * 2].innerHTML = newColumn[2];
    squares[i + width * 3].innerHTML = newColumn[3];
  }
}

function moveDown() {
  for (let i = 0; i < width; i++) {
    const totalOne = squares[i].innerHTML;
    const totalTwo = squares[i + width].innerHTML;
    const totalThree = squares[i + width * 2].innerHTML;
    const totalFour = squares[i + width * 3].innerHTML;
    const column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

    const noneZeros = column.filter((num) => num);
    const missing = width - noneZeros.length;
    const zeros = Array(missing).fill(0);
    const newColumn = zeros.concat(noneZeros);

    squares[i].innerHTML = newColumn[0];
    squares[i + width].innerHTML = newColumn[1];
    squares[i + width * 2].innerHTML = newColumn[2];
    squares[i + width * 3].innerHTML = newColumn[3];
  }
}

function combineRow() {
  for (let i = 0; i < 15; i++) {
    if (squares[i].innerHTML === squares[i + 1].innerHTML) {
      let combinedTotal = parseInt(squares[i].innerHTML) * 2;
      squares[i].innerHTML = combinedTotal;
      squares[i + 1].innerHTML = 0;
      score += combinedTotal;
      scoreDisplay.innerHTML = score;
    }
  }
  checkForWin();
}

function combineColumn() {
  for (let i = 0; i < width * (width - 1); i++) {
    if (squares[i].innerHTML === squares[i + width].innerHTML) {
      let combinedTotal = parseInt(squares[i].innerHTML) * 2;
      squares[i].innerHTML = combinedTotal;
      squares[i + width].innerHTML = 0;
      score += combinedTotal;
      scoreDisplay.innerHTML = score;
    }
  }
  checkForWin();
}

function keyRight() {
  moveRight();
  combineRow();
  moveRight();
  generate();
}

function keyLeft() {
  moveLeft();
  combineRow();
  moveLeft();
  generate();
}

function keyUp() {
  moveUp();
  combineColumn();
  moveUp();
  generate();
}

function keyDown() {
  moveDown();
  combineColumn();
  moveDown();
  generate();
}

function control(e) {
  if (e.key === 'ArrowRight') {
    keyRight();
  }

  if (e.key === 'ArrowLeft') {
    keyLeft();
  }

  if (e.key === 'ArrowUp') {
    keyUp();
  }

  if (e.key === 'ArrowDown') {
    keyDown();
  }
}

document.addEventListener('keydown', control);

function checkForWin() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].innerHTML == 8) {
      resultDisplay.textContent = 'You WIN!';

      gridDisplay.classList.add('win');

      document.removeEventListener('keydown', control);
    }
  }
}
