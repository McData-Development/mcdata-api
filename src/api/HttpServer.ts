import Express, { Application } from 'express';
import EventEmitter from 'node:events';
import type { HttpServerOptions } from '../types/global.types';
import { initRoutes } from './routes';

/**
 * HTTP server class.
 * @extends EventEmitter
 */
class HttpServer extends EventEmitter {
  /**
   * Express application.
   */
  private app: Application = Express();

  /**
   * HTTP server options.
   */
  public options: HttpServerOptions;

  constructor(options: HttpServerOptions) {
    super();

    this.options = options;
    this.listen();
  }

  /**
   * Retrieve Express application
   * @returns {Application}
   */
  public get application(): Application {
    return this.app;
  }

  /**
   * Listen to HTTP port.
   * @returns {void}
   */
  private listen(): void {
    this.app.listen(this.options.port, (): void => {
      this.emit(
        'debug',
        `Back-end service is listening to port ${this.options.port}/`
      );

      // Initialise routes when app is ready for listening
      initRoutes(this);

      this.emit('ready');
    });
  }
}

export default HttpServer;
