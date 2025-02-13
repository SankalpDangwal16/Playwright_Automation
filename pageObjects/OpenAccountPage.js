export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.openNewAccountLink = 'text=Open New Account'; // The navigation link
    this.accountTypeDropdown = '#type';
    this.submitButton = 'input[value="Open New Account"]'; // The button to create an account
    this.accountNumberLocator = '#newAccountId';
  }

  async navigateToOpenAccountPage() {
    console.log('Navigating to Open New Account Page...');
    
    await this.page.waitForSelector(this.openNewAccountLink, { state: 'visible', timeout: 10000 });
    await this.page.click(this.openNewAccountLink);
    
    console.log('Clicked on "Open New Account" Navigation Link');
  }

  async createNewAccount(accountType = '1') {
    console.log('Starting Account Creation...');

    // Ensure the dropdown is visible before selecting account type
    await this.page.waitForSelector(this.accountTypeDropdown, { state: 'visible', timeout: 10000 });
    await this.page.selectOption(this.accountTypeDropdown, accountType);

    // Debugging: Check if the button is present and visible
    const buttonExists = await this.page.locator(this.submitButton).count();
    const isButtonVisible = await this.page.locator(this.submitButton).isVisible();
    const isButtonEnabled = await this.page.locator(this.submitButton).isEnabled();

    console.log(`Button Exists: ${buttonExists}, Visible: ${isButtonVisible}, Enabled: ${isButtonEnabled}`);

    if (!isButtonVisible || !isButtonEnabled) {
        console.log("Button is not visible or enabled! Trying alternative click methods...");
    }

    // Ensure the "Open New Account" button is visible before clicking
    await this.page.waitForSelector(this.submitButton, { state: 'attached', timeout: 10000 });

    // Attempt multiple ways to click the button
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`Attempt ${attempt}: Clicking "Open New Account" Button...`);
        await this.page.locator(this.submitButton).scrollIntoViewIfNeeded();
        await this.page.locator(this.submitButton).click({ force: true });

        // Wait for confirmation page to load
        await this.page.waitForSelector(this.accountNumberLocator, { state: 'visible', timeout: 5000 });
        break; // Exit loop if click is successful
      } catch (error) {
        console.log(`Attempt ${attempt} failed. Retrying...`);
        await this.page.waitForTimeout(2000); // Small delay before retry
      }
    }

    // Final fallback: Use JavaScript to click the button
    const finalCheck = await this.page.locator(this.accountNumberLocator).isVisible();
    if (!finalCheck) {
      console.log("Final attempt: Clicking via JavaScript...");
      await this.page.evaluate(() => document.querySelector('input[value="Open New Account"]').click());
      await this.page.waitForSelector(this.accountNumberLocator, { state: 'visible', timeout: 5000 });
    }

    // Wait for account number to be generated
    let accountNumber = await this.page.textContent(this.accountNumberLocator);
    
    if (!accountNumber || accountNumber.trim() === "Open New Account") {
        throw new Error("Failed to fetch New Account Number");
    }

    console.log(`Account Created: ${accountNumber}`);
    return accountNumber.trim();
  }
}
