var tableroOriginal;
const humanoJugador = 'O';
const pcJugador = 'X';
const combosGanadores = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const cells = document.querySelectorAll('.cell');
empezar();

function empezar() {
    document.querySelector(".terminar").style.display = "none"
    tableroOriginal = Array.from(Array(9).keys())
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '',
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnoMover, false);
    }
}

function turnoMover(cuadro) {
    if (typeof tableroOriginal[cuadro.target.id] == 'number'){
        turno(cuadro.target.id, humanoJugador);
        if (!Empate()) turno(MejorLugar(), pcJugador);
    }
  }

function turno(cuadroId, jugador){
    tableroOriginal[cuadroId] = jugador;
    document.getElementById(cuadroId).innerText = jugador;
let juegoGanado = buscarGanador(tableroOriginal, jugador)
if (juegoGanado) juegoPerdido(juegoGanado)
}

function buscarGanador(tablero, jugador) {
    let jugadas = tablero.reduce ((a, e, i) =>
    (e === jugador) ? a.concat(i) : a, []);
    let juegoGanado = null;
    for (let [index, gana] of combosGanadores.entries()) {
       if (gana.every(elem => jugadas.indexOf(elem) > -1)) {
        juegoGanado = {index: index, jugador: jugador};
        break;
       }
    }
    return juegoGanado;
}

function juegoPerdido(juegoGanado){
    for (let index of combosGanadores[juegoGanado.index]) {
        document.getElementById(index).style.backgroundColor = 
        juegoGanado.jugador == humanoJugador ? "blue" : "red";
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnoMover, false);
    }
    declararGanador(juegoGanado.jugador == humanoJugador ? "Ganaste" : "Perdiste");
} 

function cuadroVacio() {
    return tableroOriginal.filter(s => typeof s == 'number');

}

function MejorLugar(){
    return cuadroVacio()[0];
}

function Empate() {
    if (cuadroVacio().length == 0) {
        for (var i = 0; i < cells.length; i++){
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click', turnoMover, false);
        }
        declararGanador("Empate!")
        return true;
    }
    return false;
}

function declararGanador(quien) {
    document.querySelector(".terminar").style.display = "block";
    document.querySelector(".terminar .text").innerText = quien;

}