import { Objeto, Personagem } from './objeto.js';

console.log('[JovaniOUnico] Passaro Voador');

//criando imagem via javascript
const sprite = new Image();
//pegando a imagem modelo
sprite.src = './sprites.png';

//definido propriedades do canvas
const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const Telas = {
  inicio: {
    msgReady: new Objeto(sprite, 134, 0, 174, 152),
    desenha() {
      Telas.jogo.desenha();

      this.msgReady.desenha(contexto, (canvas.width/2) - this.msgReady.altura / 2, 50);

      window.addEventListener('click', function(){
        if(Telas.telaAtiva.click){
          Telas.telaAtiva.click();
        }
      });
    },
    click() {
      Telas.mudaTela(Telas.jogo);
    },
    atualiza() {      
    }
  },
  jogo: {
    passaro: new Personagem(sprite, 0, 0, 33, 24, 10, 50),
    chao: new Objeto(sprite, 0, 610, 224, 112),
    bg: new Objeto(sprite, 390,0, 275, 204),
    desenha() {

      //desenho fundo
      contexto.fillStyle = '#70c5ce';
      contexto.fillRect(0, 0, canvas.width, canvas.height);

      //desenho do background
      this.bg.desenha(contexto, 0, canvas.height - this.bg.altura);
      this.bg.desenha(contexto, this.bg.largura, canvas.height - this.bg.altura);

      //desenho do chão
      this.chao.desenha(contexto, 0, canvas.height - this.chao.altura);
      this.chao.desenha(contexto, 0 + this.chao.largura, canvas.height - this.chao.altura);

      this.passaro.desenha(contexto);
    },
    atualiza() {
      this.passaro.queda();
    }
  },
  telaAtiva: {},
  mudaTela(novaTela) {
    this.telaAtiva = novaTela;
  }
}

function loop(){

  Telas.telaAtiva.desenha();
  Telas.telaAtiva.atualiza();

  //não sei para que serve ainda!
  //mas faz os quadros serem desenhados
  requestAnimationFrame(loop);
}

Telas.mudaTela(Telas.inicio);
loop();