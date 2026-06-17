import { test, expect } from '@playwright/test';


test('Success login', async({page})=>{
  await page.goto('https://www.saucedemo.com/')
  await page.locator('#user-name').fill('standard_user')
  await page.locator('#password').fill('secret_sauce')
  await page.locator('[data-test="login-button"]').click()
  await expect(page).toHaveURL(new RegExp('inventory.html'));
  await expect(page.locator('.app_logo')).toContainText('Swag Labs');
await expect(page.locator('.app_logo')).toBeVisible();
})


test('test2',async ({page})=>{
  await page.goto('https://www.saucedemo.com/')
  await page.locator('#user-name').fill('standard_user')
  await page.locator('#password').fill('random password')
   await page.locator('[data-test="login-button"]').click()
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service')
  await expect(page).toHaveURL(new RegExp('https://www.saucedemo.com/'))
})