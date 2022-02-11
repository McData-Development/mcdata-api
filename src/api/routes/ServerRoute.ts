import Route from './Route';
import ServerController from '../controllers/ServerController';

/**
 * ServerRoute
 * @extends Route
 */
class ServerRoute extends Route {

    private readonly controller: ServerController = new ServerController();

    constructor() {
        super();
        this.init();
    }

    /**
     * Initialise routes
     */
    private init(): void {
        this.router.get('/:serverIp', this.controller.get.bind(this.controller));
    }

}

export default ServerRoute;