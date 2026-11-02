import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productList: Locator;
  readonly shoppingCartLink: Locator;
  readonly cartBadge: Locator;
  readonly menuButton: Locator;
  readonly filterSelect: Locator;
  readonly productTitle: Locator;

  /**
   * Initializes the ProductsPage with locators for product elements.
   * @param {Page} page - The Playwright Page object
   */
  constructor(page: Page) {
    this.page = page;
    this.productList = page.locator('[data-test="inventory-list"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.filterSelect = page.locator('[data-test="product-sort-container"]');
    this.productTitle = page.locator('[data-test="title"]');
  }

  /**
   * Navigates to the products inventory page.
   * @returns {Promise<void>}
   */
  async goto(): Promise<void> {
    await this.page.goto('/inventory.html');
  }

  /**
   * Returns the locator for a specific product item by name.
   * @param {string} productName - The name of the product
   * @returns {Locator} The locator for the product item
   */
  productItem(productName: string): Locator {
    return this.productList.locator('[data-test="inventory-item"]', {
      has: this.page.locator('[data-test="inventory-item-name"]', { hasText: productName }),
    });
  }

  /**
   * Returns the add to cart button locator for a specific product.
   * @param {string} productName - The name of the product
   * @returns {Locator} The locator for the add to cart button
   */
  addItemToCart(productName: string): Locator {
    return this.productItem(productName).locator('button', { hasText: 'Add to cart' });
  }

  /**
   * Returns the remove button locator for a specific product.
   * @param {string} productName - The name of the product
   * @returns {Locator} The locator for the remove button
   */
  removeItemFromCart(productName: string): Locator {
    return this.productItem(productName).locator('button', { hasText: 'Remove' });
  }

  /**
   * Clicks the add to cart button for a specific product.
   * @param {string} productName - The name of the product to add
   * @returns {Promise<void>}
   */
  async clickAddToCart(productName: string): Promise<void> {
    await this.addItemToCart(productName).click();
  }

  /**
   * Clicks the remove button for a specific product.
   * @param {string} productName - The name of the product to remove
   * @returns {Promise<void>}
   */
  async clickRemoveFromCart(productName: string): Promise<void> {
    await this.removeItemFromCart(productName).click();
  }

  /**
   * Retrieves the price of a specific product.
   * @param {string} productName - The name of the product
   * @returns {Promise<string>} The price of the product
   */
  async getPriceForItem(productName: string): Promise<string> {
    return await this.productItem(productName)
      .locator('[data-test="inventory-item-price"]')
      .textContent() ?? '';
  }

  /**
   * Clicks the shopping cart link to navigate to the cart page.
   * @returns {Promise<void>}
   */
  async openCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  /**
   * Sets the product sort order filter.
   * @param {string} order - The sort order option label (e.g., "Price (low to high)", "Name (Z to A)")
   * @returns {Promise<void>}
   */
  async setSortOrder(order: string): Promise<void> {
    await this.filterSelect.selectOption({ label: order });
  }

  /**
   * Retrieves the current number of items in the shopping cart.
   * @returns {Promise<number>} The number of items in the cart
   */
  async getCartCount(): Promise<number> {
    const badge = await this.cartBadge.textContent();
    return badge ? Number(badge.trim()) : 0;
  }
}
