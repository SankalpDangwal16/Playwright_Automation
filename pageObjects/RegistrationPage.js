export class RegistrationPage {
    constructor(page) {
      this.page = page;
      this.firstName = 'input[name="customer.firstName"]';
      this.lastName = 'input[name="customer.lastName"]';
      this.address = 'input[name="customer.address.street"]';
      this.city = 'input[name="customer.address.city"]';
      this.state = 'input[name="customer.address.state"]';
      this.zipCode = 'input[name="customer.address.zipCode"]';
      this.phone = 'input[name="customer.phoneNumber"]';
      this.ssn = 'input[name="customer.ssn"]';
      this.username = 'input[name="customer.username"]';
      this.password = 'input[name="customer.password"]';
      this.confirmPassword = 'input[name="repeatedPassword"]';
      this.registerButton = 'input[value="Register"]';
    }
  
    async fillRegistrationForm(user) {
      try {
        // Validation for required fields
        const requiredFields = [
          'firstName',
          'lastName',
          'address',
          'city',
          'state',
          'zipCode',
          'phone',
          'ssn',
          'username',
          'password'
        ];
  
        for (const field of requiredFields) {
          if (!user[field]) {
            throw new Error(`Missing value for field: ${field}`);
          }
        }
  
        // Filling the form
        await this.page.fill(this.firstName, user.firstName);
        await this.page.fill(this.lastName, user.lastName);
        await this.page.fill(this.address, user.address);
        await this.page.fill(this.city, user.city);
        await this.page.fill(this.state, user.state);
        await this.page.fill(this.zipCode, user.zipCode);
        await this.page.fill(this.phone, user.phone);
        await this.page.fill(this.ssn, user.ssn);
        await this.page.fill(this.username, user.username);
        await this.page.fill(this.password, user.password);
        await this.page.fill(this.confirmPassword, user.password);
  
      } catch (error) {
        console.error(`Error filling registration form: ${error.message}`);
        throw error;
      }
    }
  
    async submitRegistration() {
      await this.page.click(this.registerButton);
    }
  }
  