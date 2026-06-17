import {test, expect, Locator} from "@playwright/test"

test('comparing method', async ({page})=>{
    await page.goto('https://demowebshop.tricentis.com/')
    const product:Locator = page.locator('.product-title') 
    const count = await product.count()

    for(let i =0; i<count; i++){
       const productName:string | null  = await product.nth(i).textContent()
        console.log(productName?.trim())
    }

})