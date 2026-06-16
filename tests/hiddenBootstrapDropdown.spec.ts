import { test, expect, Locator } from '@playwright/test'

test('validating the dropdown', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/')

  const nameField: Locator = page.locator('[name="username"]')
  await nameField.fill('admin')

  const passwordField: Locator = page.locator('[name="password"]')
  await passwordField.fill('admin123')

  await page.locator('button[type="submit"]').click()
  await page.locator('[href="/web/index.php/pim/viewPimModule"]').click()

  const label = page.locator('label').filter({ hasText: 'Employment Status' })
  await expect(label).toBeVisible()

  await label.locator('..').locator('..').locator('i').first().click()

  await page.waitForTimeout(3000)

  const options: Locator = page.locator('[role="option"] span')
  console.log(await options.count())

  const arrayOfOptions: string[] = (await options.allTextContents()).map((text) =>
    text.trim()
  )

  const selectedOption = arrayOfOptions[1]
  await options.nth(1).click()

  await expect(
    label.locator('..').locator('..').locator('.oxd-select-text-input')
  ).toHaveText(selectedOption)
})
