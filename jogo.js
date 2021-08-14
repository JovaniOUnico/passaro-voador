import { Objeto, Personagem } from './objeto.js';

console.log('[JovaniOUnico] Passaro Voador');

//criando imagem via javascript
const sprite = new Image();
//pegando a imagem modelo
sprite.src = './sprites.png';

//definido propriedades do canvas
const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

let passaro = new Personagem(sprite, 0, 0, 33, 24);

//define as posições de inicio do flappy bird
passaro.initPosX(10);
passaro.initPosY(50);

let chao = new Objeto(sprite, 0, 610, 224, 112);

let bg = new Objeto(sprite, 390,0, 275, 204);

function loop(){

  //desenho fundo
  contexto.fillStyle = '#70c5ce';
  contexto.fillRect(0, 0, canvas.width, canvas.height);

  bg.desenha(contexto, 0, canvas.height - bg.altura);
  bg.desenha(contexto, bg.largura, canvas.height - bg.altura);

  chao.desenha(contexto, 0, canvas.height - chao.altura);
  chao.desenha(contexto, 0 + chao.largura, canvas.height - chao.altura);

  passaro.desenha(contexto);
  passaro.queda();

  //não sei para que serve ainda!
  //mas faz os quadros serem desenhados
  requestAnimationFrame(loop);
}

loop();