
import {test, expect, Locator} from '@playwright/test'

test('example', async ({page })=>{
    await page.goto('https://testautomationpractice.blogspot.com/')
    const nameInput: Locator = page.locator('#name')
    await expect(nameInput).toBeVisible();
    await expect(nameInput).toBeEnabled();
    const maxLength = await (nameInput).getAttribute('maxlength');
    console.log(maxLength)
    expect(maxLength).toBe('15')
    await (nameInput).fill('paras');
// console.log(await (nameInput).textContent()) this will return empty ---
    const inputValue: string = await (nameInput).inputValue()
    console.log(inputValue)
    expect(inputValue).toBe('paras')

    

})
