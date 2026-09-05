import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  workers: 1,
  reporter: 'line',
  use: {
    baseURL: process.env.TEST_BASE_URL || 'http://localhost:3100',
    browserName: 'chromium',
    channel: 'chrome',
    headless: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: process.env.TEST_BASE_URL ? undefined : {
    command: 'npm start',
    env: { PORT: '3100' },
    url: 'http://localhost:3100',
    reuseExistingServer: true,
  },
});
