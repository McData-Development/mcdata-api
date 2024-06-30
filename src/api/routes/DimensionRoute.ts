import DimensionController from '../controllers/DimensionController';
import type HttpServer from '../HttpServer';
import Route from './Route';

/**
 * Represents routes for Minecraft dimensions.
 * @extends Route
 */
class DimensionRoute extends Route {
  private readonly controller: DimensionController = new DimensionController();

  constructor(server: HttpServer) {
    super();
    this.init();
    server.emit('debug', 'Dimension routes initialized!');
  }

  /**
   * Initialise routes.
   * @returns {void}
   */
  private init(): void {
    this.router.get('/', this.controller.index.bind(this.controller));
  }
}

export default DimensionRoute;
