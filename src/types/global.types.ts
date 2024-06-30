export interface ConfigType {
  name: string;
  environment: 'development' | 'production';
  port: number;
  url: string;
}

export interface HttpServerOptions extends ConfigType {
  prefix: string;
}
