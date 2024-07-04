import type { Page} from "@playwright/test"
import { expect } from "@playwright/test"

export const homePage = (page: Page) => {
    const BASE_URL = process.env['BASE_URL'] ?? 'http://localhost:4200/';

    //Pagelocators
    const homePageStartButton = page.getByRole('button', { name: 'START' })
    const homePageTitle = page.locator('h1')


    //Pagefunctions
    const goto = async () => {
      await page.goto(BASE_URL);
      await expect( homePageTitle).toBeVisible();
      await expect( homePageStartButton).toBeVisible();
    };

    return {
        goto,
        BASE_URL,
        homePageStartButton
    };
}
