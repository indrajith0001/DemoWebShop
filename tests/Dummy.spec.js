const { test, expect } = require('@playwright/test');

test('Home page should have correct title and logo', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
  await expect(page).toHaveTitle(/Demo Web Shop/);
  const logo = page.locator('.header-logo img');
  await expect(logo).toBeVisible();
});

test('User should be able to navigate to registration', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
  await page.click('text=Register');
  await expect(page).toHaveURL(/.*register/);
  await page.fill('#FirstName', 'John');
  await page.fill('#LastName', 'Smith');
  await page.fill('#Email', `test${Date.now()}@example.com`);
  await page.fill('#Password', 'Password123');
  await page.fill('#ConfirmPassword', 'Password123');
  await page.click('#register-button');
  await expect(page.locator('.result')).toContainText('Your registration completed');
});

test('Add product to cart from category page', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/books');
  await page.click('.product-item:has-text("Computing and Internet") .product-box-add-to-cart-button');
  const notification = page.locator('#bar-notification');
  await expect(notification).toBeVisible();
  await expect(notification).toContainText('The product has been added to your shopping cart');
});

test('Add item to wishlist', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/jewelry');
  await page.click('text=Black & White Diamond Heart');
  await page.click('#add-to-wishlist-button-14');
  await expect(page.locator('.content')).toContainText('The product has been added to your wishlist');
});

test('Navigate through categories menu', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
  await page.click('.block-category-navigation a:has-text("Apparel & Shoes")');
  await expect(page.locator('h1')).toHaveText('Apparel & Shoes');
});

test('Newsletter subscription validation', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
  await page.fill('#newsletter-email', 'invalid-email');
  await page.click('#newsletter-subscribe-button');
  await expect(page.locator('#newsletter-result-block')).toContainText('Enter valid email');
});