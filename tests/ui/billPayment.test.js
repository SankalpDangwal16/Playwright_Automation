import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pageObjects/LoginPage.js';

test('Bill Payment Service Automation', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Step 1: Login to Para Bank
  await loginPage.navigate();
  await loginPage.login('user_0kpleemy', 'Password123');
  console.log('✅ Logged into Para Bank.');

  // Step 2: Navigate to "Bill Pay" Page
  await page.click('//a[text()="Bill Pay"]');
  await expect(page).toHaveURL(/billpay/);
  console.log('💸 Navigated to Bill Payment Service.');

  // Step 3: Fill Bill Payment Form
  await page.fill('//input[@name="payee.name"]', 'John Doe');
  await page.fill('//input[@name="payee.address.street"]', '123 Main St');
  await page.fill('//input[@name="payee.address.city"]', 'New York');
  await page.fill('//input[@name="payee.address.state"]', 'NY');
  await page.fill('//input[@name="payee.address.zipCode"]', '10001');
  await page.fill('//input[@name="payee.phoneNumber"]', '1234567890');

  const accountNumber = '14454';
  await page.fill('//input[@name="payee.accountNumber"]', accountNumber);
  await page.fill('//input[@name="verifyAccount"]', accountNumber);

  await page.fill('//input[@name="amount"]', '10'); // Amount: $500

  // Select "From Account #"
  // Corrected XPath to get the first available account
  const existingAccountId = await page.locator('//select[@name="fromAccountId"]/option').first().getAttribute('value');
  await page.selectOption('//select[@name="fromAccountId"]', existingAccountId);
  console.log(`💼 Selected From Account #: ${existingAccountId}`);


  // Step 4: Submit Payment
  await page.click('//input[@value="Send Payment"]');
  console.log('🚀 Bill Payment Submitted.');

  // Step 5: Validate Payment Confirmation
  await expect(page.locator('h1.title', { hasText: 'Bill Payment Complete' })).toBeVisible();

  console.log('✅ Bill Payment Successful.');
});

// Capture screenshot on failure
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    await page.screenshot({ path: `screenshots/${testInfo.title}.png`, fullPage: true });
    console.log(`📸 Screenshot saved: screenshots/${testInfo.title}.png`);
  }
});
