// ! Selectors
const gridDisplay = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const bestDisplay = document.querySelector('#best');
const resultDisplay = document.querySelector('.game-result');
const newGame = document.querySelector('.new-game');
const timerDisplay = document.querySelector('.timer');
const resultsBody = document.getElementById('results-body');

// Sounds
const winSound = new Audio('./audios/win-sound.wav');
const loseSound = new Audio('./audios/lose-sound.wav');
const startSound = new Audio('./audios/start-sound.wav');

const width = 4;

const squares = [];
let score = 0;
let moves = 0;
let seconds = 0;
let minutes = 0;
let timerInterval;
let gameResults = JSON.parse(localStorage.getItem('gameResults')) || [];

function showBestResult() {
  bestDisplay.textContent = gameResults[0]?.score || '0';
  newGame.textContent = gameResults.length === 0 ? 'Start Game' : 'New Game';
}

showBestResult();

newGame.addEventListener('click', () => {
  startSound.play();
  squares.forEach((square) => {
    square.innerHTML = 0;
  });

  score = 0;
  moves = 0;
  scoreDisplay.innerHTML = score;

  gridDisplay.classList.remove('game-over');
  resultDisplay.textContent = '';

  generate();
  generate();

  document.addEventListener('keydown', control);

  startTimer();
});

function createBoard() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div');
    square.classList.add('grid-cell');
    square.innerHTML = 0;
    gridDisplay.append(square);
    squares.push(square);
  }
  generate();
  generate();
}

createBoard();
addColors();

function generate() {
  const randomNumber = Math.floor(Math.random() * squares.length);
  if (squares[randomNumber].innerHTML == 0) {
    squares[randomNumber].innerHTML = 2;
    addColors();
    checkForLost();
  } else generate();
}

function moveRight() {
  for (let i = 0; i < width * width; i++) {
    if (i % 4 === 0) {
      const totalOne = squares[i].innerHTML;
      const totalTwo = squares[i + 1].innerHTML;
      const totalThree = squares[i + 2].innerHTML;
      const totalFour = squares[i + 3].innerHTML;
      const row = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];

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
      const row = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];

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
    const column = [
      parseInt(totalOne),
      parseInt(totalTwo),
      parseInt(totalThree),
      parseInt(totalFour),
    ];

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
    const column = [
      parseInt(totalOne),
      parseInt(totalTwo),
      parseInt(totalThree),
      parseInt(totalFour),
    ];

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
  moves++;
  moveRight();
  combineRow();
  moveRight();
  generate();
  addColors();
}

function keyLeft() {
  moves++;
  moveLeft();
  combineRow();
  moveLeft();
  generate();
  addColors();
}

function keyUp() {
  moves++;
  moveUp();
  combineColumn();
  moveUp();
  generate();
  addColors();
}

function keyDown() {
  moves++;
  moveDown();
  combineColumn();
  moveDown();
  generate();
  addColors();
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

function gameOver(result) {
  resultDisplay.textContent = result;

  gridDisplay.classList.add('game-over');

  if (result === 'You Win!') {
    winSound.play();
  } else if (result === 'You Lose!') {
    loseSound.play();
  }

  clearInterval(timerInterval);

  document.removeEventListener('keydown', control);

  const finalScore = score;
  const finalMoves = moves;
  const finalTime = timerDisplay.textContent;

  saveGameResult(finalScore, finalMoves, finalTime);

  showBestResult();
}

function checkForWin() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].innerHTML == 2048) {
      gameOver('You Win!');
    }
  }
}

function checkForLost() {
  let zeros = 0;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].innerHTML == 0) {
      zeros++;
    }
  }
  if (zeros === 0) {
    gameOver('You Lose!');
  }
}

function addColors() {
  const colorMap = {
    0: { background: '#cdc1b4', color: '#cdc1b4' },
    2: { background: '#EEE4DA', color: '#776e65' },
    4: { background: '#EDE0C8', color: '#776e65' },
    8: { background: '#F2B179', color: '#fff' },
    16: { background: '#F59563', color: '#fff' },
    32: { background: '#F67C5F', color: '#fff' },
    64: { background: '#F65E3B', color: '#fff' },
    128: { background: '#EDCF72', color: '#fff' },
    256: { background: '#EDCC61', color: '#fff' },
    512: { background: '#ECC850', color: '#fff' },
    1024: { background: '#EBC53F', color: '#fff' },
    2048: { background: '#E6BF2E', color: '#fff' },
  };

  squares.forEach((square) => {
    const value = parseInt(square.innerHTML);
    const { background, color } = colorMap[value];
    square.style.backgroundColor = background;
    square.style.color = color;
  });
}

function startTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  minutes = 0;
  timerDisplay.textContent = `00:00`;

  timerInterval = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
  }, 1000);
}

// ---------------------------------

function saveGameResult(score, moves, time) {
  const newResult = {
    score,
    moves,
    time,
  };

  gameResults.push(newResult);

  gameResults.sort((a, b) => {
    if (b.score === a.score) {
      if (a.moves === b.moves) {
        return a.time.localeCompare(b.time);
      }
      return a.moves - b.moves;
    }
    return b.score - a.score;
  });

  gameResults = gameResults.slice(0, 10);

  localStorage.setItem('gameResults', JSON.stringify(gameResults));

  displayResults();
}

function displayResults() {
  resultsBody.innerHTML = '';

  gameResults.forEach((result, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${result.score}</td>
      <td>${result.moves}</td>
      <td>${result.time}</td>
    `;
    resultsBody.append(row);
  });
}

displayResults();
