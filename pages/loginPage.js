const { By, until } = require('selenium-webdriver');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.usernameField = By.id('Penguinius_test');
    this.passwordField = By.id('Testtrial123!');
    this.loginButton = By.id('loginBtn');
    // PAGE TO SEE IF LOGIN WAS SUCCESSFUL
    this.postLoginSelector = By.css('.welcome-message'); 
  }

  async login(username, password) {
    // Wait for username field and enter username
    const usernameInput = await this.driver.wait(until.elementLocated(this.usernameField), 10000);
    await usernameInput.sendKeys(username);

    // Wait for password field and enter password
    const passwordInput = await this.driver.wait(until.elementLocated(this.passwordField), 10000);
    await passwordInput.sendKeys(password);

    // Wait for login button and click it
    const loginBtn = await this.driver.wait(until.elementLocated(this.loginButton), 10000);
    await loginBtn.click();

    // Wait for some element that confirms successful login
    await this.driver.wait(until.elementLocated(this.postLoginSelector), 10000);
  }
}

module.exports = LoginPage;
