import type { Page} from "@playwright/test"
import { expect } from "@playwright/test"
import { homePage } from "./homePage"

export const listPage = (page: Page) => {
    const BASE_URL = homePage(page).BASE_URL;
    //Pagelocators
    const editPageButton = page.getByRole('button', { name: 'EDIT' })
    const editPageTitle = page.locator('h1')


    //Pagefunctions
    const goto = async () => {
      await page.goto(BASE_URL + `/edit`);
      await expect( editPageTitle).toBeVisible();
      await expect( editPageButton).toBeVisible();
    };

    return {
        goto,
        editPageButton
    };
}
