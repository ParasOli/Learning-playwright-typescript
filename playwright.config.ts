import { defineConfig, devices } from '@playwright/test';

import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });


export default defineConfig({
  testDir: './tests',
  timeout:60000,
  expect:{ timeout:5000},
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html']],
  use: {
    baseURL: process.env.BASE_URL,
    screenshot:'only-on-failure',
    trace:'on'
    // video:'retain-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ]
});
