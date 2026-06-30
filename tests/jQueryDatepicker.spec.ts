import { Locator, test, expect } from '@playwright/test';

test('JQuery datepicker- using fill', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const datePicker:Locator = page.locator('#datepicker')
    datePicker.fill("30/06/2026")
    await page.waitForTimeout(4000) 

})

test.only('JQuery datepicker for future date - using loop', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const datePicker:Locator = page.locator('#datepicker')
    await datePicker.click()


    const year ='2027'
    const month = 'August'
    const day = '16'

    while(true){

        const currentMonth = await page.locator('.ui-datepicker-month').innerText()
        const currentyear = await page.locator('.ui-datepicker-year').innerText()

        if(currentMonth===month && currentyear===year){
            break;
        }
        await page.locator('[data-handler="next"]').click()

    }

    const dateLocator= await page.locator('.ui-datepicker-calendar td').all()

    for(let dt of dateLocator){
        const dateText = await dt.innerText()
        if(dateText===day){
            await dt.click()
            break;
        }
    }
await expect(datePicker).toHaveValue(new RegExp(year))

})