export class RedirectedPage {
    constructor(page) {
      this.page = page;
    }
  
    async verifyPageTitle(expectedTitle) {
      await this.page.waitForLoadState('load');
      const title = await this.page.title();
      return title.includes(expectedTitle);
    }
  
    async verifyElementVisible(selector) {
      try {
        await this.page.waitForSelector(selector, { timeout: 5000 });
        return await this.page.isVisible(selector);
      } catch {
        return false;
      }
    }
  }
  