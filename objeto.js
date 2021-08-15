class Objeto {
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
}

class Personagem extends Objeto {
  constructor (sprite, dx, dy, largura, altura, px, py) {
    super(sprite, dx, dy, largura, altura);

    this.gravidade = 0.25;
    this.velocidade = 0;

    this.x = px;
    this.y = py;
  }

  queda(){
    this.velocidade = this.velocidade + this.gravidade;
    this.y += this.velocidade;
  }
}

export {Objeto, Personagem}