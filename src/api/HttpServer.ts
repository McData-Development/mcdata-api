import Express, { Application } from 'express';
import EventEmitter from 'node:events';
import type { IHttpServerOptions } from '../types/global.interface';

class HttpServer extends EventEmitter {
  private app: Application = Express();
  public options: IHttpServerOptions;

  constructor(options: IHttpServerOptions) {
    super();

    this.options = options;
    this.listen();
  }

  /**
   * Retrieve Express application
   */
  public get application(): Application {
    return this.app;
  }

  /**
   * Emit debug event
   * @param message Debug message
   */
  public debug(message: string): void {
    console.log(message);
    this.emit('debug', message);
  }

  /**
   * Listen to HTTP port
   */
  private listen(): void {
    this.app.listen(this.options.port, (): void => {
      this.emit('debug', `Back-end service is listening to port ${this.options.port}`);
    });
  }
}

export default HttpServer;
