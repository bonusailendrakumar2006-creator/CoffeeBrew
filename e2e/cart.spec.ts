import { test, expect } from '@playwright/test';

test('has title and can add items to the cart', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/CoffeeBrew/);

  // Wait for loading screen to disappear
  await page.waitForTimeout(2000);

  // Locate the first 'Add to Bag' button in Our Blends section
  const addToBagBtn = page.getByRole('button', { name: 'Add to Bag' }).first();
  await addToBagBtn.scrollIntoViewIfNeeded();
  await addToBagBtn.click();

  // The sliding Cart Drawer should open
  const cartDrawer = page.getByRole('heading', { name: 'Your Bag' });
  await expect(cartDrawer).toBeVisible();
  
  // Verify that the cart has updated the subtotal and shows checkout
  await expect(page.getByText('Checkout')).toBeVisible();
  await expect(page.getByText('Subtotal')).toBeVisible();
});
