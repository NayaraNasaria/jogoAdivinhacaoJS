const btnIniciar = document.querySelector("#btnIniciar");
const txtVitorias = document.querySelector(".vitorias");
const txtDerrotas = document.querySelector(".derrotas");

const tentativas = 3;
let derrotas = 0;
let vitorias = 0;

btnIniciar.addEventListener("click", iniciarJogo);

function iniciarJogo() {
  let contadorErro = 0;
  let numeroSorteado = sortearNumero();
  console.log(numeroSorteado);

  let numero;
  let numerosDigitados = [];

  do {
    const mensagem = obterMsgDigiteNumero(numerosDigitados, contadorErro);
    numero = window.prompt(mensagem);

    numeroInvalido(numero);
    while (numeroInvalido(numero)) {
      numero = window.prompt(`Número ${numero} é inválido, digite outro:`);
    }

    while (numeroDuplicado(numerosDigitados, numero)) {
      numero = window.prompt(
        `Número ${numero} já foi informado, digite outro:`
      );
    }

    numerosDigitados.push(numero);

    if (numero != numeroSorteado) {
      contadorErro++;
    }
  } while (numero != numeroSorteado && contadorErro < tentativas);

  atualizarPlacar(contadorErro);
  finalizarRodada(contadorErro, numeroSorteado);
}

function sortearNumero() {
  return Math.ceil(Math.random() * 10);
}

function numeroInvalido(numero) {
  return !numero || numero < 1 || numero > 10;
}

function numeroDuplicado(numerosDigitados, numero) {
  return numerosDigitados.findIndex((n) => n == numero) > -1;
}

function atualizarPlacar(contadorErro) {
  if (contadorErro == 3) {
    derrotas++;
    txtDerrotas.innerText = derrotas;
  } else {
    vitorias++;
    txtVitorias.innerText = vitorias;
  }
}

function finalizarRodada(contadorErro, numeroSorteado) {
  btnIniciar.innerHTML = "Iniciar Novamente?";
  let mensagem =
    contadorErro < 3
      ? "Você acertou, parabéns!"
      : "Você errou, número sorteado: " + numeroSorteado;
  alert(mensagem);
}

function obterMsgDigiteNumero(numerosDigitados, contadorErro) {
  let tentativasRestantes = tentativas - contadorErro;
  let mensagem =
    numerosDigitados.length > 0
      ? "Você já digitou " +
        numerosDigitados.join(" - ") +
        "\n" +
        "Ainda restam: " +
        tentativas +
        " tentativas"
      : "Você tem " + tentativas + " tentativa(s) \nDigite um número";
  return mensagem;
}
