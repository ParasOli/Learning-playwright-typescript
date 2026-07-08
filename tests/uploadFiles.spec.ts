import {expect, Locator, test} from "@playwright/test"

const SELECTORS = {
    fileInput: '#singleFileInput',
    multipleFileInput: '#multipleFilesInput',
    form: '#singleFileForm',
    multipleFileInputForm: '#multipleFilesForm',
    submitBtn: '[type="submit"]',
    statusMessage: '#singleFileStatus',
    multipleFilesStatusMessage:'#multipleFilesStatus'
}

const EXPECTED_MESSAGE = 'Single file selected'

test('should upload a single file and display success message', async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')
    await page.waitForLoadState('networkidle')

    const fileSelector: Locator = page.locator(SELECTORS.fileInput)
    await fileSelector.setInputFiles('fixtures/demo.pdf')
    expect(fileSelector).toHaveValue(/demo\.pdf/)

    await page.locator(SELECTORS.form).locator(SELECTORS.submitBtn).click()

    const statusMessage = page.locator(SELECTORS.statusMessage)
    await statusMessage.waitFor({state: 'visible'})
    const message = await statusMessage.innerText()
    expect(message).toContain(EXPECTED_MESSAGE)
})

test('should upload multiple file and display success message', async ({page})=>{
        await page.goto('https://testautomationpractice.blogspot.com/')
        await page.waitForLoadState('networkidle')
        const fileSelector = page.locator(SELECTORS.multipleFileInput)
        await fileSelector.setInputFiles(['fixtures/demo.pdf', 'fixtures/demoSecond.pdf'])
        await page.locator(SELECTORS.multipleFileInputForm).locator(SELECTORS.submitBtn).click()
        const message = await page.locator(SELECTORS.multipleFilesStatusMessage).innerText()
        console.log(message)
        expect(message).toContain('demo.pdf')
        expect(message).toContain('demoSecond.pdf')

})