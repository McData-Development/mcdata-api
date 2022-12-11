export interface IConfig {
  name: string;
  environment:
    | 'development'
    | 'production';
  port: number;
  url: string;
}

export interface IHttpServerOptions extends IConfig {
  prefix: string;
}
