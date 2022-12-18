export interface IConfig {
  name: string;
  environment:
    | 'development'
    | 'production';
  port: number;
  url: string;
  apiKey: string;
  mcauth: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  };
}

export interface IHttpServerOptions extends IConfig {
  prefix: string;
}
