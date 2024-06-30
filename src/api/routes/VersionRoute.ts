import VersionController from '../controllers/VersionController';
import type HttpServer from '../HttpServer';
import Route from './Route';

/**
 * Represents routes for Minecraft versions.
 * @extends Route
 */
class VersionRoute extends Route {
  private readonly controller: VersionController = new VersionController();

  constructor(server: HttpServer) {
    super();
    this.init();
    server.emit('debug', 'Version routes initialized!');
  }

  /**
   * Initialise routes.
   * @returns {void}
   */
  private init(): void {
    this.router.get('/', this.controller.index.bind(this.controller));
  }
}

export default VersionRoute;
