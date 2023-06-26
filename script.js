const colorPalette = document.getElementsByClassName('color');
const blackColorPalette = document.getElementsByClassName('black')[0];
const randomColorPalette = document.getElementsByClassName('cor-aleatoria');
const pixelBoard = document.getElementById('pixel-board');
const clearButton = document.getElementById('clear-board');
const generateBoardBtn = document.getElementById('generate-board');
const boardSize = document.getElementById('board-size');
const inputWrapper = document.querySelector('.input-wrapper');
const hoverDescription = inputWrapper.querySelector('.description');
const refreshColorsBtn = document.getElementById('refresh-colors');

const createPallete = () => {
  Array.from(randomColorPalette).forEach((item) => {
    const newColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    const color = item;
    color.style.backgroundColor = newColor;
  });
};
createPallete();

const selectBlackColor = () => {
  blackColorPalette.style.backgroundColor = 'black';
  blackColorPalette.classList.add('selected');
  blackColorPalette.classList.add('border');
};
selectBlackColor();

const createPixels = (n) => {
  for (let i = 0; i < n * n; i += 1) {
    const pixels = document.createElement('div');
    pixels.classList.add('pixel');
    const boardWidth = 44 * n;
    pixelBoard.style.width = `${boardWidth}px`;
    pixelBoard.appendChild(pixels);
  }
};
createPixels(5);

const removeSelected = (color) => {
  Array.from(colorPalette).forEach((color2) => {
    if (color2 !== color && color2.classList.contains('selected')) {
      color2.classList.remove('selected');
      color2.classList.remove('border');
    }
  });
};

const addSelected = (color) => {
  if (!color.classList.contains('selected')) {
    color.classList.add('selected');
    color.classList.add('border');
    removeSelected(color);
  }
};

const selectColor = () => {
  Array.from(colorPalette).forEach((color) => {
    color.addEventListener('click', () => {
      addSelected(color);
    });
  });
};
selectColor();

const hover = () => {
  let isMouseDown = false;

  document.addEventListener('mousedown', () => {
    isMouseDown = true;
  });

  document.addEventListener('mouseup', () => {
    isMouseDown = false;
  });

  pixelBoard.addEventListener('mouseover', (e) => {
    if (isMouseDown) {
      const selectedColor = document.getElementsByClassName('selected')[0];
      if (e.target !== document.getElementById('pixel-board')) {
        e.target.style.backgroundColor = selectedColor.style.backgroundColor;
      }
    }
  });
};

const applyColor = () => {
  pixelBoard.addEventListener('click', (e) => {
    hover();
    const selectedColor = document.getElementsByClassName('selected')[0];
    if (e.target !== document.getElementById('pixel-board')) {
      e.target.style.backgroundColor = selectedColor.style.backgroundColor;
    }
  });
};
applyColor();

const clearBoard = () => {
  clearButton.addEventListener('click', () => {
    const pixels = document.querySelectorAll('.pixel');
    Array.from(pixels).forEach((item) => {
      const pixel = item;
      pixel.style.backgroundColor = '#fff';
    });
  });
};
clearBoard();

const clearPixel = () => {
  const pixels = document.querySelectorAll('.pixel');
  Array.from(pixels).forEach((pixel) => {
    pixel.addEventListener('dblclick', (e) => {
      e.target.style.backgroundColor = '#fff';
    });
  });
};
clearPixel();

const clearPixelBoard = () => {
  while (pixelBoard.hasChildNodes()) {
    pixelBoard.removeChild(pixelBoard.lastChild);
  }
};

const newPixelBoard = () => {
  generateBoardBtn.addEventListener('click', () => {
    clearPixelBoard();
    let newBoard = boardSize.value;

    if (newBoard === '' || newBoard < 1) {
      alert('Board inválido!');
      boardSize.value = '';
    }
    if (newBoard > 40) {
      newBoard = 40;
      boardSize.value = 40;
    }

    createPixels(newBoard);
    clearPixel();
  });
};
newPixelBoard();

const inputDescription = () => {
  inputWrapper.addEventListener('mouseenter', () => {
    hoverDescription.style.display = 'block';
  });

  inputWrapper.addEventListener('mouseleave', () => {
    hoverDescription.style.display = 'none';
  });
};
inputDescription();

const generateNewColors = () => {
  refreshColorsBtn.addEventListener('click', () => {
    createPallete();
  });
};
generateNewColors();
