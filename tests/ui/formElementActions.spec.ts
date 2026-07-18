
import {test, expect, Locator} from '@playwright/test'

test('name input field enforces maxlength and accepts typed value', async ({page })=>{
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


    test('male radio button can be selected', async ({page})=>{
        await page.goto('https://testautomationpractice.blogspot.com/')
        const maleRadioButton:Locator = page.locator('#male')
        expect(maleRadioButton).toBeVisible()
        await (maleRadioButton).check()
        expect(maleRadioButton).toBeChecked()
        const conditionOfCheckBox = await(maleRadioButton.isChecked())
        expect(conditionOfCheckBox).toBe(true)
})

test('check selected weekday checkboxes', async ({page})=>{
     await page.goto('https://testautomationpractice.blogspot.com/')
     const day:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

     for(const a of day.slice(2)){
        const checkday:Locator = page.getByLabel(a)
        await (checkday).check()
        await expect(checkday).toBeChecked()
     }
 
})


test('toggle all weekday checkboxes then check specific ones', async ({page})=>{
     await page.goto('https://testautomationpractice.blogspot.com/')
     const day:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

     for(const a of day){
       const checkday = page.getByLabel(a)


        if(await checkday.isChecked()){
        await (checkday).uncheck()
        await expect(checkday).not.toBeChecked()
        } else {
        await(checkday).check()
        await expect(checkday).toBeChecked()
     }

     }

     const indexes:number[] = [1,3,4,5];
     
     for (const i of indexes){
        const checkday = page.getByLabel(day[i]);
        await checkday.check();
        await expect(checkday).toBeChecked()
     }


 
})
