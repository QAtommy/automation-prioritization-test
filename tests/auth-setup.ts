import { test as setup } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { AuthPage } from '../page-objects/AuthPage';
import { STANDARD_USER_AUTH_FILE } from './auth-storage';

const standardUserAccount = `${process.env.STANDARD_USER_ACCOUNT}`;
const standardUserPassword = `${process.env.STANDARD_USER_PASSWORD}`;

// Authenticate 'standard_user' account for all tests
setup('authenticate as standard_user', async ({ page }) => {
    const authPage = new AuthPage(page);
    await authPage.goto();
    await authPage.login(standardUserAccount, standardUserPassword);
    await page.waitForURL(/inventory/);    
    const dir = path.dirname(STANDARD_USER_AUTH_FILE);
    fs.mkdirSync(dir, { recursive: true });
    // Save authenticated state to a file for use in other tests
    await page.context().storageState({ path: STANDARD_USER_AUTH_FILE });
});