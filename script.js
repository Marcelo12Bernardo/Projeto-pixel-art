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

// Carrega as cores da paleta
function loadColor() {
  const colorOne = document.getElementById('colorOne');
  addClass(colorOne);
  const coresUsadas = JSON.parse(localStorage.getItem('colorPalette'));
  setColor(coresUsadas);
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
  // const btnClearColors = document.querySelector('#clear-board');
  // const btnGenerateBoard = document.querySelector('#generate-board');

  // Gera cores aleatorias para a paleta
  btnSortColor.addEventListener('click', () => {
    const paleta = colorRandom();
    setColor(paleta);
    saveColor(paleta);
  });

  // Limpa quadro de pixeis
  // btnClearColors.addEventListener('click', () => {
  //   const pixeis = document.querySelectorAll('.pixel'); /// /------
  //   // for(let bloc = 0;bloc < pixeis.length;bloc++){
  //   //     pixeis[bloc].style.backgroundColor = "white";
  //   //     savePixelColor('rgb(255, 255, 255)', bloc);
  //   // }
  //   pixeisBrancos(pixeis.length);
  // });
  // Gera qudros
  // btnGenerateBoard.addEventListener('click', () => {
  //   let valor = document.getElementById('board-size').value;
  //   valor *= valor;
  //   localStorage.setItem('board-size', valor);
  //   // var quantQuadros = localStorage.getItem('board-size');
  //   const pixeisExistentes = document.querySelectorAll('.pixel');
  //   for (let cont = 0; cont < pixeisExistentes.length; cont++) {
  //     pixeisExistentes[cont].remove();
  //   }
  //   // pixeisSalvos = [];
  //   // for(let bloc = 0;bloc < valor;bloc++){
  //   //     savePixelColor('white', bloc);
  //   //  }
  //   pixeisBrancos(valor);
  //   adcionaQuadros(valor);
  // });
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
  const pixelColorSaved = {
    color: cor,
    position: pixel,
  };
  pixeisSalvos[pixel] = pixelColorSaved;
  localStorage.setItem('pixelBoard', JSON.stringify(pixeisSalvos));
}

function loadQuadro() {
  const pixel = document.querySelectorAll('.pixel'); 
  const pixeisPintados = JSON.parse(localStorage.getItem('pixelBoard'));
  // console.log(pixeisPintados);
  for (let bloc = 0; bloc < pixeisPintados.length; bloc++) {
    pixel[bloc].style.backgroundColor = pixeisPintados[bloc].color;
  }
}
// var quantQuadros = document.getElementById("board-size").value;
function loadStorege() {
  // Seta cores base pra paleta
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
  for (let bloc = 0; bloc < quantidaPixeis; bloc++) {
    pixeis[bloc].style.backgroundColor = 'white';
    savePixelColor('white', bloc);
  }
}

//----------------------------------MAIN-------------------
window.onload = function () {
  // Inicia o local storege(se necessario)
  if (localStorage.length === 0) {
    loadStorege();
  }
  // Carrega as cores da paleta
  loadColor();
  // Ativa o click dos botoes
  clickButtuns();
  
  // Cria os quadros dentro do pixel-Board
  // const quantQuadros = localStorage.getItem('board-size');
  // adcionaQuadros(quantQuadros);

  // Carrega as cores dos quadros dentro do pixel-Board
  loadQuadro();

  // Ativa o click da paleta de cores
  clickPaleta();

};
