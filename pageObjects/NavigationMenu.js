export class NavigationMenu {
    constructor(page) {
      this.page = page;
      this.menuItems = {
        solutions: 'text=Solutions',
        aboutUs: 'text=About Us',
        services: 'text=Services',
        products: 'text=Products',
        locations: 'text=Locations',
        adminPage: 'text=Admin Page'
      };
      this.topIcons = {
        home: 'img[alt="home"]',
        user: 'img[alt="user"]',
        contact: 'img[alt="contact"]'
      };
    }
  
    async clickMenuItem(menuItem) {
      await Promise.all([
        this.page.waitForNavigation({ waitUntil: 'load', timeout: 5000 }),
        this.page.click(this.menuItems[menuItem])
      ]);
    }
  
    async clickTopIcon(icon) {
      await Promise.all([
        this.page.waitForNavigation({ waitUntil: 'load', timeout: 5000 }),
        this.page.click(this.topIcons[icon])
      ]);
    }
  }
  