// Adciona classe selected
function addClass(element) {
  element.className = 'color selected';
}
function removeClass(element) {
  element.className = 'color';
}
// Seta  a cor de fundo dos elementos da paleta
function setColor(paletaDeCores) {
  colorOne.style.backgroundColor = '#000000';
  colorTwo.style.backgroundColor = paletaDeCores[0];
  colorTree.style.backgroundColor = paletaDeCores[1];
  colorFor.style.backgroundColor = paletaDeCores[2];
}

// Click em algum elemento da paleta
function clickPaleta() {
  // Elementos da paleta
  const colorOne = document.getElementById('colorOne');
  const colorTwo = document.getElementById('colorTwo');
  const colorTree = document.getElementById('colorTree');
  const colorFor = document.getElementById('colorFor');
  colorOne.addEventListener('click', () => {
    addClass(colorOne);
    removeClass(colorTwo);
    removeClass(colorTree);
    removeClass(colorFor);
  });
  colorTwo.addEventListener('click', () => {
    removeClass(colorOne);
    addClass(colorTwo);
    removeClass(colorTree);
    removeClass(colorFor);
  });
  colorTree.addEventListener('click', () => {
    removeClass(colorOne);
    removeClass(colorTwo);
    addClass(colorTree);
    removeClass(colorFor);
  });
  colorFor.addEventListener('click', () => {
    removeClass(colorOne);
    removeClass(colorTwo);
    removeClass(colorTree);
    addClass(colorFor);
  });
}
// Click em algum botao
function clickButtuns() {
  // Botao
  const btnSortColor = document.querySelector('#button-random-color');
  const btnClearColors = document.querySelector('#clear-board');
  const btnGenerateBoard = document.querySelector('#generate-board');

  // Gera cores aleatorias para a paleta
  btnSortColor.addEventListener('click', () => {
    const paleta = colorRandom();
    setColor(paleta);
    saveColor(paleta);
  });

  // Limpa quadro de pixeis
  btnClearColors.addEventListener('click', () => {
    const pixeis = document.querySelectorAll('.pixel'); 
    pixeisBrancos(pixeis.length);
  });
  btnGenerateBoard.addEventListener('click', () => {
    let valor = document.getElementById('board-size').value;
    localStorage.setItem('board-size', valor);
    adcionaQuadros(valor);
    pixeisBrancos(valor);
    window.location.reload(true);
  });
}



// Gera cores Hexa aleatorias
function colorRandom() {
  const parts = '0123456789ABCDEF';
  const paleta = [];
  for (let bloc = 0; bloc < 3; bloc++) {
    let cor = '#';
    for (let cont = 0; cont < 6; cont++) {
      cor += parts[Math.floor(Math.random() * 16)];
    }
    paleta[bloc] = cor;
  }
  return paleta;
}

// Salva as cores da paleta
function saveColor(palet) {
  localStorage.setItem('colorPalette', JSON.stringify(palet));
}

// Adciona quadro com 25 pixeis
function adcionaQuadros(quantQuadros) {
  const quadroPixel = document.querySelector('#pixel-board');
  const elementDivs = [];
  for (let bloc = 0; bloc < quantQuadros; bloc++) {
    elementDivs[bloc] = document.createElement('div');
    elementDivs[bloc].className = 'pixel';
    quadroPixel.appendChild(elementDivs[bloc]);
  }
  clickQuadros(elementDivs);
}

// Adciona adciona click aos pixeis do quadro
function clickQuadros(blocos) {
  for (let bloc = 0; bloc < blocos.length; bloc++) {
    blocos[bloc].addEventListener('click', () => {
      const corSelecionada = document.querySelector('.selected').style.backgroundColor;
      blocos[bloc].style.backgroundColor = corSelecionada;
      savePixelColor(corSelecionada, bloc);
    });
  }
}
// Salva a cor e a posição do pixel que foi pintado
const pixeisSalvos = [];
function savePixelColor(cor, pixel) {
  const pixelBoard = JSON.parse(localStorage.getItem('pixelBoard'));
  const pixelColorSaved = {
    color: cor,
    position: pixel,
  };
  pixelBoard[pixel] = pixelColorSaved;
  localStorage.setItem('pixelBoard', JSON.stringify(pixelBoard));
}

function loadQuadro() {
  const pixeis = document.querySelectorAll('.pixel');
  const pixeisPintados = JSON.parse(localStorage.getItem('pixelBoard'));
  for (let bloc = 0; bloc < pixeisPintados.length; bloc++) {
    pixeis[bloc].style.backgroundColor = pixeisPintados[bloc].color;
  }
}
// var quantQuadros = document.getElementById("board-size").value;
function setValueDefault() {
  const coresUsadas = ['#ff0000', '#ffff00', '#0000ff'];
  setColor(coresUsadas);
  saveColor(coresUsadas);

  // Seta o tamanho do quadro como 25 pixeis brancos e os coloca no pixelboard
  localStorage.setItem('board-size', 25);
  adcionaQuadros(25);
  pixeisBrancos(25);

}

function pixeisBrancos(quantidaPixeis) {
  const pixeis = document.querySelectorAll('.pixel');
  localStorage.setItem('pixelBoard', JSON.stringify([]));
  for (let bloc = 0; bloc < quantidaPixeis; bloc++) {
    pixeis[bloc].style.backgroundColor = 'white';
    savePixelColor('white', bloc);
  }
}


window.onload = function () {
 
  if (localStorage.length === 0) {
    setValueDefault();
    addClass(colorOne);
  } else {
    // Carrega as cores da paleta
    const paleta = JSON.parse(localStorage.getItem('colorPalette'));
    setColor(paleta);
    addClass(colorOne);
    // Carrega as cores dos quadros dentro do pixel-Board
    const contPixeis = JSON.parse(localStorage.getItem('board-size'));
    adcionaQuadros(contPixeis);
    loadQuadro();
  }
  clickPaleta();
  clickButtuns();
// // Cria os quadros dentro do pixel-Board
//   // const quantQuadros = localStorage.getItem('board-size');
//   // adcionaQuadros(quantQuadros);

};
