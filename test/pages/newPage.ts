import type { Page} from "@playwright/test"
import { expect } from "@playwright/test"
import { homePage } from "./homePage"

export const newPage = (page: Page) => {
    const BASE_URL = homePage(page).BASE_URL;
    //Pagelocators
    const listPageButton = page.getByRole('button', { name: 'NEW' })
    const listPageTitle = page.locator('h1')
    const usernameTextbox = page.getByPlaceholder('name')
    const addressTextbox = page.getByPlaceholder('address')
    const countryTextbox = page.getByPlaceholder('country')
    const informationTextbox = page.getByPlaceholder('information')
    const submitButton = page.getByRole('button', { name: 'Submit' })

    //Pagefunctions
    const goto = async () => {
      await page.goto(BASE_URL + `/new`)
      await expect( listPageTitle).toBeVisible();
      await expect( listPageButton).toBeVisible();
    };

    return {
        goto,
        listPageButton,
        usernameTextbox,
        addressTextbox,
        countryTextbox,
        informationTextbox,
        submitButton

    };
}
