const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const os = require('os');
const fs = require('fs');
const path = require('path');
const assert = require('chai').assert;
const LoginPage = require('../pages/loginPage');
const TodoPage = require('../pages/todoPage');

let driver;
let loginPage;
let todoPage;

describe('Selenium WebDriver Test Suite', function () {
  this.timeout(30000);

  before(async () => {
    // Create a unique temporary directory for Chrome user data to avoid session conflicts. AS OF THE TIME OF WRITING, I CREATED THIS IN CODESPACES.
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-profile-'));

    const options = new chrome.Options();

    // Use the unique user-data-dir path
    options.addArguments(`--user-data-dir=${tmpDir}`);

    // Recommended for running Chrome in Codespace
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');

    // Optional: use the new headless mode (Chrome 109+) - USING HEADLESS FOR CODESPACES
    options.addArguments('--headless=new');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    await driver.get('https://access.pokemon.com/login');

    loginPage = new LoginPage(driver);
    todoPage = new TodoPage(driver);
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  afterEach(async function () {
    if (this.currentTest.state === 'failed') {
      const screenshot = await driver.takeScreenshot();

      // Ensure screenshots directory exists - TO SEE THE SCREENSHOITS
      const screenshotDir = path.join(__dirname, 'screenshots');
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir);
      }

      const fileName = path.join(screenshotDir, `${this.currentTest.title.replace(/\s+/g, '_')}.png`);
      fs.writeFileSync(fileName, screenshot, 'base64');
    }
  });

  it('User Login', async () => {
    await loginPage.login('testuser', 'testpass');
    const pageSource = await driver.getPageSource();
    assert.include(pageSource, 'Welcome', 'Login failed or welcome text not found');
  });

  it('Add a To-Do Item', async () => {
    const text = 'Buy Pokeballs to catch the legendary pokemons Miraidon and Koraidon';
    await todoPage.addItem(text);
    const items = await todoPage.getTodoItems();
    const itemTexts = await Promise.all(items.map(item => item.getText()));
    assert.include(itemTexts, text);
  });

  it('Delete a To-Do Item', async () => {
    const itemsBefore = await todoPage.getTodoItems();
    await todoPage.deleteLastItem();
    const itemsAfter = await todoPage.getTodoItems();
    assert.isBelow(itemsAfter.length, itemsBefore.length, 'Item was not deleted');
  });
});
