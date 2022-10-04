window.onload = function () {
    //Elementos da paleta
    const colorOne = document.getElementById('colorOne');
    const colorTwo = document.getElementById('colorTwo');
    const colorTree = document.getElementById('colorTree');
    const colorFor = document.getElementById('colorFor');
    //Botao
    const btnSortColor = document.querySelector('#button-random-color');
    //Seta cores aleatorias para a paleta
    btnSortColor.addEventListener('click', function () {
        colorTwo.style.backgroundColor = colorRandom();
        colorTree.style.backgroundColor = colorRandom();
        colorFor.style.backgroundColor = colorRandom();
    });
    //Gera cores Hexa aleatorias
    function colorRandom(){
        const parts = '0123456789ABCDEF';
        let color = '#';
        for (let cont = 0; cont < 6; cont++) {
        color += parts[Math.floor(Math.random() * 16)];
        }
        return color; 
    }
}
//Nota: Hexa vai de 0-9 e A-F e tem 6 partes