import { Page, Locator } from '@playwright/test';

export class AuthPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  /**
   * Initializes the AuthPage with locators for login elements.
   * @param {Page} page - The Playwright Page object
   */
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Navigates to the login page.
   * @returns {Promise<void>}
   */
  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  /**
   * Logs in with the provided username and password.
   * @param {string} username - The username to enter
   * @param {string} password - The password to enter
   * @returns {Promise<void>}
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}