import {expect, test} from "@playwright/test"

test('popups', async ({browser})=>{
    const context = await browser.newContext()
    const page = await context.newPage()

 await page.goto('https://testautomationpractice.blogspot.com/')

 const [childPage] = await Promise.all([context.waitForEvent('page'), await page.locator('button#PopUp').click()])
 const pageTitle = childPage.title()
 console.log(pageTitle)
const url = childPage.url()
console.log(url)
// expect(childPage.url).toStrictEqual('https://www.selenium.dev/')
// expect(page.locator('h4 .alert-heading')).toContainText('Thank you for joining the Selenium and Appium 2026 Conference.')


})





    