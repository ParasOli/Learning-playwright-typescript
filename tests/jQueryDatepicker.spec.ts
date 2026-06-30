import { Locator, test, expect } from '@playwright/test';

test('JQuery datepicker- using fill', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const datePicker:Locator = page.locator('#datepicker')
    datePicker.fill("30/06/2026")
    await page.waitForTimeout(4000) 

})