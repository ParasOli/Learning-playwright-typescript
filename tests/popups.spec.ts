import {expect, test} from "@playwright/test"

test('should open selenium.dev in a new tab, verify its heading, and close it', async ({browser})=>{
    const context = await browser.newContext()
    const page = await context.newPage()

 await page.goto('https://testautomationpractice.blogspot.com/')

 const [childPage] = await Promise.all([context.waitForEvent('page'), await page.locator('button#PopUp').click()])
 const pageTitle = await childPage.title()
 console.log(pageTitle)
expect(childPage.url()).toStrictEqual('https://www.selenium.dev/')

await expect(childPage.locator('h4.alert-heading')).toContainText('Thank you for joining the Selenium and Appium 2026 Conference.')
await childPage.close()



})





    