export class NavigationMenu {
  constructor(page) {
    this.page = page;
    this.homeLink = 'a[href="index.htm"]'; // Home icon
    this.aboutLink = 'a[href="about.htm"]'; // About icon
    this.contactLink = 'a[href="contact.htm"]'; // Contact icon
    this.locationsLink = 'a[href*="locations"]'; // Existing
    this.productsLink = 'a[href*="products"]'; // Existing
  }

  async validateGlobalNavigation() {
    console.log("Validating Global Navigation Menu...");

    // Validate the presence and visibility of each navigation link
    const homeVisible = await this.page.locator(this.homeLink).isVisible();
    const aboutVisible = await this.page.locator(this.aboutLink).isVisible();
    const contactVisible = await this.page.locator(this.contactLink).isVisible();
    const locationsVisible = await this.page.locator(this.locationsLink).isVisible();
    const productsVisible = await this.page.locator(this.productsLink).isVisible();

    console.log(`Home Visible: ${homeVisible}`);
    console.log(`About Visible: ${aboutVisible}`);
    console.log(`Contact Visible: ${contactVisible}`);
    console.log(`Locations Visible: ${locationsVisible}`);
    console.log(`Products Visible: ${productsVisible}`);

    if (!homeVisible || !aboutVisible || !contactVisible || !locationsVisible || !productsVisible) {
      throw new Error("One or more global navigation menu items are missing!");
    }

    console.log("Global Navigation Menu Validated Successfully!");
  }
}
