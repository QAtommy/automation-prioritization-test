import { Page, Locator } from '@playwright/test';

export type CartItem = {
  name: string;
  description: string;
  price: string;
};

export class CartPage {
  readonly page: Page;
  // readonly cartList: Locator;
  readonly cartItems: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
  readonly cartBadge: Locator;
  // readonly cartTitle: Locator;
  // readonly shoppingCartLink: Locator;

  /**
   * Initializes the CartPage with locators for cart elements.
   * @param {Page} page - The Playwright Page object
   */
  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  /**
   * Navigates to the cart page.
   * @returns {Promise<void>}
   */
  async goto(): Promise<void> {
    await this.page.goto('/cart.html');
  }

  /**
   * Returns the locator for a specific cart item by product name.
   * @param {string} productName - The name of the product
   * @returns {Locator} The locator for the cart item
   */
  cartItem(productName: string): Locator {
    return this.cartItems.filter({
      has: this.page.locator('[data-test="inventory-item-name"]', { hasText: productName }),
    });
  }

  /**
   * Returns the remove button locator for a specific product in the cart.
   * @param {string} productName - The name of the product
   * @returns {Locator} The locator for the remove button
   */
  removeItem(productName: string): Locator {
    return this.cartItem(productName).locator('button[data-test^="remove-"]');
  }

  /**
   * Clicks the remove button for a specific product in the cart.
   * @param {string} productName - The name of the product to remove
   * @returns {Promise<void>}
   */
  async clickRemoveItem(productName: string): Promise<void> {
    await this.removeItem(productName).click();
  }

  /**
   * Clicks the continue shopping button.
   * @returns {Promise<void>}
   */
  async clickContinueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  /**
   * Clicks the checkout button.
   * @returns {Promise<void>}
   */
  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  /**
   * Retrieves all items currently in the cart.
   * @returns {Promise<CartItem[]>} An array of cart items with name, description, and price
   */
  async getCartItems(): Promise<CartItem[]> {
    const items = await this.cartItems.elementHandles();
    if (!items.length) {
      return [];
    }

    const cartItems: CartItem[] = [];
    for (const itemHandle of items) {
      const name = await itemHandle.$eval('[data-test="inventory-item-name"]', (node) => node.textContent?.trim() ?? '');
      const description = await itemHandle.$eval('[data-test="inventory-item-desc"]', (node) => node.textContent?.trim() ?? '');
      const price = await itemHandle.$eval('[data-test="inventory-item-price"]', (node) => node.textContent?.trim() ?? '');
      cartItems.push({ name, description, price });
    }
    return cartItems;
  }

  /**
   * Retrieves the current number of items in the cart.
   * @returns {Promise<number>} The number of items in the cart
   */
  async getCartCount(): Promise<number> {
    const badge = await this.cartBadge.textContent();
    return badge ? Number(badge.trim()) : 0;
  }
}
