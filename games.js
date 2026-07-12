// Mini Games JavaScript

let currentGame = '';
let gameScore = 0;
let currentQuestion = 1;
const totalQuestions = 5;

// Memory Game Data
const memoryEmojis = ['🍎', '🍌', '🍊', '🍇', '🍓', '🍉', '🍑', '🍒'];
let memoryCards = [];
let flipped = [];
let matched = 0;
let memoryTime = 0;
let memoryTimer = null;

// Start Game
function startGame(game) {
  currentGame = game;
  gameScore = 0;
  currentQuestion = 1;
  
  if (game === 'memory') {
    startMemoryGame();
  } else if (game === 'alphabet') {
    startAlphabetGame();
  } else if (game === 'numbers') {
    startNumbersGame();
  } else if (game === 'colors') {
    startColorsGame();
  }
}

// Memory Game
function startMemoryGame() {
  document.getElementById('memoryGameModal').style.display = 'block';
  resetMemoryGame();
}

function resetMemoryGame() {
  flipped = [];
  matched = 0;
  memoryTime = 0;
  gameScore = 0;
  memoryCards = [];
  
  const doubles = [...memoryEmojis, ...memoryEmojis];
  memoryCards = doubles.sort(() => Math.random() - 0.5);
  
  const grid = document.getElementById('memoryGrid');
  grid.innerHTML = '';
  
  memoryCards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.textContent = '?';
    card.onclick = () => flipCard(index);
    card.id = `card-${index}`;
    grid.appendChild(card);
  });
  
  document.getElementById('memoryScore').textContent = '0';
  document.getElementById('memoryTime').textContent = '0';
  
  if (memoryTimer) clearInterval(memoryTimer);
  memoryTimer = setInterval(() => {
    memoryTime++;
    document.getElementById('memoryTime').textContent = memoryTime;
  }, 1000);
}

function flipCard(index) {
  const card = document.getElementById(`card-${index}`);
  if (flipped.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
    card.classList.add('flipped');
    card.textContent = memoryCards[index];
    flipped.push(index);
    
    if (flipped.length === 2) {
      setTimeout(checkMemoryMatch, 500);
    }
  }
}

function checkMemoryMatch() {
  const card1 = document.getElementById(`card-${flipped[0]}`);
  const card2 = document.getElementById(`card-${flipped[1]}`);
  
  if (memoryCards[flipped[0]] === memoryCards[flipped[1]]) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    gameScore += 10;
    matched += 2;
    document.getElementById('memoryScore').textContent = matched / 2 + '/8';
    
    if (matched === 16) {
      clearInterval(memoryTimer);
      setTimeout(() => finishGame(50), 1000);
    }
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    card1.textContent = '?';
    card2.textContent = '?';
  }
  flipped = [];
}

// Alphabet Game
function startAlphabetGame() {
  document.getElementById('alphabetGameModal').style.display = 'block';
  loadAlphabetQuestion();
}

function loadAlphabetQuestion() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const correctLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
  const options = [correctLetter];
  
  while (options.length < 6) {
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    if (!options.includes(randomLetter)) {
      options.push(randomLetter);
    }
  }
  
  options.sort(() => Math.random() - 0.5);
  
  document.getElementById('alphabetPrompt').textContent = `Find the letter: ${correctLetter}`;
  document.getElementById('alphabetQuestion').textContent = currentQuestion;
  document.getElementById('alphabetScore').textContent = gameScore;
  document.getElementById('alphabetProgress').style.width = ((currentQuestion - 1) / totalQuestions * 100) + '%';
  
  const optionsDiv = document.getElementById('alphabetOptions');
  optionsDiv.innerHTML = '';
  
  options.forEach(letter => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = letter;
    btn.onclick = () => checkAlphabetAnswer(letter, correctLetter, btn);
    optionsDiv.appendChild(btn);
  });
}

function checkAlphabetAnswer(selected, correct, btn) {
  if (selected === correct) {
    btn.classList.add('correct');
    gameScore += 15;
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion > totalQuestions) {
        setTimeout(() => finishGame(75), 500);
      } else {
        loadAlphabetQuestion();
      }
    }, 1000);
  } else {
    btn.classList.add('incorrect');
    setTimeout(() => btn.classList.remove('incorrect'), 500);
  }
}

// Numbers Game
function startNumbersGame() {
  document.getElementById('numbersGameModal').style.display = 'block';
  loadNumbersQuestion();
}

function loadNumbersQuestion() {
  const numbers = Array.from({length: 5}, () => Math.floor(Math.random() * 20) + 1);
  const shuffled = [...numbers].sort(() => Math.random() - 0.5);
  
  document.getElementById('numbersQuestion').textContent = currentQuestion;
  document.getElementById('numbersScore').textContent = gameScore;
  
  const display = document.getElementById('numbersDisplay');
  display.innerHTML = '';
  
  const draggable = document.getElementById('draggableNumbers');
  draggable.innerHTML = '';
  
  shuffled.forEach((num, index) => {
    const item = document.createElement('div');
    item.className = 'number-item';
    item.textContent = num;
    item.draggable = true;
    item.id = `num-${index}`;
    item.ondragstart = (e) => e.dataTransfer.setData('text/plain', num);
    draggable.appendChild(item);
  });
  
  display.ondrop = (e) => {
    e.preventDefault();
    const num = e.dataTransfer.getData('text/plain');
    const numDiv = document.createElement('div');
    numDiv.textContent = num;
    display.appendChild(numDiv);
  };
  
  display.ondragover = (e) => e.preventDefault();
}

function checkNumbersAnswer() {
  const display = document.getElementById('numbersDisplay');
  const numbers = Array.from(display.children).map(el => parseInt(el.textContent));
  const sorted = [...numbers].sort((a, b) => a - b);
  
  if (JSON.stringify(numbers) === JSON.stringify(sorted)) {
    gameScore += 25;
    currentQuestion++;
    if (currentQuestion > totalQuestions) {
      setTimeout(() => finishGame(50), 500);
    } else {
      loadNumbersQuestion();
    }
  } else {
    alert('❌ Not in order! Try again.');
  }
}

// Colors Game
function startColorsGame() {
  document.getElementById('colorsGameModal').style.display = 'block';
  loadColorsQuestion();
}

function loadColorsQuestion() {
  const colors = {
    'Red': '#E74C3C',
    'Blue': '#3498DB',
    'Yellow': '#F1C40F',
    'Green': '#27AE60',
    'Purple': '#9B59B6',
    'Orange': '#E67E22'
  };
  
  const colorNames = Object.keys(colors);
  const correct = colorNames[Math.floor(Math.random() * colorNames.length)];
  const options = [correct];
  
  while (options.length < 6) {
    const random = colorNames[Math.floor(Math.random() * colorNames.length)];
    if (!options.includes(random)) {
      options.push(random);
    }
  }
  
  options.sort(() => Math.random() - 0.5);
  
  document.getElementById('colorPrompt').textContent = `Find the color: ${correct}`;
  document.getElementById('colorsQuestion').textContent = currentQuestion;
  document.getElementById('colorsScore').textContent = gameScore;
  document.getElementById('colorProgress').style.width = ((currentQuestion - 1) / totalQuestions * 100) + '%';
  
  const optionsDiv = document.getElementById('colorOptions');
  optionsDiv.innerHTML = '';
  
  options.forEach(colorName => {
    const box = document.createElement('div');
    box.className = 'color-option';
    box.style.backgroundColor = colors[colorName];
    box.onclick = () => checkColorAnswer(colorName, correct, box);
    optionsDiv.appendChild(box);
  });
}

function checkColorAnswer(selected, correct, box) {
  if (selected === correct) {
    box.classList.add('correct');
    gameScore += 15;
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion > totalQuestions) {
        setTimeout(() => finishGame(75), 500);
      } else {
        loadColorsQuestion();
      }
    }, 1000);
  } else {
    box.classList.add('incorrect');
    setTimeout(() => box.classList.remove('incorrect'), 500);
  }
}

// Finish Game
function finishGame(bonusPoints) {
  closeGame();
  
  const totalBonus = gameScore + bonusPoints;
  
  document.getElementById('finalScore').textContent = gameScore;
  document.getElementById('bonusPoints').textContent = bonusPoints;
  document.getElementById('gameOverModal').style.display = 'block';
  
  // Add bonus points to student data
  const saved = localStorage.getItem('cocomeLonStudentData');
  if (saved) {
    let data = JSON.parse(saved);
    data.totalPoints += bonusPoints;
    localStorage.setItem('cocomeLonStudentData', JSON.stringify(data));
  }
}

// Close Game
function closeGame() {
  document.getElementById('memoryGameModal').style.display = 'none';
  document.getElementById('alphabetGameModal').style.display = 'none';
  document.getElementById('numbersGameModal').style.display = 'none';
  document.getElementById('colorsGameModal').style.display = 'none';
  if (memoryTimer) clearInterval(memoryTimer);
}

// Play Again
function playAgain() {
  document.getElementById('gameOverModal').style.display = 'none';
  startGame(currentGame);
}

// Back to Dashboard
function backToDashboard() {
  window.location.href = 'dashboard.html';
}

console.log('🎮 Mini Games loaded successfully!');
