import { WORLD_SIZE } from '../config'
import { createText } from './utils'
import fileLoader from '../config/fileLoader'
import createWorld from './world/createWorld'
import player from './player'
import newPlayer from './sockets/newPlayer'
import updatePlayers from './sockets/updatePlayers'
import playerMovementInterpolation from './predictions/playerMovementInterpolation'

const SERVER_IP = 'https://cargame2.netlify.app/'
let socket = null
let otherPlayers = {}

class Game extends Phaser.State {
  constructor () {
    super()
    this.player = {}
  }

  preload () {
  
    fileLoader(this.game)
  }

  create () {
    const { width, height } = WORLD_SIZE
  
    createWorld(this.game)
    
    socket = io(SERVER_IP)
    
    this.player = player(Math.random() * width, Math.random() * height / 2, this.game, socket)
    
    this.player.playerName = createText(this.game, this.player.sprite.body)
   
    this.player.speedText = createText(this.game, this.player.sprite.body)

    
    newPlayer(socket, this.player)
  
    updatePlayers(socket, otherPlayers, this.game)

    
    this.game.camera.x = this.player.sprite.x - 800 / 2
    this.game.camera.y = this.player.sprite.y - 600 / 2

    
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
  }

  update () {
    this.player.drive(this.game)

    
    let cameraX = this.player.sprite.x - 800 / 2
    let cameraY = this.player.sprite.y - 600 / 2
    this.game.camera.x += (cameraX - this.game.camera.x) * 0.08
    this.game.camera.y += (cameraY - this.game.camera.y) * 0.08

    
    playerMovementInterpolation(otherPlayers)
  }
}

export default Game