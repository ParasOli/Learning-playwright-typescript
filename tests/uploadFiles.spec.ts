import {expect, Locator, test} from "@playwright/test"

test('test-1 uploading a single file', async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    const fileSelector:Locator = page.locator('#singleFileInput')
    await fileSelector.setInputFiles('fixtures/demo.pdf')
    expect(fileSelector).toHaveValue(/demo\.pdf/)


})