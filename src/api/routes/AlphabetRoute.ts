import AlphabetController from '../controllers/AlphabetController';
import type HttpServer from '../HttpServer';
import Route from './Route';

/**
 * Represents routes for Minecraft alphabet.
 * @extends Route
 */
class AlphabetRoute extends Route {
  private readonly controller: AlphabetController = new AlphabetController();

  constructor(server: HttpServer) {
    super();
    this.init();
    server.emit('debug', 'Alphabet routes initialized!');
  }

  /**
   * Initialise routes.
   * @returns {void}
   */
  private init(): void {
    this.router.get('/', this.controller.index.bind(this.controller));
  }
}

export default AlphabetRoute;
