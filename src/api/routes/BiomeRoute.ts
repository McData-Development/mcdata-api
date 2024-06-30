import BiomeController from '../controllers/BiomeController';
import type HttpServer from '../HttpServer';
import Route from './Route';

/**
 * Represents routes for Minecraft colors.
 * @extends Route
 */
class BiomeRoute extends Route {
  private readonly controller: BiomeController = new BiomeController();

  constructor(server: HttpServer) {
    super();
    this.init();
    server.emit('debug', 'Bioeme routes initialized!');
  }

  /**
   * Initialise routes.
   * @returns {void}
   */
  private init(): void {
    this.router.get('/', this.controller.index.bind(this.controller));
  }
}

export default BiomeRoute;
