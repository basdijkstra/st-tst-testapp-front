import { expect, test } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';
import ENV from '../utils/ENV';
import { homePage } from 'test/pages/homePage';
import { listPage } from 'test/pages/listPage';
import { newPage } from 'test/pages/newPage';


const address = 'AutoTestAddress';
const country = 'AutoTestCountry';
const information = 'AutoTestInformation';
test('The site is up @local, @smoketest', async ({ page }) => {
  //arrange
  await homePage(page).goto();
  //act
  await homePage(page).homePageStartButton.click();
  //assert
  await expect(page).toHaveURL(/.start/,);
});

test('The user list is available @local @Smoketest', async ({ page }) => {
  //arrange - go to the list page
  await homePage(page).goto();
  //act  - click on the list button to go to the list page
  await listPage(page).listPageButton.click();
  //assert - that the user table is visible
  await expect(page).toHaveURL(/.list/,);
  await expect(
    page.getByRole('row', { name: 'Id Name Country' })
  ).toBeVisible();
});


test('The user AutoTestName can be added to the list @smoketest', async ({
  page,
  request,
}) => {
  const uniqueName = 'AutoTestName' + uuidv4();
  //arrange - go to the NEW page and fill in the form
  await newPage(page).goto();
  await newPage(page).listPageButton.click();
  await newPage(page).usernameTextbox.fill(uniqueName);
  await newPage(page).addressTextbox.fill(address);
  await newPage(page).countryTextbox.fill(country);
  await newPage(page).informationTextbox.fill(information);
  //act - submit the form
  await newPage(page).submitButton.click();
  await page.waitForEvent('response');

  //assert  - that the user is added to the list via the api
  const response = await request.get(homePage(page).BASE_URL+ `/api/v1/DelaUser`);
  expect(response.status()).toBe(200);
  const userList = await response.json();
  const usernameFound = userList.filter((obj: { name: string; id: string }) => {
    return obj.name == uniqueName;
  });
  expect(usernameFound.length).toBeGreaterThan(0);
  expect(usernameFound[0]).not.toBeUndefined();
  expect(usernameFound[0].name).toBe(uniqueName);
  expect(usernameFound[0].address).toBe(address);
  expect(usernameFound[0].country).toBe(country);
  expect(usernameFound[0].information).toBe(information);
  // delete the test user via the api
  expect(
    (
      await request.get(
        homePage(page).BASE_URL + `/api/v1/DelaUser/delete/` + usernameFound[0].id
      )
    ).status()
  ).toBe(200);
});

test('The user AutoTestName is on the list @smoketest', async ({
  page,
  request,
}) => {
  //arrange - add the user via the api
  const uniqueName = 'AutoTestName' + uuidv4();
  try {
    const response = await request.post(homePage(page).BASE_URL + `/api/v1/DelaUser`, {
      data: {
        name: uniqueName,
        address: address,
        country: country,
        information: information,
      },
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    //act
    await listPage(page).goto();
    //assert
    await page.locator('text=' + uniqueName).isVisible();
    await page.locator('.mat-spinner').isHidden();
    expect(await page.locator('text=' + uniqueName)).toHaveCount(1);
  } finally {
    // delete via api to remove the test user
    const response = await request.get(homePage(page).BASE_URL + `/api/v1/DelaUser`);
    expect(response.status()).toBe(200);
    const userList = await response.json();
    const userFound = userList.filter((obj: { name: string; id: string }) => {
      return obj.name == uniqueName;
    });

    expect(
      (
        await request.get(
          homePage(page).BASE_URL + `/api/v1/DelaUser/delete/` + userFound[0].id
        )
      ).status()
    ).toBe(200);
  }
});

test('use environment variables @local', async ({ page }) => {
  //arrange
  const environment_variable = ENV.MY_ENVIRONMENT_VARIABLE;

  await page.goto(homePage(page).BASE_URL, { waitUntil: 'networkidle' });
  //act
  console.log(environment_variable);
  //assert
});
