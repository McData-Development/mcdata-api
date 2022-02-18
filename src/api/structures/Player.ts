import { Player } from '../../typings/apistructures';

/**
 * Player
 */
class Player {

    public id: string;
    public name: string;
    public history: Array<Player.history>;

    constructor(data: Player.constructor) {
        this.id = data.id;
        this.name = data.name;
        this.history = data.history;
    }

}

export default Player;