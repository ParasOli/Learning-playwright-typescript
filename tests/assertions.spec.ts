import {expect, test} from '@playwright/test'

test('practice assertions', async({page})=>{


    //auto-retrying assertions
  await page.goto('https://demowebshop.tricentis.com/')
  await expect(page).toHaveURL('https://demowebshop.tricentis.com/')

    //non auto-retring assertions
  const pageTitle = await page.title()
  expect (pageTitle).toContain('Demo Web Shop')



})