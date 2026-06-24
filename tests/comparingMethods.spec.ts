import { test, expect, Locator } from "@playwright/test";

test('comparing method', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');
    const product: Locator = page.locator('.product-title');
    const count = await product.count();

    // diffrence between innerText and textContent is ---> innerText only give the actual text but textContent also
    // provide hidden space

    for (let i = 0; i < count; i++) {
        const productName: string | null = await product.nth(i).textContent();
        console.log(productName);
    }

    for (let i = 0; i < count; i++) {
        const productName: string | null = await product.nth(i).innerText();
        console.log(productName);
    }
});

test('allInnerText vs allTextContent', async ({ page }) => {
    // allInnerText example
    await page.goto('https://demowebshop.tricentis.com/');
    const product: Locator = page.locator('.product-title');
    const productArray: string[] = await product.allInnerTexts();
    console.log(productArray);

    // console.log(productArray.map(text=>text.trim())) ----> this can remove the hidden spaces

    // allTextContent example
    await page.goto('https://demowebshop.tricentis.com/');
    const productSecond: Locator = page.locator('.product-title');
    const productArraySecond: string[] = await productSecond.allTextContents();
    console.log(productArraySecond);

    /*
    outputs
    [
      '$25 Virtual Gift Card',
      '14.1-inch Laptop',
      'Build your own cheap computer',
      'Build your own computer',
      'Build your own expensive computer',
      'Simple Computer'
    ]
    [
      '\n            $25 Virtual Gift Card\n        ',
      '\n            14.1-inch Laptop\n        ',
      '\n            Build your own cheap computer\n        ',
      '\n            Build your own computer\n        ',
      '\n            Build your own expensive computer\n        ',
      '\n            Simple Computer\n        '
    ]
    */

});

//converts locator into array 
test('all method', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');

  const products: Locator = page.locator('.product-title');
  const allLocators: Locator[] = await products.all();

  console.log(allLocators);        
  for(const locator of allLocators){
    console.log(await locator.innerText())
  }
});
