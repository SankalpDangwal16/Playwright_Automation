export class AccountsOverviewPage {
    constructor(page) {
      this.page = page;
      this.accountsOverviewLink = 'text=Accounts Overview';
      this.accountBalanceSelector = '.balance'; // Adjust based on actual UI
    }
  
    // Navigate to the "Accounts Overview" page
    async navigateToAccountsOverview() {
      await this.page.click(this.accountsOverviewLink);
      await this.page.waitForSelector(this.accountBalanceSelector);
    }
  
    // Get the balance for a specific account by its ID
    async getAccountBalance(accountId) {
      return await this.page.textContent(`a[href*='id=${accountId}'] >> xpath=../following-sibling::td[1]`);
    }
  
    // Verify if the account exists on the overview page
    async isAccountVisible(accountId) {
      return await this.page.isVisible(`a[href*='id=${accountId}']`);
    }
  }
  