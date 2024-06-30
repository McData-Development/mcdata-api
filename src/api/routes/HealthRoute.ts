import HealthController from '../controllers/HealthController';
import type HttpServer from '../HttpServer';
import Route from './Route';

/**
 * Represents routes for health check.
 * @extends Route
 */
class HealthRoute extends Route {
  private readonly controller: HealthController = new HealthController();

  constructor(server: HttpServer) {
    super();
    this.init();
    server.emit('debug', 'Health routes initialized!');
  }

  /**
   * Initialise routes
   */
  private init(): void {
    this.router.get('/', this.controller.index.bind(this.controller));
  }
}

export default HealthRoute;
