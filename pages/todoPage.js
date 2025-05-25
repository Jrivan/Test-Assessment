const { By, until } = require('selenium-webdriver');

class TodoPage {
  constructor(driver) {
    this.driver = driver;
    this.inputField = By.id('newTodo');
    this.addButton = By.id('addTodo');
    this.todoList = By.css('.todo-item');
    this.deleteButtons = By.css('.delete-btn');
  }

  async addItem(itemText) {
    const input = await this.driver.wait(until.elementLocated(this.inputField), 10000);
    await input.clear();
    await input.sendKeys(itemText);

    const addBtn = await this.driver.wait(until.elementLocated(this.addButton), 10000);
    await addBtn.click();

    // todo list
    await this.driver.wait(async () => {
      const items = await this.driver.findElements(this.todoList);
      for (let item of items) {
        const text = await item.getText();
        if (text === itemText) return true;
      }
      return false;
    }, 10000);
  }

  async deleteLastItem() {
    const buttons = await this.driver.wait(until.elementsLocated(this.deleteButtons), 10000);
    if (buttons.length > 0) {
      await buttons[buttons.length - 1].click();

      // wait time for the delete
      await this.driver.wait(async () => {
        const currentButtons = await this.driver.findElements(this.deleteButtons);
        return currentButtons.length < buttons.length;
      }, 10000);
    }
  }

  async getTodoItems() {
    return await this.driver.wait(until.elementsLocated(this.todoList), 10000);
  }
}

module.exports = TodoPage;
