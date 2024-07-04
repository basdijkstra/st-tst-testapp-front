import { test, expect } from '@playwright/test';
import { loginCrmService } from '../utils/loginCrmService';

// skip this test for now because the credentials are not correct and stored in keyvault
test.skip('login with totp', async ({ page }) => {
  await loginCrmService(page).loginwithEmailAndPassword('crmuser@dela.org','ReplaceWachtwoord');
});


