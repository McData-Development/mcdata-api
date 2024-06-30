import ArmorController from '../controllers/ArmorController';
import type HttpServer from '../HttpServer';
import Route from './Route';

/**
 * Represents routes for Minecraft armor.
 * @extends Route
 */
class ArmorRoute extends Route {
  private readonly controller: ArmorController = new ArmorController();

  constructor(server: HttpServer) {
    super();
    this.init();
    server.emit('debug', 'Armor routes initialized!');
  }

  /**
   * Initialise routes.
   * @returns {void}
   */
  private init(): void {
    this.router.get('/', this.controller.index.bind(this.controller));
  }
}

export default ArmorRoute;
