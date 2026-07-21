function createBoard(gridId) {
  const grid = document.getElementById(gridId);
  grid.innerHTML = '';
  
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.state = 'empty';

    let pressTimer;

    const startPress = () => {
      pressTimer = setTimeout(() => {
        setState(cell, 'sunk');
      }, 500);
    };

    const cancelPress = () => {
      clearTimeout(pressTimer);
    };

    const handleClick = () => {
      clearTimeout(pressTimer);
      const currentState = cell.dataset.state;

      if (currentState === 'empty') {
        setState(cell, 'water');
      } else if (currentState === 'water') {
        setState(cell, 'hit');
      } else if (currentState === 'hit' || currentState === 'sunk') {
        setState(cell, 'empty');
      }
    };

    cell.addEventListener('mousedown', startPress);
    cell.addEventListener('touchstart', startPress, {passive: true});
    
    cell.addEventListener('mouseup', cancelPress);
    cell.addEventListener('touchend', cancelPress);
    cell.addEventListener('mouseleave', cancelPress);

    cell.addEventListener('click', handleClick);

    grid.appendChild(cell);
  }
}

function setState(cell, state) {
  cell.dataset.state = state;
  cell.className = 'cell';

  if (state === 'water') {
    cell.classList.add('water');
    cell.innerText = '~';
  } else if (state === 'hit') {
    cell.classList.add('hit');
    cell.innerText = '✕';
  } else if (state === 'sunk') {
    cell.classList.add('sunk');
    cell.innerText = '☠';
  } else {
    cell.innerText = '';
  }
}

function resetBoards() {
  if (confirm('Spielfelder wirklich zurücksetzen?')) {
    createBoard('grid-enemy');
    createBoard('grid-own');
  }
}

createBoard('grid-enemy');
createBoard('grid-own');