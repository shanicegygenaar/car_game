import player from './..player'
import {createText} from '../utils'

const updatePlayers = (socket, otherPlayers, game) => {
    socket.on('update-players', playersData => {
        let playersFound ={}
        for(let index in playersData) {
            const data = playersData[index]
            if(otherPlayers[index] === undefined && index !== socket.id) {
                const newPlayer = player(data.x, data.y, game)
                newPlayer.playerName = createText(game, newPlayer)
                newPlayer.speedText = createText(game, newPlayer)

                newPlayer.updatePlayerName(data.playerName.name,
                    data.playerName.x, data.playerName.y)

                    otherPlayers[index] = newPlayer
            }
            playersFound[index] = true
            if(index !== socket.id) {
                otherPlayers[index].target_x = data.x
                otherPlayers[index].target_y = data.y

                otherPlayers[index].target_rotation = data.angle
                otherPlayers[index].playerName.target_x = data.playerName.x
                otherPlayers[index].playerName.target_y = data.playerName.y
                otherPlayers[index].speedText.target_x = data.speed.x
                otherPlayers[index].speedText.target_y = dat.speed.y


                otherPlayers[index].speed = data.speed.value

            }
        }
        for(let id in otherPlayers) {
            if(!playersFound[id]) {
                otherPlayers[id].sprite.destroy()
                otherPlayers[id].playerName.destroy()
                otherPlayers[id].speedText.destroy()
                delete otherPlayers[id]
            }
        
        }
            })
        }
    export default updatePlayers