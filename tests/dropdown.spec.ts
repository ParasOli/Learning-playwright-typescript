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

test('Multiple Select DropDown', async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')
    const colorOptions:Locator = await page.locator('#animals option')
    const lenghtofArray = await colorOptions.count()
    const arrayOfColors:string[] = (await colorOptions.allTextContents()).map(text=>text.trim())
    const sortedArrayOfColors:string[] = [...arrayOfColors].sort()
    expect (sortedArrayOfColors).toEqual(arrayOfColors)

})

test.only('Validate the drop down dont have any duplicate options', async ({page})=>{
        await page.goto('https://testautomationpractice.blogspot.com/')
        const colorOptions:Locator = await page.locator('#animals option')
        const colorArray:string[] = (await colorOptions.allTextContents()).map(text=>text.trim())
        const newArray:string[] = []

        const mySet = new Set<string>()

        for(const color of colorArray){
            if(mySet.has(color)){
                newArray.push(color)
            }else{
                mySet.add(color)
            }
        }
        console.log(mySet)
        console.log(newArray)

        expect(newArray).toHaveLength(0)



})

