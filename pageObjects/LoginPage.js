export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameField = 'input[name="username"]';
    this.passwordField = 'input[name="password"]';
    this.loginButton = 'input[value="Log In"]';
    this.registerLink = 'a[href*="register.htm"]';  // Registration link selector
  }

  async navigate() {
    try {
      console.log('Navigating to Para Bank...');
      await this.page.goto('https://parabank.parasoft.com/', {
        waitUntil: 'domcontentloaded',
        timeout: 30000
      });
      console.log('Successfully navigated to Para Bank!');
    } catch (error) {
      console.error('Navigation failed:', error);
    }
  }

  // Add this method to click on the "Register" link
  async clickRegister() {
    try {
      await this.page.waitForSelector(this.registerLink, { timeout: 10000 });
      await this.page.click(this.registerLink);
      console.log('Navigated to Registration Page.');
    } catch (error) {
      console.error('Failed to click Register:', error);
    }
  }

  async login(username, password) {
    try {
      await this.page.waitForSelector(this.usernameField, { timeout: 10000 });
      console.log('Username field is visible.');

      await this.page.fill(this.usernameField, username);
      await this.page.fill(this.passwordField, password);
      await this.page.click(this.loginButton);
      console.log('Login submitted successfully.');
    } catch (error) {
      console.error('Login failed:', error);
      await this.page.screenshot({ path: 'error_screenshots/login_error.png', fullPage: true });
    }
  }

  async logout() {
    if (await this.page.isVisible('text=Log Out')) {
      await this.page.click('text=Log Out');
      console.log('User logged out successfully.');
    }
  }
}
