import PlayerController from '../controllers/PlayerController';
import type HttpServer from '../HttpServer';
import Route from './Route';

class PlayerRoute extends Route {
  private readonly controller: PlayerController = new PlayerController();

  constructor(server: HttpServer) {
    super();
    this.init();
    server.emit('debug', 'Player routes initialized!');
  }

  /**
   * Initialise routes
   */
  private init(): void {
    this.router.get('/:player', this.controller.get.bind(this.controller));
  }
}

export default PlayerRoute;
