window.onload = function () {
    //Elementos da paleta
    const colorOne = document.getElementById('colorOne');
    const colorTwo = document.getElementById('colorTwo');
    const colorTree = document.getElementById('colorTree');
    const colorFor = document.getElementById('colorFor');
    //Botao
    const btnSortColor = document.querySelector('#button-random-color');
    //Carrega cores
    loadColor();

    // Gera cores aleatorias para a paleta // Click btn
    btnSortColor.addEventListener('click', function () {
        let paleta = colorRandom();
        setColor(paleta);
        saveColor(paleta);
    });

    //Click em algum elemento da paleta
    colorOne.addEventListener('click', function () {
        addClass(colorOne);
        removeClass(colorTwo);
        removeClass(colorTree);
        removeClass(colorFor);
    });
    colorTwo.addEventListener('click', function () {
        removeClass(colorOne);
        addClass(colorTwo);
        removeClass(colorTree);
        removeClass(colorFor);
    });
    colorTree.addEventListener('click', function () {
        removeClass(colorOne);
        removeClass(colorTwo);
        addClass(colorTree);
        removeClass(colorFor);
    });
    colorFor.addEventListener('click', function () {
        removeClass(colorOne);
        removeClass(colorTwo);
        removeClass(colorTree);
        addClass(colorFor);
    });
    adcionaQuadros();
}
//------Funçoes--------

//Seta  a cor de fundo dos elemntos
function setColor(paletaDeCores){
    colorOne.style.backgroundColor = "#000000";
    colorTwo.style.backgroundColor = paletaDeCores[0];
    colorTree.style.backgroundColor = paletaDeCores[1];
    colorFor.style.backgroundColor = paletaDeCores[2];
}

//Gera cores Hexa aleatorias
function colorRandom(){
    const parts = '0123456789ABCDEF';
    let paleta = [];
    for (let bloc = 0; bloc < 3; bloc++) {
        let cor = '#';
        for (let cont = 0; cont < 6; cont++) {
            cor += parts[Math.floor(Math.random() * 16)];
        }
        paleta[bloc] = cor;
    }
    return paleta; 
}

//Salva as cores da paleta
function saveColor(palet) {
    localStorage.setItem('colorPalette',JSON.stringify(palet));
}

//Carrega as cores da paleta
function loadColor() {
    addClass(colorOne);
    if(localStorage.length === 0){
        let coresUsadas = ['#ff0000','#ffff00','#0000ff'];
        setColor(coresUsadas);
    }else{
        let coresUsadas = JSON.parse(localStorage.getItem("colorPalette"))
        setColor(coresUsadas);
    }
}
//Adciona quadro com 25 pixeis
function adcionaQuadros() {
    const quadroPixel = document.querySelector('#pixel-board');
    let elementDivs = [];
    for(let bloc = 0;bloc < 25;bloc++){
        elementDivs[bloc] = document.createElement('div');
        elementDivs[bloc].className = "pixel";
        quadroPixel.appendChild(elementDivs[bloc]);
    }
    clickQuadros(elementDivs);
}
//Adciona classe Selected
function addClass(element) {
    element.className = "color selected";
}
function removeClass(element) {
    element.className = "color";
}
function clickQuadros(blocos) {
    for(let bloc = 0;bloc < 25;bloc++){
        blocos[bloc].addEventListener('click', function () {
            // let paletaSelecionada = document.querySelector('.selected');
            // let backGround = paletaSelecionada.style.backgroundColor;
            // console.log(backGround);

            blocos[bloc].style.backgroundColor = document.querySelector('.selected').style.backgroundColor;
        });
    }
}
