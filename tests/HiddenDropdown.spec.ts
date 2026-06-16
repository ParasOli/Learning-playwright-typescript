import { test, expect, Locator } from '@playwright/test'

test('should select the second option from the Employment Status dropdown and validate it', async ({
  page,
}) => {
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
  const arrayOfOptions: string[] = (await options.allTextContents()).map((text) =>
    text.trim()
  )

  let selectedOption = ''
  for (const [index, option] of arrayOfOptions.entries()) {
    if (index === 1) {
      selectedOption = option
      await options.nth(index).click()
      break
    }
  }

  await expect(
    label.locator('..').locator('..').locator('.oxd-select-text-input')
  ).toHaveText(selectedOption)
})

