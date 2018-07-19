import {
  Component,
  createPearl,
  GameObject,
  Physical,
  BoxCollider,
  BoxRenderer,
  Sprite,
  SpriteRenderer,
  ImageAsset,
  AudioAsset,
} from 'pearl';

import Player from './components/Player';

class Game extends Component<null> {
  playerObj!: GameObject;

  init() {
    const swordImage = this.pearl.assets.get(ImageAsset, 'swordImage');

    const swordSprite = new Sprite(
      swordImage,
      0,
      0,
      swordImage.width,
      swordImage.height
    );

    this.playerObj = this.pearl.entities.add(
      new GameObject({
        name: 'player',
        components: [
          new Physical({
            center: {
              x: 150,
              y: 20,
            },
          }),

          new BoxCollider({
            width: 20,
            height: 20,
          }),

          new BoxRenderer({
            fillStyle: 'cyan',
          }),

          new Player(),
        ],
      })
    );

    this.pearl.entities.add(
      new GameObject({
        name: 'enemy',
        tags: ['enemy'],

        components: [
          new Physical({
            center: {
              x: 150,
              y: 260,
            },
          }),

          new BoxCollider({
            width: 40,
            height: 40,
          }),

          new BoxRenderer({
            fillStyle: 'red',
          }),
        ],
      })
    );

    this.pearl.entities.add(
      new GameObject({
        name: 'sword',
        tags: ['sword'],
        components: [
          new Physical({
            center: {
              x: 150,
              y: 150,
            },
          }),

          new BoxCollider({
            width: swordSprite.width,
            height: swordSprite.height,
          }),

          new SpriteRenderer({
            sprite: swordSprite,
          }),
        ],
      })
    );
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.textAlign = 'center';
    ctx.font = '16px monospace';
    ctx.fillStyle = 'black';

    if (!this.playerObj.getComponent(Player).isAlive) {
      ctx.fillText('game over :(', 150, 150);
    }

    if (this.pearl.entities.all('enemy').length === 0) {
      ctx.fillText('you win!', 150, 150);
    }
  }
}

createPearl({
  rootComponents: [new Game()],
  width: 300,
  height: 300,
  canvas: document.getElementById('canvas') as HTMLCanvasElement,
  assets: {
    swordImage: new ImageAsset(require('../assets/sword.png')),
    hitSound: new AudioAsset(require('../assets/hit.wav')),
  }
});