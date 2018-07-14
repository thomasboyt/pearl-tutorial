import {
  Component,
  createPearl,
} from 'pearl';

class Game extends Component<null> {
  init() {
    console.log('hello world!');
  }
}

createPearl({
  rootComponents: [new Game()],
  width: 300,
  height: 300,
  canvas: document.getElementById('canvas') as HTMLCanvasElement,
});