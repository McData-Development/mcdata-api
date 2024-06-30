import Route from '../src/api/routes/Route';
import Controller from '../src/api/controllers/Controller';
import { test, expect, describe } from 'vitest';
import HalloLogger from 'hallo-logger';
import HttpServer from '../src/api/HttpServer';
import config from '../src/constants/config';

test('Base controller.', (): void => {
  const BaseController = new Controller();

  expect(BaseController).toBeDefined();
  expect(BaseController).toHaveProperty('logger');
  expect(BaseController.logger).toBeInstanceOf(HalloLogger);
});

test('Base route.', (): void => {
  const BaseRoute = new Route();

  expect(BaseRoute).toBeDefined();
  expect(BaseRoute).toHaveProperty('router');
});

describe('HttpServer class.', (): void => {
  const server = new HttpServer({ ...config, prefix: '' });

  test('should have the correct options implemented.', (): void => {
    expect(server).toBeDefined();
    expect(server.options.environment).toBe(config.environment);
    expect(server.options.port).toBe(config.port);
    expect(server.options.prefix).toBe('');
    expect(server.options.name).toBe(config.name);
    expect(server.options.url).toBe(config.url);
  });

  test('should have the available properties.', (): void => {
    expect(server).toHaveProperty('app');
    expect(server).toHaveProperty('options');
    expect(server).toHaveProperty('application');
    expect(server).toHaveProperty('listen');
  });
});
