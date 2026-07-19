import {Page, test, expect, Locator} from '@playwright/test'
let page: Page

test.beforeAll('open page',async ({browser})=>{
    page = await browser.newPage()
    await page.goto('https://www.demoblaze.com/index.html')
})

test.beforeEach('login', async ({})=>{
    await page.locator('#login2').click()
    await page.locator('#loginusername').fill('admin1223')
    await page.locator('#loginpassword').fill('admin1223')
    await page.locator('[onclick="logIn()"]').click()
    await expect(page.locator('#logout2')).toBeVisible()
})

test.afterEach('logout', async({})=>{
    await  page.locator('#logout2').click() 
})

test('count the number of product', async({})=>{
    const products = page.locator('.hrefch')
    await expect(products).toHaveCount(9)
})

test('add product', async({})=>{
    await page.locator('.hrefch', { hasText: 'Samsung galaxy s6' }).click();
    await page.locator('[onclick="addToCart(1)"]').click()
    page.once('dialog',async(dialog)=>{
        expect(dialog.message()).toContain('Product added')
        await dialog.accept()
    })
})