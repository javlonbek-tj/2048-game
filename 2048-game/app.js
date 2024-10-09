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
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + 1].innerHTML;
      let totalThree = squares[i + 2].innerHTML;
      let totalFour = squares[i + 3].innerHTML;
      let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

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
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + 1].innerHTML;
      let totalThree = squares[i + 2].innerHTML;
      let totalFour = squares[i + 3].innerHTML;
      let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

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
  // checkForWin()
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

function control(e) {
  if (e.key === 'ArrowRight') {
    keyRight();
  }

  if (e.key === 'ArrowLeft') {
    keyLeft();
  }
}

document.addEventListener('keydown', control);
