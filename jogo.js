import { Objeto, Personagem, Plataforma } from './objeto.js';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

console.log('[JovaniOUnico] Passaro Voador');

//criando som de colisão
const som_HIT = new Audio();
som_HIT.src = './sons/efeitos_hit.wav';

//criando imagem via javascript
const sprite = new Image();
//pegando a imagem modelo
sprite.src = './sprites.png';

//definido propriedades do canvas
const canvas = document.querySelector('canvas');
var contexto = canvas.getContext('2d');
contexto.width = canvas.width;
contexto.height = canvas.height;

const Telas = {
  inicio: {
    msgReady: new Objeto(sprite, 134, 0, 174, 152),
    desenha() {
      Telas.jogo.desenha();

      this.msgReady.desenha(contexto, (canvas.width/2) - this.msgReady.altura / 2, 50);
      Telas.jogo.bg.desenha(contexto);
      Telas.jogo.chao.desenha(contexto);

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
      Telas.jogo.passaro.desenha(contexto);
      Telas.jogo.chao.movimenta();
      Telas.jogo.bg.movimenta();
    },
    inicializa() {
      Telas.jogo.passaro = new Personagem(sprite, 33, 24, [{spriteX: 0, spriteY: 0},{spriteX: 0, spriteY: 26},{spriteX: 0, spriteY: 52},{spriteX: 0, spriteY: 26}], 10, 50);
      Telas.jogo.chao = new Plataforma(sprite, 0, 610, 224, 112);
      Telas.jogo.bg = new Plataforma(sprite, 390, 0, 275, 204);

      //desenho do background
      Telas.jogo.bg.desenha(contexto, 0, canvas.height - Telas.jogo.bg.altura);
      //desenho do chão
      Telas.jogo.chao.desenha(contexto, 0, canvas.height - Telas.jogo.chao.altura);
      //ativa a colisão do chão
      Telas.jogo.chao.habilitarColisao();
    }
  },
  jogo: {
    passaro: new Personagem(sprite, 33, 24, [{spriteX: 0, spriteY: 0},{spriteX: 0, spriteY: 26},{spriteX: 0, spriteY: 52},{spriteX: 0, spriteY: 26}], 10, 50),
    chao: new Plataforma(sprite, 0, 610, 224, 112),
    bg: new Plataforma(sprite, 390, 0, 275, 204),

    //canos
    canoCeu1: new Objeto(sprite, 52, 169, 52, 400),
    canoChao1: new Objeto(sprite, 0, 169, 52, 400),
    canoCeu2: new Objeto(sprite, 52, 169, 52, 400),
    canoChao2: new Objeto(sprite, 0, 169, 52, 400),
    canoCeu3: new Objeto(sprite, 52, 169, 52, 400),
    canoChao3: new Objeto(sprite, 0, 169, 52, 400),
    canoCeu4: new Objeto(sprite, 52, 169, 52, 400),
    canoChao4: new Objeto(sprite, 0, 169, 52, 400),
    desenha() {

      //desenho fundo
      contexto.fillStyle = '#70c5ce';
      contexto.fillRect(0, 0, canvas.width, canvas.height);

      this.passaro.desenha(contexto);

      //ativa a colisão do passaro
      this.passaro.habilitarColisao();
      this.passaro.somColisao(som_HIT);
    },
    click() {
      this.passaro.pula();
    },
    atualiza() {
      this.bg.desenha(contexto);
      this.chao.desenha(contexto);
      this.passaro.desenha(contexto);

      //canos
      this.canoCeu1.desenha(contexto);
      this.canoChao1.desenha(contexto);
      this.canoCeu2.desenha(contexto);
      this.canoChao2.desenha(contexto);
      this.canoCeu3.desenha(contexto);
      this.canoChao3.desenha(contexto);
      this.canoCeu4.desenha(contexto);
      this.canoChao4.desenha(contexto);

      if(Objeto.colisaoVerificaY(this.passaro, this.chao)){
        setTimeout(() => {
          Telas.mudaTela(Telas.inicio)
        }, 500);
        return;
      }

      this.passaro.queda();

      this.chao.movimenta();
      this.bg.movimenta();

      if(this.canoCeu1.x < (0 - this.canoCeu1.largura)){
        let pos1 = getRandomInt( -this.canoCeu1.altura +100, this.chao.altura - 60);
        this.canoCeu1.initPosY(-190 + pos1);
        this.canoChao1.initPosY(this.canoCeu1.altura + 80 + this.canoCeu1.y);
        this.canoCeu1.initPosX(contexto.width+ this.canoCeu1.largura + 240);
        this.canoChao1.initPosX(contexto.width+ this.canoChao1.largura + 240);
      }else{
        this.canoCeu1.sumPosX(-1);
        this.canoChao1.sumPosX(-1);
      }

      if(this.canoCeu2.x < (0 - this.canoCeu2.largura)){
        let pos2 = getRandomInt( -this.canoCeu2.altura +100, this.chao.altura - 60);
        this.canoCeu2.initPosY(pos2);
        this.canoChao2.initPosY(this.canoCeu2.altura + 80 + this.canoCeu2.y);
        this.canoCeu2.initPosX(contexto.width+ this.canoCeu2.largura + 240);
        this.canoChao2.initPosX(contexto.width+ this.canoChao2.largura + 240);
      }else{
        this.canoCeu2.sumPosX(-1);
        this.canoChao2.sumPosX(-1);
      }

      if(this.canoCeu3.x < (0 - this.canoCeu3.largura)){
        let pos3 = getRandomInt( -this.canoCeu3.altura +100, this.chao.altura - 60);
        this.canoCeu3.initPosY(pos3);
        this.canoChao3.initPosY(this.canoCeu3.altura + 80 + this.canoCeu3.y);
        this.canoCeu3.initPosX(contexto.width + this.canoCeu3.largura + 240);
        this.canoChao3.initPosX(contexto.width + this.canoChao3.largura + 240);
      }else{
        this.canoCeu3.sumPosX(-1);
        this.canoChao3.sumPosX(-1);
      }

      if(this.canoCeu4.x < (0 - this.canoCeu4.largura)){
        let pos4 = getRandomInt( -this.canoCeu4.altura +100, this.chao.altura - 60);
        this.canoCeu4.initPosY(pos4);
        this.canoChao4.initPosY(this.canoCeu4.altura + 80 + this.canoCeu4.y);
        this.canoCeu4.initPosX(contexto.width + this.canoCeu4.largura + 240);
        this.canoChao4.initPosX(contexto.width + this.canoChao4.largura + 240);
      }else{
        this.canoCeu4.sumPosX(-1);
        this.canoChao4.sumPosX(-1);
      }
    },
    inicializa() {
      let pos1 = getRandomInt( -this.canoCeu1.altura +100, this.chao.altura - 60);
      let pos2 = getRandomInt( -this.canoCeu2.altura +100, this.chao.altura - 60);
      let pos3 = getRandomInt( -this.canoCeu3.altura +100, this.chao.altura - 60);
      let pos4 = getRandomInt( -this.canoCeu4.altura +100, this.chao.altura - 60);
      this.canoCeu1.habilitarColisao();
      this.canoCeu2.habilitarColisao();
      this.canoCeu3.habilitarColisao();
      this.canoCeu4.habilitarColisao();

      this.canoCeu1.desenha(contexto, contexto.width + this.canoCeu1.largura + (160 * 1), -190 + pos1);
      this.canoChao1.desenha(contexto, contexto.width + this.canoChao1.largura + (160 * 1), this.canoCeu1.altura + 80 + this.canoCeu1.y);

      this.canoCeu2.desenha(contexto, contexto.width + this.canoCeu2.largura + (160 * 2), -190 + pos2);
      this.canoChao2.desenha(contexto, contexto.width + this.canoChao2.largura + (160 * 2), this.canoCeu2.altura + 80 + this.canoCeu2.y);

      this.canoCeu3.desenha(contexto, contexto.width + this.canoCeu3.largura + (160 * 3), -190 + pos3);
      this.canoChao3.desenha(contexto, contexto.width + this.canoChao3.largura + (160 * 3), this.canoCeu3.altura + 80 + this.canoCeu3.y);

      this.canoCeu4.desenha(contexto, contexto.width + this.canoCeu4.largura + (160 * 4), -190 + pos4);
      this.canoChao4.desenha(contexto, contexto.width + this.canoChao4.largura + (160 * 4), this.canoCeu4.altura + 80 + this.canoCeu4.y);
    }
  },
  telaAtiva: {},
  mudaTela(novaTela) {
    this.telaAtiva = novaTela;
    this.telaAtiva.inicializa();
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