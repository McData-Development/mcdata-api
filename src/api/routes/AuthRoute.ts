import AuthController from '../controllers/AuthController';
import type HttpServer from '../HttpServer';
import Route from './Route';

class AuthRoute extends Route {
  private readonly controller: AuthController = new AuthController();

  constructor(server: HttpServer) {
    super();
    this.init();
    server.emit('debug', 'Auth routes initialized!');
  }

  /**
   * Initialise routes
   */
  private init(): void {
    this.router.get('/oauth', this.controller.oauth.bind(this.controller));
    this.router.get('/oauth/callback', this.controller.callback.bind(this.controller));
  }
}

export default AuthRoute;
