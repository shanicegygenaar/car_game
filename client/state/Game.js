import {world_size} from '../config'
import {createText} from './utils'
import fileloader from '../config/fileloader'
import createWorld from './world/createWord'
import player from './player'
import newPlayer from './sockets/newPlayer'
import updatePlayers from './sockets/updatePlayers'
import playerMovementInterpolation from './predictions/playerMovementInterpolation'

const server_ip = 'http://localhost:8000'
let socket = null
let otherPlayers = {}
class Game extends Phaser.state {
    constructor () {
        super() 
        this.player = {}

    }
    preload() {
        fileloader(this.game)
    }
    create() {
        const {width, height} = world_size
        createWorld(this.game)
        socket = io(server_ip)
        this.player = player(Math.random()* width, Math.random()* height / 2, this.game, socket)
        this.player.playerName = createText(this.game, this.player.sprite.body)
        this.player.speedText = createText(this.game, this.player.sprite.body)


        newPlayer(socket, otherPlayers, this.game)
        updatePlayers(socket, otherPlayers, this.game)
        this.game.camera.x = this.player.sprite.x - 800/ 2
        this.game.camera.y - 600 / 2
        this.game.scale.scaleMode = Phaser.scaleManager.show_all
    }
    update() {
        this.player.drive(this.game)
        let cameraX = this.player.sprite.x - 800 / 2
        let cameraY = this.player.sprie.y - 600 / 2
        

        this.game.camera.x += (cameraX - this.game.camera.x) * 0.08
        this.game.camera.y += (cameraY - this.game.camera.y) * 0.08
        playerMovementInterpolation(otherPlayers)
    
    }
}
export default Game