import {test, expect} from '@playwright/test'
import fs from 'fs'

test('download', async ({page}) => {
    const downloadDir = 'downloads'
    const filePath = `${downloadDir}/info.txt`
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
    }

    await page.goto('https://testautomationpractice.blogspot.com/p/download-files_25.html')
    const textInput = 'automation'
    await page.locator('#inputText').fill(textInput)
    await page.locator('#generateTxt').click()

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.locator('#txtDownloadLink').click()
    ])

    const downloadPath = `${downloadDir}/${download.suggestedFilename()}`
    await download.saveAs(downloadPath)

    expect(download.suggestedFilename()).toContain('info.txt')

    expect(fs.existsSync(downloadPath)).toBeTruthy()

    const fileContent = fs.readFileSync(downloadPath, 'utf-8')
    expect(fileContent).toBe(textInput)
})
