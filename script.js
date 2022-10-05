window.onload = function () {
    //Elementos da paleta
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

    //Seta  a cor de fundo dos elemntos
    function setColor(paletaDeCores){
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
        if(localStorage.length === 0){
            let coresUsadas = ['#ff0000','#ffff00','#0000ff'];
            setColor(coresUsadas);
        }else{
            let coresUsadas = JSON.parse(localStorage.getItem("colorPalette"))
            setColor(coresUsadas);
        }
    }

}
//Nota: Hexa vai de 0-9 e A-F e tem 6 partes