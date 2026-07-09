import {expect, test} from '@playwright/test'

test('hard vs soft assertions', async({page})=>{

  await page.goto('https://demowebshop.tricentis.com/')

//hardassertions
  await expect(page).toHaveTitle('Demo Web Shop')
  await expect(page).toHaveURL('https://demowebshop.tricentis.com/')
  const logo = page.locator('[alt="Tricentis Demo Web Shop"]')
  await expect(logo).toBeVisible()

//softassertions
//while using softassertions the test will fall but it will run other async assertions 
  await expect.soft(page).toHaveTitle('Demo Web Shop')
  await expect.soft(page).toHaveURL('https://demowebshop.tricentis.com/')
  const hardAssetionLogo = page.locator('[alt="Tricentis Demo Web Shop"]')
  await expect.soft(hardAssetionLogo).toBeVisible()





})