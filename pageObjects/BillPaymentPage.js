export class BillPaymentPage {
  constructor(page) {
    this.page = page;
    this.payeeName = 'input[name="payee.name"]';
    this.address = 'input[name="payee.address.street"]';
    this.city = 'input[name="payee.address.city"]';
    this.state = 'input[name="payee.address.state"]';
    this.zipCode = 'input[name="payee.address.zipCode"]';
    this.phone = 'input[name="payee.phoneNumber"]';
    this.account = 'input[name="payee.accountNumber"]';
    this.verifyAccount = 'input[name="verifyAccount"]';
    this.amount = 'input[name="amount"]';
    this.fromAccountDropdown = 'select[name="fromAccountId"]';
    this.sendPaymentButton = '//input[@value="Send Payment"]';
  }

  async fillBillPaymentForm(userData, fromAccountId, paymentAmount) {
    console.log('Filling Bill Payment Form...');

    await this.page.fill(this.payeeName, `${userData.firstName} ${userData.lastName}`);
    await this.page.fill(this.address, userData.address);
    await this.page.fill(this.city, userData.city);
    await this.page.fill(this.state, userData.state);
    await this.page.fill(this.zipCode, userData.zipCode);
    await this.page.fill(this.phone, userData.phone);
    await this.page.fill(this.amount, paymentAmount);

    console.log(`Entered Amount: $${paymentAmount}`);

    // Ensure the dropdown is clickable
    await this.page.waitForSelector(this.fromAccountDropdown, { state: 'visible', timeout: 15000 });
    await this.page.click(this.fromAccountDropdown);
    await this.page.waitForTimeout(2000);

    // Fetch Available Account Options
    const accountOptions = await this.getAccountOptions();
    console.log(`Available Accounts: ${accountOptions}`);

    if (accountOptions.length === 0) {
      throw new Error('No valid accounts available for payment.');
    }

    // Select an account (fallback if `fromAccountId` is not valid)
    const selectedAccount = accountOptions.includes(fromAccountId) ? fromAccountId : accountOptions[0];

    // Fill Account # and Verify Account # fields
    await this.page.fill(this.account, selectedAccount);
    await this.page.fill(this.verifyAccount, selectedAccount);
    console.log(`Set Account #: ${selectedAccount}`);

    // Select the correct From Account dropdown option
    await this.page.selectOption(this.fromAccountDropdown, selectedAccount);
    console.log(`Selected From Account #: ${selectedAccount}`);
  }

  async submitPayment() {
    console.log('Attempting to Submit Bill Payment...');

    // Ensure the "Send Payment" button is visible and enabled
    await this.page.waitForSelector(this.sendPaymentButton, { state: 'visible', timeout: 10000 });

    // Click the button twice to ensure the event is triggered
    await this.page.click(this.sendPaymentButton, { force: true });
    console.log('Bill Payment Submitted.');
    
    await this.page.click(this.sendPaymentButton, { force: true });
    console.log('Send Payment button clicked again for confirmation.');

    // Wait for the confirmation message to appear
    await this.page.waitForSelector('//h1[text()="Bill Payment Complete"]', { timeout: 5000 });
    console.log('Payment was successful! Finally');

    // Validate the confirmation message
  
  }

  async getAccountOptions() {
    return await this.page.$$eval(`${this.fromAccountDropdown} option`, options =>
      options.map(option => option.value)
    );
  }
}
