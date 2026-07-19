import { Locator, test, expect } from '@playwright/test';

test('Verify chrome CPU value in dynamic table', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const table = page.locator('#taskTable');
    await expect(table).toBeVisible();

    const headers = page.locator('#taskTable thead th');
    const headerCount = await headers.count();

    let cpuColumnIndex = -1;

    for (let i = 0; i < headerCount; i++) {
        const headerText = await headers.nth(i).innerText();

        if (headerText.trim() === 'CPU (%)') {
            cpuColumnIndex = i;
            break;
        }
    }

    expect(cpuColumnIndex).not.toBe(-1);

    const rows = await page.locator('#taskTable tbody tr').all();

    for (const row of rows) {
        const browserName = await row.locator('td').first().innerText();

        if (browserName.trim() === 'Chrome') {
            const cpuValue = await row
                .locator('td')
                .nth(cpuColumnIndex)
                .innerText();

            const cpuValidation = await page.locator('.chrome-cpu').innerText()
             console.log(`Chrome CPU Value: ${cpuValue}`);
            console.log(`validation value ${cpuValidation}`)
            console.log(expect(cpuValidation).toEqual(cpuValue))
            expect(cpuValidation).toEqual(cpuValue);
            break;
        }
    }
});