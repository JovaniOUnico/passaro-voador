import { Objeto, Personagem, Plataforma, Grupo, Placar } from './objeto.js';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

console.log('[JovaniOUnico] Passaro Voador');

//criando som de colisão
const som_HIT = new Audio();
som_HIT.src = './sons/efeitos_hit.wav';

const som_POINT = new Audio();
som_POINT.src = './sons/efeitos_ponto.wav';

const som_JUMP = new Audio();
som_JUMP.src = './sons/efeitos_pulo.wav';

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
    placar: new Placar(),
    frames: 0,

    //grupo Canos
    canos: new Grupo(),
    desenha() {

      //desenho fundo
      contexto.fillStyle = '#70c5ce';
      contexto.fillRect(0, 0, canvas.width, canvas.height);
    },
    click() {
      this.passaro.pula();
    },
    atualiza() {
      this.bg.desenha(contexto);
      this.passaro.desenha(contexto);

      //canos
      this.canos.desenha(contexto);
      this.chao.desenha(contexto);

      //verifica colisão com o teto
      if(this.passaro.y < 0){
        this.passaro.colisaoSom.play();
        Telas.mudaTela(Telas.gameOver);
        return;
      }

      //verifica colisão com o chão
      if(Objeto.colisaoVerificaY(this.passaro, this.chao)){
        Telas.mudaTela(Telas.gameOver);
        return;
      }

      //habilita a queda do passáro
      this.passaro.queda();

      this.chao.movimenta();
      this.bg.movimenta();

      let self = this;
      this.canos.objetosLista.forEach(function (obj, index){

        if(obj.objetosLista[0].x < (0 - obj.objetosLista[0].largura)){

          let Ty = getRandomInt(100, self.chao.y - 20);
          let Sy = (Ty - 100 - obj.objetosLista[0].altura);

          obj.objetosLista[0].initPosY(Sy);
          obj.objetosLista[1].initPosY(Ty);

          //coloca o subgrupo de canos no final da tela
          obj.initPosX(contexto.width + obj.objetosLista[0].largura + 280);
        }else{
          obj.sumPosX(-1);
        }

      });

      //verifica colisão passaro
      this.canos.objetosLista.forEach(function (obj, index){

        //verifica se ja entrou no x de um dos canos
        if((self.passaro.x + self.passaro.largura) > obj.objetosLista[0].x){
          obj.objetosLista.forEach( function(subObj, index){
            //colisão y cano céu
            if(index == 0){
              if( self.passaro.y <= subObj.y + subObj.altura){
                self.passaro.colisaoSom.play();
                Telas.mudaTela(Telas.gameOver);
                return;
              }
            }

            //colisão y cano chão
            if(index == 1){
              if((self.passaro.y + self.passaro.altura) >= subObj.y){
                self.passaro.colisaoSom.play();
                Telas.mudaTela(Telas.gameOver);
                return;
              }
            }
          });
        }
      });

      const intervaloFrames = 280;
      const passouIntervalo = (this.frames+1) % intervaloFrames === 0;
  
      if(passouIntervalo){
        this.placar.pontuacao++;
        som_POINT.play();
      }

      this.placar.desenha(contexto, contexto.width, 40);
      this.frames++;
    },
    inicializa() {

      this.passaro.desenha(contexto);

      //ativa a colisão do passaro
      this.passaro.habilitarColisao();
      this.passaro.somColisao(som_HIT);
      this.passaro.somPulo(som_JUMP);

      this.canos = new Grupo();
      this.placar = new Placar();
      this.frames = 0;

      let qtdCanos = 4;

      //cria os 4 subgrupos de canos para o gruo canos com espaçamentos ja preparados
      for(let i = 0; i < qtdCanos; i++){
        let SubGrupoCano = new Grupo();

        let canoCeu1 = new Objeto(sprite, 52, 169, 52, 400);
        let canoChao1 = new Objeto(sprite, 0, 169, 52, 400);

        let Ty = getRandomInt(100, this.chao.y - 20);
        let Sy = (Ty - 100 - canoCeu1.altura);
        canoChao1.desenha(contexto, contexto.width + (i * 180) , Ty);
        canoCeu1.desenha(contexto, contexto.width + (i * 180) , Sy);

        SubGrupoCano.addObjeto(canoCeu1);
        SubGrupoCano.addObjeto(canoChao1);

        this.canos.addObjeto(SubGrupoCano);
      }
    }
  },
  gameOver: {
    telaGameOver: new Objeto(sprite, 133, 150, 228, 204),
    medalhas: [new Objeto(sprite, 0, 78, 45, 45), new Objeto(sprite, 47, 78, 45, 45), new Objeto(sprite, 47, 123, 45, 45), new Objeto(sprite, 0, 123, 45, 45)],
    desenha() { 
      this.telaGameOver.desenha(contexto, contexto.width, contexto.height);
    },
    click() { 
      Telas.mudaTela(Telas.inicio);
    },
    atualiza() {

      this.telaGameOver.desenha(contexto, contexto.width/7, contexto.height/4);

      contexto.font = "28px 'Oswald', sans-serif";
      contexto.fillStyle = 'white';
      contexto.textAlign = 'right';
      contexto.fillText(`${Telas.jogo.placar.pontuacao}`, contexto.width/7 + 200, contexto.height/4 + 103);

      contexto.font = "28px 'Oswald', sans-serif";
      contexto.fillStyle = 'white';
      contexto.textAlign = 'right';
      contexto.fillText(`${Telas.melhorPontuacao}`, contexto.width/7 + 200, contexto.height/4 + 143);

      let med = 0;
      if(Telas.jogo.placar.pontuacao < 5){
        med =0;
      }else if(Telas.jogo.placar.pontuacao >= 5 && Telas.jogo.placar.pontuacao < 10){
        med =1;
      }else if(Telas.jogo.placar.pontuacao >= 10 && Telas.jogo.placar.pontuacao < 25){
        med =2;
      }else{
        med =3;
      }
      this.medalhas[med].desenha(contexto, contexto.width/7 + 26, 210);
    },
    inicializa() { 
      if(Telas.melhorPontuacao <= Telas.jogo.placar.pontuacao){
        Telas.melhorPontuacao = Telas.jogo.placar.pontuacao;
      }
    },
  },
  telaAtiva: {},
  melhorPontuacao: 0,
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