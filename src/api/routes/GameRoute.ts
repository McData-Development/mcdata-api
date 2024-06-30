import GameController from '../controllers/GameController';
import type HttpServer from '../HttpServer';
import Route from './Route';

/**
 * Represents routes for Minecraft games.
 * @extends Route
 */
class GameRoute extends Route {
  private readonly controller: GameController = new GameController();

  constructor(server: HttpServer) {
    super();
    this.init();
    server.emit('debug', 'Game routes initialized!');
  }

  /**
   * Initialise routes.
   * @returns {void}
   */
  private init(): void {
    this.router.get('/', this.controller.index.bind(this.controller));
  }
}

export default GameRoute;
