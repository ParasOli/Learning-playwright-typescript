import {test, chromium} from '@playwright/test';

test('should switch to a new tab opened via button click and read its content',async ()=>{
const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage()

 await page.goto('https://testautomationpractice.blogspot.com/')

 const [childPage] = await Promise.all([context.waitForEvent('page'),page.locator('#HTML4 button').click()])

const childPageTitle = await childPage.title()
console.log(childPageTitle)
const arrayofA = await childPage.locator('a').allInnerTexts()
console.log(arrayofA)

})