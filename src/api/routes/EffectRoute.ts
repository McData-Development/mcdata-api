import EffectController from '../controllers/EffectController';
import type HttpServer from '../HttpServer';
import Route from './Route';

/**
 * Represents routes for Minecraft effects.
 * @extends Route
 */
class EffectRoute extends Route {
  private readonly controller: EffectController = new EffectController();

  constructor(server: HttpServer) {
    super();
    this.init();
    server.emit('debug', 'Effect routes initialized!');
  }

  /**
   * Initialise routes.
   * @returns {void}
   */
  private init(): void {
    this.router.get('/', this.controller.index.bind(this.controller));
  }
}

export default EffectRoute;
