import Route from './Route';
import PlayerController from '../controllers/PlayerController';

/**
 * PlayerRoute
 * @extends Route
 */
class PlayerRoute extends Route {

    private readonly controller: PlayerController = new PlayerController();

    constructor() {
        super();
        this.init();
    }

    /**
     * Initialise routes
     */
    private init(): void {
        this.router.get('/:player/skin', this.controller.skin.bind(this.controller));
        this.router.get('/:player/history', this.controller.history.bind(this.controller));
        this.router.get('/:player', this.controller.get.bind(this.controller));
    }

}

export default PlayerRoute;