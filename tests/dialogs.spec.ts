import { Locator, test, expect, Page } from '@playwright/test';




test('Simple dialog', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    page.on('dialog', (dialog)=>{
        console.log('type of dialog',dialog.type())
        console.log('message from dialog', dialog.message())
        expect(dialog.message()).toContain('I am an alert box!')
        dialog.accept()   
    })
    await page.locator('#alertBtn').click()
})

test.only('Confirmation dialog', async({page})=>{
     await page.goto('https://testautomationpractice.blogspot.com/');
    page.on('dialog', (dialog)=>{
        expect(dialog.message()).toContain('Press a button!')
        dialog.dismiss()   
    })
    await page.locator('#confirmBtn').click()
    expect(page.locator('#demo')).toContainText('You pressed Cancel!')

})

