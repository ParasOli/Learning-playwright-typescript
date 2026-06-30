import { Locator, test, expect, Page } from '@playwright/test';


let dateSelectingFunction =async( page:Page, day:string, month:string, year:string, isfuture:boolean)=>{
        const datePicker:Locator = page.locator('#datepicker')
    await datePicker.click()
     while(true){

        const currentMonth = await page.locator('.ui-datepicker-month').innerText()
        const currentyear = await page.locator('.ui-datepicker-year').innerText()

        if(currentMonth===month && currentyear===year){
            break;
        }

        if(isfuture){
            await page.locator('[data-handler="next"]').click()

        }else{
             await page.locator('[data-handler="prev"]').click()
        }

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

}

test.only('JQuery datepicker for future date - using loop', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const year ='2024'
    const month = 'August'
    const day = '16'

    await dateSelectingFunction(page, day, month, year, false)


})




test('JQuery datepicker- using fill', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const datePicker:Locator = page.locator('#datepicker')
    datePicker.fill("30/06/2026")
    await page.waitForTimeout(4000) 

})