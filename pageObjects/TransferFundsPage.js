export class TransferFundsPage {
  constructor(page) {
    this.page = page;
    this.transferFundsLink = '//a[text()="Transfer Funds"]';
    this.amountField = '//input[@id="amount"]';
    this.fromAccountDropdown = '#fromAccountId';
    this.toAccountDropdown = '#toAccountId';
    this.transferButton = '//input[@value="Transfer"]';
  }

  async navigateToTransferFunds() {
    await this.page.click(this.transferFundsLink);
    console.log('Navigated to Transfer Funds Page');
  }

  async waitForDropdownOptions(selector, timeout = 10000) {
    console.log(`Waiting for options in ${selector}...`);
    for (let i = 0; i < timeout / 1000; i++) {
      const options = await this.page.$$eval(selector + ' option', opts =>
        opts.map(option => option.value.trim()).filter(value => value !== '')
      );
      if (options.length > 0) return options;
      await this.page.waitForTimeout(1000);
    }
    throw new Error(`Timeout waiting for options in ${selector}`);
  }

  async transferFunds(amount) {
    console.log(`Initiating Transfer: $${amount}`);

    // Ensure dropdowns are visible before selecting
    await this.page.waitForSelector(this.fromAccountDropdown, { state: 'visible', timeout: 10000 });
    await this.page.waitForSelector(this.toAccountDropdown, { state: 'visible', timeout: 10000 });

    // Wait until accounts appear in both dropdowns
    const fromAccountOptions = await this.waitForDropdownOptions(this.fromAccountDropdown);
    const toAccountOptions = await this.waitForDropdownOptions(this.toAccountDropdown);

    console.log(`Available From Accounts: ${fromAccountOptions}`);
    console.log(`Available To Accounts: ${toAccountOptions}`);

    if (fromAccountOptions.length === 0 || toAccountOptions.length === 0) {
      throw new Error(`No accounts available for transfer. From: ${fromAccountOptions}, To: ${toAccountOptions}`);
    }

    // Select different accounts for transfer
    let fromAccountId = fromAccountOptions[0];
    let toAccountId = toAccountOptions.find(account => account !== fromAccountId) || fromAccountOptions[1];

    if (!toAccountId) {
      throw new Error('Unable to find a different account for transfer.');
    }

    console.log(`Transferring $${amount} from ${fromAccountId} to ${toAccountId}`);

    // Ensure correct account selection
    await this.page.selectOption(this.fromAccountDropdown, fromAccountId);
    await this.page.selectOption(this.toAccountDropdown, toAccountId);

    await this.page.fill(this.amountField, amount);
    await this.page.waitForSelector(this.transferButton, { state: 'visible' });
    await this.page.click(this.transferButton);

    console.log(`Successfully Transferred $${amount} from ${fromAccountId} to ${toAccountId}`);
  }
}
