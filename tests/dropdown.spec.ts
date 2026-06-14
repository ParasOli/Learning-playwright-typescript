import { test, expect, Locator } from "@playwright/test";

test('Single select DropDown', async({page})=>{
      await page.goto('https://testautomationpractice.blogspot.com/')

      const countryDropDown: Locator = page.locator('#country')
      const countryDropDownOption: Locator = page.locator('#country option')
      await expect(countryDropDown).toBeVisible()
      await countryDropDown.selectOption({value:'germany'})
      await expect(countryDropDownOption).toHaveCount(10)
       const arrayOfDropDown:string[] = (await countryDropDownOption.allTextContents())
      .map(text => text.trim());
       console.log(arrayOfDropDown)
       await expect(arrayOfDropDown).toContain('Germany')
      
})

test.only('Multiple Select DropDown', async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')

})

