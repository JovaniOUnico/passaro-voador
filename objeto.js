class Objeto {

  static colisaoVerificaY(obj1, obj2){
    const obj1Y = obj1.y + obj1.altura;
    const obj2Y = obj2.y;
    
    if(obj1.colisao == true && obj2.colisao == true){
      if(obj1Y >= obj2Y){
        if(obj1.colisaoSom != undefined){
          obj1.colisaoSom.play();
        }

        if(obj2.colisaoSom != undefined){
          obj2.colisaoSom.play();
        }
        return true;
      }

      return false;
    }
  }

  static colisaoVerificaX(obj1, obj2){
    const obj1X = obj1.x + obj1.largura;
    const obj2X = obj2.x;
    
    if(obj1.colisao == true && obj2.colisao == true){
      if(obj1X >= obj2X){
        if(obj1.colisaoSom != undefined){
          obj1.colisaoSom.play();
        }

        if(obj2.colisaoSom != undefined){
          obj2.colisaoSom.play();
        }
        return true;
      }

      return false;
    }
  }

  constructor (sprite, dx, dy, largura, altura) {
    //imagem para pegar o objeto como base
    this.sprite = sprite;

    //posições iniciais que vão ser recortadas apartir da imagem
    this.spriteX = dx;
    this.spriteY = dy;

    //tamanho do recorte
    this.altura = altura;
    this.largura = largura;

  }

  initPosX(x){
    this.x = x;
  }

  initPosY(y){
    this.y = y;
  }

  sumPosX(x){
    this.x += x;
  }

  sumPosY(y){
    this.y += y;
  }

  desenha(contexto, x, y){
    //posição no canvas
    if(x != undefined){
      this.x = x;
    }

    if(y != undefined){
      this.y = y;
    }

    //vai desenhar uma imagem no canvas
    contexto.drawImage(
      //essa é a imagem base
      this.sprite,
      //essas são as posições da imagem que voce quer cortar apartir da imagem base
      this.spriteX, this.spriteY,
      //esses são os tamanhos do corte da imagem recortada
      this.largura, this.altura,
      this.x, this.y,
      this.largura, this.altura
    );

  }

  habilitarColisao(){
    this.colisao = true;
  }

  somColisao(aud) {
    this.colisaoSom = aud;
  }

  movimenta(){
    let movimentoChao = 1;
    let repeteEm = this.largura / 2;
    let movimentacao = this.x - movimentoChao;

    this.x = movimentacao % repeteEm;
  }
}
class Personagem extends Objeto {

  static frameAtual = 0;

  constructor (sprite, largura, altura, spritesPos, px, py) {
    super();

    this.sprite = sprite;

    this.gravidade = 0.25;
    this.velocidade = 0;
    this.pulo = 4.6;

    this.spritesPos = spritesPos;
    this.posSprite = 0;

    this.x = px;
    this.y = py;

    //tamanho do recorte
    this.altura = altura;
    this.largura = largura;

  }
  pula(){
    this.velocidade = - this.pulo;
  }
  queda(){
    this.velocidade = this.velocidade + this.gravidade;
    this.y += this.velocidade;
  }
  desenha(contexto, x, y){
    //posição no canvas
    if(x != undefined){
      this.x = x;
    }

    if(y != undefined){
      this.y = y;
    }


    let spx = this.spritesPos[this.posSprite].spriteX;
    let spy = this.spritesPos[this.posSprite].spriteY;

    //vai desenhar uma imagem no canvas
    contexto.drawImage(
      //essa é a imagem base
      this.sprite,
      //essas são as posições da imagem que voce quer cortar apartir da imagem base
      spx, spy,
      //esses são os tamanhos do corte da imagem recortada
      this.largura, this.altura,
      this.x, this.y,
      this.largura, this.altura
    );

    this.atualizaFrameAtual();
    Personagem.frameAtual++;
  }
  atualizaFrameAtual(){
    const intervaloFrames = 10;
    const passouIntervalo = Personagem.frameAtual % intervaloFrames === 0;

    if(passouIntervalo){
      if(this.posSprite < (this.spritesPos.length-1)){
        this.posSprite++;
      }else{
        this.posSprite = 0;
      }
    }
  }
}
class Plataforma extends Objeto{
  desenha(contexto, x, y){
    //posição no canvas
    if(x != undefined){
      this.x = x;
    }

    if(y != undefined){
      this.y = y;
    }

    /* intenção é fazer repetir a plataforma 2 vezes */

    //vai desenhar uma imagem no canvas
    contexto.drawImage(
      //essa é a imagem base
      this.sprite,
      //essas são as posições da imagem que voce quer cortar apartir da imagem base
      this.spriteX, this.spriteY,
      //esses são os tamanhos do corte da imagem recortada
      this.largura, this.altura,
      this.x, this.y,
      this.largura, this.altura
    );

    //vai desenhar a segunda imagem no canvas
    contexto.drawImage(
      //essa é a imagem base
      this.sprite,
      //essas são as posições da imagem que voce quer cortar apartir da imagem base
      this.spriteX, this.spriteY,
      //esses são os tamanhos do corte da imagem recortada
      this.largura, this.altura,
      this.largura + this.x, this.y,
      this.largura, this.altura
    );

  }
}

class Grupo {

  constructor (){
    this.objetosLista = [];
  }

  addObjeto(obj) {
    this.objetosLista.push(obj);
  }

  initPosX(x){
    this.objetosLista.forEach(function (obj){
      obj.initPosX(x);
    });
  }

  initPosY(y){
    this.objetosLista.forEach(function (obj){
      obj.initPosY(y);
    });
  }

  sumPosX(x){
    this.objetosLista.forEach(function (obj){
      obj.sumPosX(x);
    });
  }

  sumPosY(y){
    this.objetosLista.forEach(function (obj){
      obj.sumPosY(y);
    });
  }
  
  desenha(contexto, x, y) {
    this.objetosLista.forEach(function (obj){
      obj.desenha(contexto, x, y);
    });
  }

}

export {Objeto, Personagem, Plataforma, Grupo}