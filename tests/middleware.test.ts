import { test, expect, describe } from 'vitest';
import { ModulesMiddleware } from '../src/api/middleware';

describe('Modules middleware.', (): void => {
  test('should have the available properties.', (): void => {
    expect(ModulesMiddleware).toBeDefined();
    expect(ModulesMiddleware['register']).toBeDefined();
  });
});
