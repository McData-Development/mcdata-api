import { Router } from 'express';
import { GlobalMiddleware as middleware } from '../middleware';

class Route {
  /**
   * Express router
   */
  public router: Router = Router();

  /**
   * Global middleware
   */
  public middleware: typeof middleware = middleware;
}

export default Route;
