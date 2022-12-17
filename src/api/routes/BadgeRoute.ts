import BadgeController from '../controllers/BadgeController';
import type HttpServer from '../HttpServer';
import Route from './Route';

class BadgeRoute extends Route {
  private readonly controller: BadgeController = new BadgeController();

  constructor(server: HttpServer) {
    super();
    this.init();
    server.emit('debug', 'Badge routes initialized!');
  }

  /**
   * Initialise routes
   */
  private init(): void {
    this.router.get('/', this.controller.index.bind(this.controller));
  }
}

export default BadgeRoute;
