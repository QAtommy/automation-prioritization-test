import { Page, Locator } from '@playwright/test';

export type CheckoutCartItem = {
  name: string;
  description: string;
  price: string;
};

export class CheckoutFlowPage {
  readonly page: Page;

  // Step one locators
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButtonStepOne: Locator;
  readonly checkoutStepOneTitle: Locator;

  // Step two locators
  readonly cartItems: Locator;
  readonly itemTotals: Locator;
  readonly paymentInfo: Locator;
  readonly shippingInfo: Locator;
  readonly finishButton: Locator;
  readonly cancelButtonStepTwo: Locator;
  readonly backHomeButton: Locator;
  readonly checkoutStepTwoTitle: Locator;

  // Step complete locators
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly checkoutCompleteTitle: Locator;

  /**
   * Initializes the CheckoutFlowPage with locators for all checkout steps.
   * @param {Page} page - The Playwright Page object
   */
  constructor(page: Page) {
    this.page = page;

    // Step 1
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButtonStepOne = page.locator('[data-test="cancel"]');
    this.checkoutStepOneTitle = page.locator('[data-test="title"]');

    // Step 2
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.itemTotals = page.locator('.summary_info');
    this.paymentInfo = page.locator('[data-test="payment-info-value"]');
    this.shippingInfo = page.locator('[data-test="shipping-info-value"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButtonStepTwo = page.locator('[data-test="cancel"]');  
    this.checkoutStepTwoTitle = page.locator('[data-test="title"]');

    // Completion
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
    this.checkoutCompleteTitle = page.locator('[data-test="title"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  /**
   * Navigates to the checkout step one (shipping information) page.
   * @returns {Promise<void>}
   */
  async gotoStepOne(): Promise<void> {
    await this.page.goto('/checkout-step-one.html');
  }

  /**
   * Navigates to the checkout step two (order review) page.
   * @returns {Promise<void>}
   */
  async gotoStepTwo(): Promise<void> {
    await this.page.goto('/checkout-step-two.html');
  }

  /**
   * Navigates to the checkout complete (confirmation) page.
   * @returns {Promise<void>}
   */
  async gotoComplete(): Promise<void> {
    await this.page.goto('/checkout-complete.html');
  }

  /**
   * Fills in the checkout information on step one.
   * @param {string} firstName - The customer's first name
   * @param {string} lastName - The customer's last name
   * @param {string} postalCode - The customer's postal code
   * @returns {Promise<void>}
   */
  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    // Sometimes the fill command will not populate the first name field correctly if the page is not fully loaded, 
    // so we wait for the continue button to be visible before filling in the fields. This is an issue on Webkit
    await this.continueButton.waitFor({ state: 'visible' });
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  /**
   * Clicks the continue button on step one to proceed to step two.
   * @returns {Promise<void>}
   */
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  /**
   * Clicks the cancel button on step one to return to the cart.
   * @returns {Promise<void>}
   */
  async clickCancelStepOne(): Promise<void> {
    await this.cancelButtonStepOne.click();
  }

  /**
   * Clicks the finish button on step two to complete the checkout.
   * @returns {Promise<void>}
   */
  async clickFinish(): Promise<void> {
    await this.finishButton.click();
  }

  /**
   * Clicks the cancel button on step two to return to the cart.
   * @returns {Promise<void>}
   */
  async clickCancelStepTwo(): Promise<void> {
    await this.cancelButtonStepTwo.click();
  }

  /**
   * Clicks the back home button to return to the products page after checkout completion.
   * @returns {Promise<void>}
   */
  async clickBackHome(): Promise<void> {
    await this.backHomeButton.click();
  }

  /**
   * Returns the locator for a specific checkout item by product name.
   * @param {string} productName - The name of the product
   * @returns {Locator} The locator for the checkout item
   */
  checkoutItem(productName: string): Locator {
    return this.cartItems.filter({
      has: this.page.locator('[data-test="inventory-item-name"]', { hasText: productName }),
    });
  }

  /**
   * Returns the price locator for a specific product in the checkout.
   * @param {string} productName - The name of the product
   * @returns {Locator} The locator for the product price
   */
  getCheckoutItemPrice(productName: string): Locator {
    return this.checkoutItem(productName).locator('[data-test="inventory-item-price"]');
  }

  /**
   * Retrieves all items currently in the checkout cart.
   * @returns {Promise<CheckoutCartItem[]>} An array of checkout cart items with name, description, and price
   */
  async getCartItems(): Promise<CheckoutCartItem[]> {
    const items = await this.cartItems.elementHandles();
    if (!items.length) {
      return [];
    }

    const cartItems: CheckoutCartItem[] = [];
    for (const itemHandle of items) {
      const name = await itemHandle.$eval('[data-test="inventory-item-name"]', (node) => node.textContent?.trim() ?? '');
      const description = await itemHandle.$eval('[data-test="inventory-item-desc"]', (node) => node.textContent?.trim() ?? '');
      const price = await itemHandle.$eval('[data-test="inventory-item-price"]', (node) => node.textContent?.trim() ?? '');
      cartItems.push({ name, description, price });
    }
    return cartItems;
  }

  /**
   * Retrieves the payment information text from the checkout page.
   * @returns {Promise<string>} The payment information text
   */
  async getPaymentInformation(): Promise<string> {
    return (await this.paymentInfo.textContent())?.trim() ?? '';
  }

  /**
   * Retrieves the shipping information text from the checkout page.
   * @returns {Promise<string>} The shipping information text
   */
  async getShippingInformation(): Promise<string> {
    return (await this.shippingInfo.textContent())?.trim() ?? '';
  }

  /**
   * Retrieves the total summary text from the checkout page.
   * @returns {Promise<string>} The total summary text
   */
  async getTotalSummaryText(): Promise<string> {
    return (await this.itemTotals.textContent())?.trim() ?? '';
  }

  /**
   * Retrieves the checkout completion header text.
   * @returns {Promise<string>} The completion header text
   */
  async getCompleteHeaderText(): Promise<string> {
    return (await this.completeHeader.textContent())?.trim() ?? '';
  }

  /**
   * Retrieves the checkout completion message text.
   * @returns {Promise<string>} The completion message text
   */
  async getCompleteText(): Promise<string> {
    return (await this.completeText.textContent())?.trim() ?? '';
  }

  /**
   * Retrieves the title text from the checkout complete page.
   * @returns {Promise<string>} The title text
   */
  async getTitleText(): Promise<string> {
    return (await this.checkoutCompleteTitle.textContent())?.trim() ?? '';
  }
}
