
import { test, expect, Locator, firefox } from '@playwright/test';

test('browser context tests', async({})=>{

    const browser= await firefox.launch()
    const context = await browser.newContext()

    const page1 = await context.newPage()
    const page2 = await context.newPage()
    console.log(context.pages().length)

    await page1.goto('https://testautomationpractice.blogspot.com/')
    await expect(page1).toHaveTitle(/Automation Testing Practice/)


    await page2.goto('https://demowebshop.tricentis.com/')
    await expect(page2).toHaveTitle(/Demo Web Shop/)
    await page1.waitForTimeout(2000)
    await page2.waitForTimeout(2000)

})
