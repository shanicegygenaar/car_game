import{window_width, window_height} from '.config'
import Game from '.state/Game'

class App extends Phaser.Game {
    constructor() {
        super(window_width, window_height, Phaser.AUTO)
        this.state.add('Game', Game)
        this.state.start('Game')
    }
}
const SimpleGame = new App()