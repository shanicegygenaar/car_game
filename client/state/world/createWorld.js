import { world_size} from './../../config'
const {width, height} = world_size
const worlCreater =game => {
    game.physics.startsystem(Phaser.Physics.P2JS)
    game.stage.disableVisibiltyChange = true
    game.world.setBounds(0, 0, width, height)
    createMap(game)
}
const createMap = game => {
    let groundFiles  = []
    for(let i = 0; i <= width / 64 + 1; i++) {
        for(let j = 0; j <= height / 64 + 1; j++) {
        const groundSprite = game.add.sprite(i * 64, j * 64, 'asphalt')
        groundFiles.push(groundSprite)
    }

    }
}
export default worldCreator