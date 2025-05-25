# Test info

- Name: User can log in
- Location: /workspaces/Test-Assessment/tests/playwrightLoginTest.spec.js:3:1

# Error details

```
Error: page.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#username')

    at /workspaces/Test-Assessment/tests/playwrightLoginTest.spec.js:8:14
```

# Page snapshot

```yaml
- img "logo"
- heading "Log-In Session Expired" [level=2]
- text: Your log-in session has expired. Please return to the app and attempt to log in again. ©2025 Pokémon. ©1995 - 2025 Nintendo/Creatures Inc./GAME FREAK inc. TM, ®Nintendo.
```

# Test source

```ts
   1 | const { test, expect } = require('@playwright/test');
   2 |
   3 | test('User can log in', async ({ page }) => {
   4 |   // Navigate to the login page
   5 |   await page.goto('https://access.pokemon.com/login');
   6 |
   7 |   // Fill in the username and password fields
>  8 |   await page.fill('#username', 'Penguinius_test');
     |              ^ Error: page.fill: Test timeout of 30000ms exceeded.
   9 |   await page.fill('#password', 'Testtrial123!');
  10 |
  11 |   // Click the login button
  12 |   await page.click('#loginBtn');
  13 |
  14 |   // Wait for navigation or some element that indicates successful login
  15 |   await page.waitForSelector('text=Welcome', { timeout: 50000 });
  16 |
  17 |   // Assert the welcome message is visible
  18 |   const welcomeText = await page.textContent('body');
  19 |   expect(welcomeText).toContain('Welcome');
  20 | });
  21 |
```