import {expect, test} from "@playwright/test"

test('test screenshot', async ({page})=>{
      await page.goto('https://demowebshop.tricentis.com/')
      const date = Date.now()

      //for whole page
      await page.screenshot({path:`screenshot/homepage-${date}.png`, fullPage:true})


      //for specific element 

      const logo = page.locator('[alt="Tricentis Demo Web Shop"]')
     await expect(logo).toBeVisible()
      await logo.screenshot({path:`screenshot/logo-${date}.png`})



})