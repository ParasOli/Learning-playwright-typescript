
import {test, expect, Locator} from '@playwright/test'

test('input', async ({page })=>{
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


    test('radio button', async ({page})=>{
        await page.goto('https://testautomationpractice.blogspot.com/')
        const maleRadioButton:Locator = page.locator('#male')
        expect(maleRadioButton).toBeVisible()
        await (maleRadioButton).check()
        expect(maleRadioButton).toBeChecked()
        const conditionOfCheckBox = await(maleRadioButton.isChecked())
        expect(conditionOfCheckBox).toBe(true)
})

test('check box', async ({page})=>{
     await page.goto('https://testautomationpractice.blogspot.com/')
     const day:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

    for(const d of day){
     const checkBox:Locator = page.getByLabel(d)
     await checkBox.check()
     expect(checkBox).toBeChecked()
     const ConditionOfCheck = await(checkBox.isChecked())
     expect(ConditionOfCheck).toBe(true)
    }
})
