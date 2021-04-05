var cartaPaulo = {
    nome: "Seiya de Pegaso",
    imagem: "https://i.pinimg.com/originals/c2/1a/ac/c21aacd5d092bf17cfff269091f04606.jpg",
    atributos: {
        ataque: 80,
        defesa: 60,
        magia: 90
    }
}

var cartaRafa = {
    nome: "Bulbasauro",
    imagem: "http://4.bp.blogspot.com/-ZoCqleSAYNc/UQgfMdobjUI/AAAAAAAACP0/s_iiWjmw2Ys/s1600/001Bulbasaur_Dream.png",
    atributos: {
        ataque: 70,
        defesa: 65,
        magia: 85
    }
}

var cartaGui = {
    nome: "Lorde Darth Vader",
    imagem: "https://images-na.ssl-images-amazon.com/images/I/51VJBqMZVAL._SX328_BO1,204,203,200_.jpg",
    atributos: {
        ataque: 88,
        defesa: 62,
        magia: 90
    }
}

var cartaLol = {
    nome: "Caitlyn",
    imagem: "http://1.bp.blogspot.com/-K7CbqWc1-p0/VLc98v85s0I/AAAAAAAABqk/-ZB684VVHbg/s1600/Caitlyn_OriginalSkin.jpg",
    atributos: {
        ataque: 95,
        defesa: 40,
        magia: 10
    }
}

var cartaNaruto = {
    nome: "Naruto",
    imagem: "https://conteudo.imguol.com.br/c/entretenimento/16/2017/06/27/naruto-1498593686428_v2_450x337.png",
    atributos: {
        ataque: 80,
        defesa: 60,
        magia: 100
    }
}

var cartaHarry = {
    nome: "Harry Potter",
    imagem: "https://sm.ign.com/ign_br/screenshot/default/89ff10dd-aa41-4d17-ae8f-835281ebd3fd_49hp.jpg",
    atributos: {
        ataque: 70,
        defesa: 50,
        magia: 95
    }
}

var cartaBatman = {
    nome: "Batman",
    imagem: "https://assets.b9.com.br/wp-content/uploads/2020/09/Batman-issue86-heder-1280x677.jpg",
    atributos: {
        ataque: 95,
        defesa: 70,
        magia: 0
    }
}

var cartaMarvel = {
    nome: "Capitã Marvel",
    imagem: "https://cinepop.com.br/wp-content/uploads/2018/09/capitamarvel21.jpg",
    atributos: {
        ataque: 90,
        defesa: 80,
        magia: 0
    }
}

var cartaMaquina
var cartaJogador
var cartas = [cartaPaulo, cartaRafa, cartaGui, cartaLol, cartaNaruto, cartaHarry, cartaBatman, cartaMarvel]
var deckJogador = []
var deckMaquina = []
//            0           1           2          3         4            5            6           7     

var pontosJogador = 0
var pontosMaquina = 0
var vezMaquina = false

distribuiCartas()
atualizaQuantidadeDeCartas()

function distribuiCartas() {
  while (cartas.length) {
    var numeroCartaMaquina = parseInt(Math.random() * cartas.length)
    deckMaquina.push(cartas[numeroCartaMaquina])
    cartas.splice(numeroCartaMaquina, 1)
    var numeroCartaJogador = parseInt(Math.random() * cartas.length)
    deckJogador.push(cartas[numeroCartaJogador])
    cartas.splice(numeroCartaJogador, 1)
  }
}

function atualizaQuantidadeDeCartas() {
  var divQuantidadeCartas = document.getElementById('quantidade-cartas')
  var html = "Suas cartas: " + deckJogador.length + "<br>Cartas da máquina: " + deckMaquina.length
  divQuantidadeCartas.innerHTML = html
}

function sortear() {
    if (vezMaquina) sortearCarta(false)
    else sortearCarta(true)
    document.getElementById('form').classList.remove('oculto')
    document.getElementById('btnSortear').classList.add('oculto')
    document.getElementById('btnJogar').classList.remove('oculto')
}

function sortearCarta(jogador) {
    cartaMaquina = deckMaquina.shift()
    cartaJogador = deckJogador.shift()

    if (jogador) {
        exibeCartaJogador(true)
        var btnJogar = document.getElementById('btnJogar')
        btnJogar.innerHTML = 'Jogar'
    } else {
        exibeCartaMaquina()
        var btnJogar = document.getElementById('btnJogar')
        btnJogar.innerHTML = 'Ver jogada'
    }
}

function exibeCartaJogador(vezJogador) {
    var divCartaJogador = document.getElementById("carta-jogador")
    var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
    divCartaJogador.style.backgroundImage = `url(${cartaJogador.imagem})`
    var nome = `<p class="carta-subtitle">${cartaJogador.nome}</p>`
    var opcoesTexto = ""

    if (vezJogador) {
        for (var atributo in cartaJogador.atributos) {
            opcoesTexto += "<input type='radio' name='atributo' value='" + atributo + "'>" + atributo + " " + cartaJogador.atributos[atributo] + "<br>"
        }
    } else {
        for (var atributo in cartaJogador.atributos) {
            opcoesTexto += `<p>${atributo}: ${cartaJogador.atributos[atributo]}</p>`
        }
    }

    var html = "<div id='opcoes' class='carta-status'>"

    divCartaJogador.innerHTML = moldura + nome + html + opcoesTexto + '</div>'
}

function obtemAtributoSelecionado() {
    var radioAtributo = document.getElementsByName('atributo')
    for (var i = 0; i < radioAtributo.length; i++) {
        if (radioAtributo[i].checked) {
            return radioAtributo[i].value
        }
    }
}

function jogar() {
    if (vezMaquina) jogarMaquina()
    else jogarJogador()
}

function jogarJogador() {
    var divResultado = document.getElementById("resultado")
    var atributoSelecionado = obtemAtributoSelecionado()
    document.getElementById('btnJogar').classList.add('oculto')

    if (cartaJogador.atributos[atributoSelecionado] > cartaMaquina.atributos[atributoSelecionado]) {
        htmlResultado = '<p class="resultado-final">Jogador vence</p>'
        deckJogador.push(cartaJogador)
        deckJogador.push(cartaMaquina)
    } else if (cartaJogador.atributos[atributoSelecionado] < cartaMaquina.atributos[atributoSelecionado]) {
        htmlResultado = '<p class="resultado-final">Máquina vence</p>'
        var btnJogoMaquina = document.getElementById('btnSortear')
        vezMaquina = true
        btnJogoMaquina.innerHTML = "Ver jogada da máquina"
        deckMaquina.push(cartaMaquina)
        deckMaquina.push(cartaJogador)
    } else {
        htmlResultado = '<p class="resultado-final">Empatou</p>'
        deckMaquina.push(cartaMaquina)
        deckJogador.push(cartaJogador)
    }
  
    exibeCartaMaquina()
    atualizaQuantidadeDeCartas()
  
    if (!(deckMaquina.length) || !(deckJogador.length)) {
      alert("Fim de jogo")
      if (deckJogador.length) {
        htmlResultado = '<p class="resultado-final">Vencedor</p>'
      } else {
        htmlResultado = '<p class="resultado-final">Perdedor</p>'
      } 
      document.getElementById('btnProximaRodada').classList.add('oculto')
    } else {
        document.getElementById('btnProximaRodada').classList.remove('oculto')
    }

    divResultado.innerHTML = htmlResultado



}

function jogarMaquina() {
    var divResultado = document.getElementById("resultado")
    var atributoSelecionado = undefined

    for (var atributo in cartaMaquina.atributos) {
        if (atributoSelecionado == undefined) atributoSelecionado = atributo
        else if (cartaMaquina.atributos[atributo] > cartaMaquina.atributos[atributoSelecionado]) atributoSelecionado = atributo
    }
    document.getElementById('btnJogar').classList.add('oculto')
    document.getElementById('atributo-maquina').innerHTML = `<p class="resultado-final">Atributo escolhido: ${atributoSelecionado}</p>`

    if (cartaJogador.atributos[atributoSelecionado] > cartaMaquina.atributos[atributoSelecionado]) {
        htmlResultado = '<p class="resultado-final">Jogador vence</p>'
        var btnJogoMaquina = document.getElementById('btnSortear')
        btnJogoMaquina.innerHTML = "Jogar"
        vezMaquina = false
        deckJogador.push(cartaJogador)
        deckJogador.push(cartaMaquina)
    } else if (cartaJogador.atributos[atributoSelecionado] < cartaMaquina.atributos[atributoSelecionado]) {
        htmlResultado = '<p class="resultado-final">Máquina vence</p>'
        deckMaquina.push(cartaMaquina)
        deckMaquina.push(cartaJogador)
    } else {
        htmlResultado = '<p class="resultado-final">Empatou</p>'
        deckMaquina.push(cartaMaquina)
        deckJogador.push(cartaJogador)
    }
  
    exibeCartaJogador(false)
    atualizaQuantidadeDeCartas()
  
    if (!(deckMaquina.length) || !(deckJogador.length)) {
      alert("Fim de jogo")
      if (deckJogador.length) {
        htmlResultado = '<p class="resultado-final">Você venceu</p>'
      } else {
        htmlResultado = '<p class="resultado-final">Você perdeu</p>'
      } 
    } else {
        document.getElementById('btnProximaRodada').classList.add('oculto')
    }

    divResultado.innerHTML = htmlResultado
    document.getElementById('btnProximaRodada').classList.remove('oculto')


}

function exibeCartaMaquina() {
    var divCartaMaquina = document.getElementById("carta-maquina")
    var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
    divCartaMaquina.style.backgroundImage = `url(${cartaMaquina.imagem})`
    var nome = `<p class="carta-subtitle">${cartaMaquina.nome}</p>`
    var opcoesTexto = ""

    for (var atributo in cartaMaquina.atributos) {
        opcoesTexto += "<p>" + atributo + " " + cartaMaquina.atributos[atributo] + "</p>"
    }

    var html = "<div id='opcoes' class='carta-status --spacing'>"

    divCartaMaquina.innerHTML = moldura + nome + html + opcoesTexto + '</div>'
}

function proximaRodada() {
  var divCartas = document.getElementById('cartas')
  
  divCartas.innerHTML = `<div id="carta-jogador" class="carta"></div><div id="carta-maquina" class="carta"></div>`

  document.getElementById('btnSortear').classList.remove('oculto')
  document.getElementById('form').classList.add('oculto')
  document.getElementById('btnProximaRodada').classList.add('oculto')
  
  document.getElementById('resultado').innerHTML = ''
  document.getElementById('atributo-maquina').innerHTML = ''
}