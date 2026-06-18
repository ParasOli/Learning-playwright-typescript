 import {Locator,expect, test} from "@playwright/test"

 test.only('Validating the table count match', async ({page})=>{
  await page.goto('https://testautomationpractice.blogspot.com/')
  const rowsLocator:Locator = page.locator('table[name="BookTable"] tr')
  const rowsCount = await rowsLocator.count()
  console.log(rowsCount)
  expect(rowsCount).toBe(7)

      
 })