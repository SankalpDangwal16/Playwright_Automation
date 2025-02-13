import { test, expect } from '@playwright/test';
import { generateRandomUserData } from '../../utils/dataGenerator.js';
import { LoginPage } from '../../pageObjects/LoginPage.js';
import { RegistrationPage } from '../../pageObjects/RegistrationPage.js';
import { OpenAccountPage } from '../../pageObjects/OpenAccountPage.js';
import { TransferFundsPage } from '../../pageObjects/TransferFundsPage.js';
import { BillPaymentPage } from '../../pageObjects/BillPaymentPage.js';
import { HomePage } from '../../pageObjects/HomePage.js';

test('User Registration, Logout, Re-login, Open New Accounts, Transfer Funds, and Bill Payment', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const registrationPage = new RegistrationPage(page);
  const homePage = new HomePage(page);
  const openAccountPage = new OpenAccountPage(page);
  const transferFundsPage = new TransferFundsPage(page);
  const billPaymentPage = new BillPaymentPage(page);

  const userData = generateRandomUserData();
  console.log(`User Credentials - Username: ${userData.username}, Password: ${userData.password}`);

  await loginPage.navigate();
  await loginPage.clickRegister();
  await registrationPage.fillRegistrationForm(userData);
  await registrationPage.submitRegistration();
  await expect(page.locator('h1.title')).toHaveText(`Welcome ${userData.username}`);
  console.log(`User Registered Successfully as ${userData.username}`);

  await loginPage.logout();

  // Re-login with Registered User
  await loginPage.login(userData.username, userData.password);
  await page.waitForSelector('h1.title', { state: 'visible', timeout: 10000 });

  // Get all headers and check for "Accounts Overview"
  const headers = await page.locator('h1.title').allTextContents();
  console.log(`Found Page Headers: ${headers}`);

  const isAccountsOverview = headers.some(header => header.trim() === 'Accounts Overview');
  const isErrorPage = headers.some(header => header.trim() === 'Error!');

  if (isAccountsOverview) {
      console.log(`User Logged in Successfully, Landed on Accounts Overview Page`);
  } else if (isErrorPage) {
      throw new Error(`Login failed - Unexpected error detected.`);
  } else {
      throw new Error(`Unexpected Page Header: "${headers}"`);
  }

  // Verify Global Navigation Menu
  await homePage.verifyNavigationMenu();

  // Navigate to Open Account Page before creating first account
  await openAccountPage.navigateToOpenAccountPage();
  const firstAccountNumber = await openAccountPage.createNewAccount();
  if (!firstAccountNumber) throw new Error("Failed to fetch First Account Number");

  // Navigate to Open Account Page again before creating second account
  await openAccountPage.navigateToOpenAccountPage();
  const secondAccountNumber = await openAccountPage.createNewAccount();
  if (!secondAccountNumber) throw new Error("Failed to fetch Second Account Number");

  // Print both account numbers for verification
  console.log(`Created Accounts: First - ${firstAccountNumber}, Second - ${secondAccountNumber}`);

  // Transfer Funds (Handled in TransferFundsPage) - Ensure Different Accounts
  await transferFundsPage.navigateToTransferFunds();
  await transferFundsPage.transferFunds('10', firstAccountNumber, secondAccountNumber);

  // Bill Payment (Handled in BillPaymentPage)
  await page.click('text=Bill Pay');
  await billPaymentPage.fillBillPaymentForm(userData, firstAccountNumber, '10');
  await billPaymentPage.submitPayment();

  console.log('Test Completed Successfully');
});
