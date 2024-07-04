import { expect, test } from '@playwright/test'
test.use({ actionTimeout: 10000 })
// Runs in Checkly as a monitor
test('wait for test application to become visible', async ({ page }) => {
  await page.goto(process.env['MONITOR_ENVIRONMENT_URL']?? 'http://localhost:4200/')
  const mainHeadline = page.locator('h1').getByText('Test applicatie voor DevOps')
  await expect(mainHeadline).toBeVisible()
})
