import ColorController from '../controllers/ColorController';
import type HttpServer from '../HttpServer';
import Route from './Route';

/**
 * Represents routes for Minecraft colors.
 * @extends Route
 */
class ColorRoute extends Route {
  private readonly controller: ColorController = new ColorController();

  constructor(server: HttpServer) {
    super();
    this.init();
    server.emit('debug', 'Color routes initialized!');
  }

  /**
   * Initialise routes.
   * @returns {void}
   */
  private init(): void {
    this.router.get('/', this.controller.index.bind(this.controller));
  }
}

export default ColorRoute;
