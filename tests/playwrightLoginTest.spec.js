const { test, expect } = require('@playwright/test');

test('User can log in', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://access.pokemon.com/login');

  // Fill in the username and password fields
  await page.fill('#username', 'Penguinius_test');
  await page.fill('#password', 'Testtrial123!');

  // Click the login button
  await page.click('#loginBtn');

  // Wait for navigation or some element that indicates successful login
  await page.waitForSelector('text=Welcome', { timeout: 50000 });

  // Assert the welcome message is visible
  const welcomeText = await page.textContent('body');
  expect(welcomeText).toContain('Welcome');
});
