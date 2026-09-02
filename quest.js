const questMain = document.querySelector('#quest-main');
const startPanel = document.querySelector('#start-panel');
const startButton = document.querySelector('#start-quest');
const teamLabel = document.querySelector('#team-label');
const progressLabel = document.querySelector('#code-progress');
const digits = ['5', '2', '8', '4', '7', '1', '3'];
const solved = new Set();

function updateProgress() {
  progressLabel.textContent = `Code: ${digits.map((digit, index) => solved.has(index + 1) ? digit : '_').join(' ')}`;
}

function showResult(task, success, message) {
  const result = document.querySelector(`#result-${task}`);
  result.textContent = message;
  result.className = `task-result ${success ? 'success' : 'error'}`;
  if (success) {
    solved.add(task);
    document.querySelector(`.quest-tab[data-task="${task}"]`).classList.add('solved');
    updateProgress();
  }
}

function normalize(value) {
  return value.toLowerCase().trim();
}

startButton.addEventListener('click', () => {
  teamLabel.textContent = 'Expedition';
  startPanel.hidden = true;
  questMain.hidden = false;
  document.querySelector('#task-1').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.querySelectorAll('.quest-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    const task = tab.dataset.task;
    document.querySelectorAll('.quest-tab').forEach((item) => {
      item.classList.toggle('active', item === tab);
      item.setAttribute('aria-selected', item === tab ? 'true' : 'false');
    });
    document.querySelectorAll('.quest-task').forEach((panel) => {
      panel.hidden = panel.id !== `task-${task}`;
      panel.classList.toggle('active', panel.id === `task-${task}`);
    });
  });
});

document.querySelector('.check-task[data-check="1"]').addEventListener('click', () => {
  const fields = [...document.querySelectorAll('#task-1 select')];
  const correct = fields.every((field) => field.value === field.dataset.answer);
  fields.forEach((field) => {
    field.classList.toggle('correct', field.value === field.dataset.answer);
    field.classList.toggle('incorrect', field.value !== field.dataset.answer && field.value !== '');
  });
  showResult(1, correct, correct ? 'Access granted. First code digit: 5' : 'Incorrect answer. The correct options are highlighted in green.');
});

document.querySelector('.check-task[data-check="2"]').addEventListener('click', () => {
  const answer = normalize(document.querySelector('#threat-answer').value);
  const correct = ['poaching', 'hunting', 'illegal hunting'].includes(answer);
  showResult(2, correct, correct ? 'Threat identified. Second code digit: 2' : 'That conclusion is incorrect. Read the report and examine the clues again.');
});

document.querySelector('.check-task[data-check="3"]').addEventListener('click', () => {
  const correct = document.querySelector('input[name="q3a"]:checked')?.value === 'b' && document.querySelector('input[name="q3b"]:checked')?.value === 'b';
  showResult(3, correct, correct ? 'Route is safe. Third code digit: 8' : 'Rule violation! Read the question and choose another answer.');
});

document.querySelector('.check-task[data-check="4"]').addEventListener('click', () => {
  const fields = [...document.querySelectorAll('#task-4 select')];
  const correct = fields.every((field) => field.value === field.dataset.answer);
  fields.forEach((field) => {
    field.classList.toggle('correct', field.value === field.dataset.answer);
    field.classList.toggle('incorrect', field.value !== field.dataset.answer && field.value !== '');
  });
  showResult(4, correct, correct ? 'Posts published! Fourth code digit: 4' : 'Some pairs do not match. Check the descriptions again.');
});

const puzzlePieces = document.querySelector('#puzzle-pieces');
let puzzleState = [2, 6, 11, 1, 15, 8, 4, 13, 10, 3, 16, 7, 12, 5, 9, 14];
let selectedIndex = null;
function renderPuzzle() {
  puzzlePieces.innerHTML = '';
  puzzleState.forEach((pieceNumber, index) => {
    const piece = document.createElement('button');
    piece.type = 'button';
    piece.className = 'puzzle-piece';
    piece.dataset.piece = pieceNumber;
    piece.setAttribute('aria-label', `Photo fragment ${pieceNumber}`);
    if (selectedIndex === index) piece.classList.add('selected');
    piece.addEventListener('click', () => {
      if (selectedIndex === null) {
        selectedIndex = index;
      } else if (selectedIndex !== index) {
        [puzzleState[selectedIndex], puzzleState[index]] = [puzzleState[index], puzzleState[selectedIndex]];
        selectedIndex = null;
      }
      renderPuzzle();
    });
    puzzlePieces.append(piece);
  });
}
renderPuzzle();
document.querySelector('.check-task[data-check="5"]').addEventListener('click', () => {
  const correct = puzzleState.every((pieceNumber, index) => pieceNumber === index + 1);
  showResult(5, correct, correct ? 'Puzzle complete! Fifth code digit: 7' : 'The puzzle is not complete. Swap some fragments and try again.');
});

document.querySelector('.check-task[data-check="6"]').addEventListener('click', () => {
  const correct = ['nature', 'conservation', 'protection'].includes(normalize(document.querySelector('#crossword-answer').value));
  showResult(6, correct, correct ? 'Crossword solved. Sixth code digit: 1' : 'The key word is incorrect. Check the first letters of the answers.');
});

document.querySelectorAll('.sorting-items button').forEach((item) => {
  item.addEventListener('dragstart', (event) => event.dataTransfer.setData('text/plain', item.textContent));
  item.addEventListener('click', () => {
    if (item.parentElement.classList.contains('waste-bin')) {
      document.querySelector('#sorting-items').append(item);
      delete item.dataset.bin;
      item.classList.remove('sorted', 'correct', 'incorrect');
      return;
    }
    document.querySelectorAll('.waste-bin').forEach((bin) => bin.classList.remove('selected'));
    item.classList.toggle('selected');
  });
});
const sortingItems = document.querySelector('#sorting-items');
sortingItems.addEventListener('dragover', (event) => event.preventDefault());
sortingItems.addEventListener('drop', (event) => {
  event.preventDefault();
  const item = [...document.querySelectorAll('#task-7 button[data-waste]')].find((candidate) => candidate.textContent === event.dataTransfer.getData('text/plain'));
  if (item) {
    sortingItems.append(item);
    delete item.dataset.bin;
    item.classList.remove('sorted', 'correct', 'incorrect');
  }
});
document.querySelectorAll('.waste-bin').forEach((bin) => {
  bin.addEventListener('dragover', (event) => event.preventDefault());
  bin.addEventListener('drop', (event) => {
    event.preventDefault();
    const item = [...document.querySelectorAll('#task-7 button[data-waste]')].find((candidate) => candidate.textContent === event.dataTransfer.getData('text/plain'));
    if (item) { item.dataset.bin = bin.dataset.bin; item.classList.add('sorted'); item.classList.remove('correct', 'incorrect'); bin.append(item); }
  });
  bin.addEventListener('click', () => {
    const item = document.querySelector('.sorting-items button.selected');
    if (item) { item.dataset.bin = bin.dataset.bin; item.classList.add('sorted'); item.classList.remove('selected', 'correct', 'incorrect'); bin.append(item); }
  });
});
document.querySelector('.check-task[data-check="7"]').addEventListener('click', () => {
  const items = [...document.querySelectorAll('#task-7 button[data-waste]')];
  items.forEach((item) => {
    const correct = item.dataset.bin === item.dataset.waste;
    item.classList.toggle('correct', correct);
    item.classList.toggle('incorrect', !correct);
  });
  const correct = items.length === 6 && items.every((item) => item.dataset.bin === item.dataset.waste);
  showResult(7, correct, correct ? 'Sorting complete! Seventh code digit: 3' : 'Some items are in the wrong bins. Check the sorting.');
});

document.querySelector('#open-vault').addEventListener('click', () => {
  const result = document.querySelector('#vault-result');
  const bird = document.querySelector('#vault-bird');
  const correct = document.querySelector('#vault-code').value === '5284713';
  result.textContent = correct ? 'Success! The green oasis of the Kirov Region is safe.' : 'Incorrect code. Access denied.';
  result.className = `task-result ${correct ? 'success' : 'error'}`;
  bird.classList.remove('landed');
  if (correct) requestAnimationFrame(() => bird.classList.add('landed'));
});

updateProgress();
