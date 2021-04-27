(() => {
  "use strict";

  let deck = [];
  const tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"];

  let puntosJugadores = [];

  //referencias HTML
  const btnPedir = document.querySelector("#btnPedir"),
    btnDetener = document.querySelector("#btnDetener"),
    btnNuevo = document.querySelector("#btnNuevo");
  const divCartasJugadores = document.querySelectorAll(".div-cartas"),
    puntosHTML = document.querySelectorAll("small");

  //Funcion de inicializacio del juego
  const inicializarJuego = (numJugadores = 2) => {
    crearDeck();
    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }
    console.clear();
    puntosHTML.forEach(elem => elem.innerText=0);
    divCartasJugadores.forEach(elem => elem.innerHTML="");
    btnPedir.disabled = false;
    btnDetener.disabled = false;
  };

  // Creacion de un nuevo deck
  const crearDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
      for (const tipo of tipos) {
        deck.push(i + tipo);
      }
    }

    for (const esp of especiales) {
      for (const tipo of tipos) {
        deck.push(esp + tipo);
      }
    }
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
  };

  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No quedan mas cartas ";
    }
    return deck.pop();
  };

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  };

  // Para turno 0 => Primer jugador y el ultimo es la computadora
  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] += valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  };

  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement("img");

    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugadores[turno].append(imgCarta);
  };

  const determinarGanador = ()=>{
      const [puntosMinimos,puntosComputadora] = puntosJugadores;
    setTimeout(() => {
        if (puntosMinimos === puntosComputadora) {
          alert("Nadie ha ganado");
        } else if (puntosMinimos > 21) {
          alert("Perdiste");
        } else if (puntosComputadora > 21) {
          alert("Felicidades! haz ganado");
        } else {
          alert("Perdiste");
        }
      }, 30);
  }
  //Turno Computadora
  const turnoComputadora = (puntosMinimos) => {
    const carta = pedirCarta();
    let puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
    do {
      if (puntosComputadora == 21) {
        break;
      }

      crearCarta(carta, puntosJugadores.length - 1);

      if (puntosMinimos > 21) {
        break;
      }
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
    determinarGanador();
  };

  //Eventos

  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    let puntosJugador = acumularPuntos(carta, 0);
    crearCarta(carta, 0);
    if (puntosJugador > 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador == 21) {
      btnPedir.disabled = true;
      console.log("Genial, 21");
      turnoComputadora(puntosJugador);
    }
  });

  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugadores[0]);
  });

  btnNuevo.addEventListener("click", () => {
    inicializarJuego();
  });
})();
