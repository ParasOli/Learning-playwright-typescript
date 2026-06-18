 import {Locator,expect, test} from "@playwright/test"

 test('Validating the table row count match', async ({page})=>{
  await page.goto('https://testautomationpractice.blogspot.com/')
  const rowsLocator:Locator = page.locator('table[name="BookTable"] tr')
  const rowsCount = await rowsLocator.count()
  console.log(rowsCount)
  //including header
  expect(rowsCount).toBe(7)
 })


test.only('Validating the table column count match', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/')

  const columnLocator: Locator = page.locator('table[name="BookTable"] th')
  const columnCount = await columnLocator.count()

  console.log(columnCount)

  expect(columnCount).toBe(4)
})



