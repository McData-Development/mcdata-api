import UserController from '../controllers/UserController';
import type HttpServer from '../HttpServer';
import Route from './Route';

class UserRoute extends Route {
  private readonly controller: UserController = new UserController();

  constructor(server: HttpServer) {
    super();
    this.init();
    server.emit('debug', 'User routes initialized!');
  }

  /**
   * Initialise routes
   */
  private init(): void {
    this.router.get('/:userId', this.controller.get.bind(this.controller));
    this.router.put('/:userId', [this.middleware.requiredApiKey], this.controller.update.bind(this.controller));
  }
}

export default UserRoute;
