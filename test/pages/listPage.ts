import type { Page} from "@playwright/test"
import { expect } from "@playwright/test"
import { homePage } from "./homePage"

export const listPage = (page: Page) => {
    const BASE_URL = homePage(page).BASE_URL;
    //Pagelocators
    const listPageButton = page.getByRole('button', { name: 'LIST' })
    const listPageTitle = page.locator('h1')


    //Pagefunctions
    const goto = async () => {
      await page.goto(BASE_URL + `/list`);
      await expect( listPageTitle).toBeVisible();
      await expect( listPageButton).toBeVisible();
    };

    return {
        goto,
        listPageButton
    };
}
