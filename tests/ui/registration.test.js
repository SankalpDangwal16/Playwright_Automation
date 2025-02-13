import { test, expect } from '@playwright/test';
import { generateRandomUsername } from '../../utils/dataGenerator.js';
import { LoginPage } from '../../pageObjects/LoginPage.js';
import { RegistrationPage } from '../../pageObjects/RegistrationPage.js';

test('User Registration and Login Flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const registrationPage = new RegistrationPage(page);

  // Test Data
  const randomUsername = generateRandomUsername();
  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    phone: '1234567890',
    ssn: '123-45-6789',
    username: randomUsername,
    password: 'Password123'
  };

  // Step 1: Navigate to Para Bank Application
  await loginPage.navigate();
  await expect(page).toHaveTitle(/ParaBank/);

  // Step 2: Go to Registration Page
  await loginPage.clickRegister();
  await expect(page).toHaveURL(/register\.htm/);

  // Step 3: Register a New User
  await registrationPage.fillRegistrationForm(userData);
  await registrationPage.submitRegistration();

  // Assertion: Registration Success
  await expect(page.locator('.title')).toContainText(`Welcome ${randomUsername}`);

  // Step 4: Log Out (if there's a logout button)
  if (await page.locator('text=Log Out').isVisible()) {
    await page.click('text=Log Out');
  }

  // Step 5: Log In with Registered User
  await loginPage.login(userData.username, userData.password);

  // Assertion: Successful Login
  // Assertion: Successful Login
  
  // Debugging: Log all headers and visible text
  // Wait for the page to load fully
await page.waitForLoadState('networkidle');

// Assertion for successful login
await expect(page.locator('//h1[@class="title" and normalize-space()="Accounts Overview"]')).toBeVisible();


});
