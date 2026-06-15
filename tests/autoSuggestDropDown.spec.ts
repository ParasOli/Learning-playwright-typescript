import { expect, test } from "playwright/test";

test('auto-suggest: every suggestion contains the searched text', async ({page})=>{
    const searchItem = 'Creatine'
   await page.goto('https://www.amazon.in/')
   await page.locator('#twotabsearchtextbox').fill(searchItem)
   await page.waitForTimeout(2000);
   const suggestions = page.locator('[id*="sac-suggestion-row-"]');
   const options = await suggestions.allTextContents()
   const optionArray:string[] = options
   console.log(optionArray)
   for(const option of optionArray ){
    expect(option.toLowerCase()).toContain(searchItem.toLowerCase())
   }

})