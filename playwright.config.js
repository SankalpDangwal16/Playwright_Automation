import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',         // Folder where tests are located
  timeout: 30000,             // Global timeout for each test
  retries: 1,                 // Retry failed tests once
  use: {
    baseURL: 'https://parabank.parasoft.com', // Base URL for all tests
    browserName: 'chromium',  // Use Chromium browser
    headless: true,           // Run tests in headless mode
    screenshot: 'on',         // Take screenshots on failure
    video: 'retain-on-failure'// Record video only if test fails
  },
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
});
