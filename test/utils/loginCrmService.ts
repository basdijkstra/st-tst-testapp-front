import type { Page} from "@playwright/test"
import { expect } from "@playwright/test"
import * as crypto from "crypto";
import { getTotp } from "./totp.js";

export const loginCrmService = (page: Page) => {

    //Pagelocators
    const crmDelaLoginUrl = 'https://login.microsoftonline.com/73ce2ae9-4375-47c5-a292-8bb63d26d0b9/oauth2/authorize?client_id=00000007-0000-0000-c000-000000000000&response_mode=form_post&response_type=code+id_token&scope=openid+profile&state=OpenIdConnect.AuthenticationProperties%3dMAAAAJZ2PBtsShHui8UADTpk0KIIFxkjPFlORZNjZ_E2oea2mQ33K1fCquS6--4Me76bcQEAAAABAAAACS5yZWRpcmVjdCJodHRwczovL2RlbGFhY2MuY3JtNC5keW5hbWljcy5jb20v%26RedirectTo%3dMAAAAJZ2PBtsShHui8UADTpk0KLXNU%252bAn0YQlMYiQO8KhxRHyO4qFmkjjTDdtvkzhkYpQmh0dHBzOi8vZGVsYWFjYy5jcm00LmR5bmFtaWNzLmNvbS8%253d%26RedirectToForMcas%3dhttps%253a%252f%252fdelaacc.crm4.dynamics.com%252f'
    const emailInputField = page.getByPlaceholder('gebruiker@dela.org')
    const passwordInputField = page.getByPlaceholder('Password')
    const codeInputField = page.getByPlaceholder('Code')
    const totpPrivateSecurityCode = '123456789'
    const SecurityCode = getTotp(totpPrivateSecurityCode, Date.now(), 'sha1', 6, 30, crypto)
    //Pagefunctions
    const loginwithEmailAndPassword = async (email:string , password:string ) => {
        await page.goto(crmDelaLoginUrl);
        await expect(emailInputField).toBeVisible();
        await emailInputField.click();
        await emailInputField.fill(email);
        await emailInputField.press('Enter');
        await passwordInputField.click();
        await passwordInputField.fill(password);
        await passwordInputField.press('Enter');
        await page.getByRole('link', { name: 'I can\'t use my Microsoft Authenticator app right now' }).click();
        await page.getByRole('button', { name: 'Use a verification code' }).click();
        await codeInputField.click();
        await codeInputField.fill(SecurityCode);
        await codeInputField.press('Enter');
        await page.waitForURL(/.*crm4.dynamics.com/);

    }

    return {
        loginwithEmailAndPassword,

    }
}
