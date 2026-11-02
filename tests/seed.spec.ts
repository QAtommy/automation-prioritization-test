/**
 * This seed file only needs to be modified if you want to generate tests or POM using the playwright-test-generator subagent
 * After the auth project runs, this seed file puts the app in the correct state needed for the playwright-test-generator to generate tests.
 */

import { test } from '@playwright/test';
import { STANDARD_USER_AUTH_FILE } from './auth-storage';
import { ProductsPage } from '../page-objects/ProductsPage';

// Remove .skip to run this test and generate tests with the playwright-test-generator
test.describe.skip('Test group', () => {
  test.use({ storageState: STANDARD_USER_AUTH_FILE });
  test('seed', async ({ page }) => {
      const productsPage = new ProductsPage(page);
      await productsPage.goto();
  });
});
