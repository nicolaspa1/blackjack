
let deck = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0,
    puntosComputadora = 0;

//referencias HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const puntosHTML = document.querySelectorAll('small');

const crearDeck = ()=>{
    for(let i = 2; i <= 10; i++){
        for (const tipo of tipos) {
            deck.push(i+tipo);
        }
    }

    for (const esp of especiales) {
        for (const tipo of tipos) {
            deck.push(esp+tipo);
        }
    }
    deck = _.shuffle(deck);
    console.log(deck)
    return deck;
}

crearDeck();

const pedirCarta = ()=>{
    if(deck.length === 0){
        throw 'No quedan mas cartas ';
    }
    const carta = deck.pop();
    return carta;
}


const valorCarta = (carta)=>{
    const valor = carta.substring(0,carta.length-1);
    return (isNaN(valor)) ? 
           ((valor==='A') ? 11 :10) : valor*1;
    
}

//Turno Computadora
const turnoComputadora = (puntosMinimos)=>{
    do {
        if(puntosComputadora==21){
            break;
        }
        const carta  = pedirCarta();
        puntosComputadora += valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);
        if(puntosMinimos>21){
            break;
        }
    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos<=21));
    
    setTimeout(()=>{ 
    if(puntosJugador === puntosComputadora){
         alert('Nadie ha ganado');
    }else if(puntosJugador >21){
         alert('Perdiste');
    }
    else if(puntosComputadora >21){
        alert('Felicidades! haz ganado');
   }
  else {
    alert('Perdiste');
}},20);

}

//Eventos

btnPedir.addEventListener('click',()=>{
    const carta  = pedirCarta();
    puntosJugador += valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if(puntosJugador > 21){
        btnPedir.disabled = true;
        btnDetener.disabled=true;
        turnoComputadora(puntosJugador);
    }else if(puntosJugador == 21){
        btnPedir.disabled = true;
        console.log('Genial, 21');
        turnoComputadora(puntosJugador);
        }
});

btnDetener.addEventListener('click',()=>{
    btnPedir.disabled=true;
    btnDetener.disabled=true;
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click',()=>{
    console.clear();
    deck = [];
    deck = crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHTML[0].innerText=0;
    puntosHTML[1].innerText=0;
    divCartasComputadora.innerHTML='';
    divCartasJugador.innerHTML = '';
    btnPedir.disabled = false;
    btnDetener.disabled=false;
});
