import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    dir: 'tests',
    coverage: {
      include: ['**/src/**']
    }
  }
});
