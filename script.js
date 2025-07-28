document.addEventListener('DOMContentLoaded', function () {
  const cellsBoard = document.querySelector('.cells-board');
  if (!cellsBoard) {
    console.error('Элемент .cells-board не найден.');
    return;
  }

  let originalState = cellsBoard.innerHTML;
  const playButton = document.getElementById('playButton');
  let isFirstPlay = true;

  function attachCellClickListeners() {
    const cells = document.querySelectorAll('.cells-board .cell');
    cells.forEach(cell => {
      cell.addEventListener('click', () => {
        cell.style.transform = 'scale(0.7)';
        setTimeout(() => {
          cell.style.transform = 'scale(1)';
        }, 200);
      });
    });
  }

  if (playButton) {
    playButton.addEventListener('click', function () {
      playButton.disabled = true;

      let cells = document.querySelectorAll('.cells-board .cell');

      if (!isFirstPlay) {
        cellsBoard.innerHTML = originalState;
        attachCellClickListeners();
        cells = document.querySelectorAll('.cells-board .cell');
      }

      const totalToMark = 25;
      const selectedIndices = [];

      while (selectedIndices.length < totalToMark) {
        const randomIndex = Math.floor(Math.random() * cells.length);
        if (!selectedIndices.includes(randomIndex)) {
          selectedIndices.push(randomIndex);
        }
      }

      // Разделяем: первые 24 — звёзды, последний — крест
      const starIndices = selectedIndices.slice(0, 24);
      const crossIndex = selectedIndices[24];

      starIndices.forEach(index => {
        const cell = cells[index];
        cell.innerHTML = '';
        const starImg = document.createElement('img');
        starImg.setAttribute('width', '40');
        starImg.setAttribute('height', '40');
        starImg.src = 'img/star.png';
        starImg.classList.add('star-animation', 'fade-in');
        cell.appendChild(starImg);
      });

// Добавляем крест
// Добавляем крест
const crossCell = cells[crossIndex];
crossCell.innerHTML = ''; // очищаем
crossCell.style.position = 'relative'; // Ячейка — относительный контейнер

const crossImg = document.createElement('img');
crossImg.src = 'img/cross.png';
crossImg.width = 40;
crossImg.height = 40;
crossImg.classList.add('cross-animation', 'fade-in');

// Абсолютное позиционирование по центру
crossImg.style.position = 'absolute';
crossImg.style.top = '50%';
crossImg.style.left = '50%';
crossImg.style.transform = 'translate(-50%, -50%)';
crossImg.style.zIndex = '2';

crossCell.appendChild(crossImg); // ← ЭТО ОБЯЗАТЕЛЬНО!
      playButton.disabled = false;
      if (isFirstPlay) isFirstPlay = false;
    });
  }
});
