import { expect } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.navigationMenuItems = [
      { text: 'Accounts Overview', selector: '//a[text()="Accounts Overview"]' },
      { text: 'Open New Account', selector: '//a[text()="Open New Account"]' },
      { text: 'Transfer Funds', selector: '//a[text()="Transfer Funds"]' },
      { text: 'Bill Pay', selector: '//a[text()="Bill Pay"]' }
    ];
  }

  async verifyNavigationMenu() {
    console.log('🛠️ Verifying Global Navigation Menu...');
    
    for (const menuItem of this.navigationMenuItems) {
      const navLocator = this.page.locator(menuItem.selector);
      
      // ✅ Ensure the menu item is visible
      await expect(navLocator).toBeVisible({ timeout: 5000 });
      console.log(`✅ Menu Item "${menuItem.text}" is visible.`);
    }

    console.log('✅ Navigation Menu Verification Completed.');
  }
}
