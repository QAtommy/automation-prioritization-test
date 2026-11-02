import { test, expect } from '@playwright/test';
import { STANDARD_USER_AUTH_FILE } from '../auth-storage';
import { ProductsPage } from '../../page-objects/ProductsPage';
import { CartPage } from '../../page-objects/CartPage';
import { CheckoutFlowPage } from '../../page-objects/CheckoutFlowPage';

test.describe('Purchasing workflow', () => {
  test.use({ storageState: STANDARD_USER_AUTH_FILE });

  test('should add product to cart and complete e2e purchase flow', async ({ page }) => {
    const productName = 'Sauce Labs Backpack';
    const checkoutFirstName = `${process.env.CHECKOUT_FIRST_NAME}`;
    const checkoutLastName = `${process.env.CHECKOUT_LAST_NAME}`;
    const checkoutPostalCode = `${process.env.CHECKOUT_POSTAL_CODE}`;
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutFlowPage = new CheckoutFlowPage(page);
    let productPrice: string;

    await test.step('Navigate to products page and capture product price', async () => {
      await productsPage.goto();
      productPrice = await productsPage.getPriceForItem(productName);
    });

    await test.step('Add product to cart', async () => {
      await productsPage.clickAddToCart(productName);
    });

    await test.step('Verify product in cart matches product page details', async () => {
      await productsPage.openCart();
      const testProduct = cartPage.cartItem(productName);
      await expect(testProduct).toBeVisible();
      await expect(testProduct.locator('.inventory_item_price')).toHaveText(productPrice);
    });

    await test.step('Proceed to checkout', async () => {
      await cartPage.clickCheckout();
    });

    await test.step('Fill checkout information and continue', async () => {
      await checkoutFlowPage.fillCheckoutInformation(checkoutFirstName, checkoutLastName, checkoutPostalCode);
      await checkoutFlowPage.clickContinue();
    });

    await test.step('Verify product details on checkout overview page', async () => {
      await expect(checkoutFlowPage.checkoutStepTwoTitle).toHaveText('Checkout: Overview');
      const testProduct = checkoutFlowPage.checkoutItem(productName);
      await expect(testProduct).toBeVisible();          
      await expect(checkoutFlowPage.getCheckoutItemPrice(productName)).toHaveText(productPrice);
    });

    await test.step('Complete purchase and verify order confirmation', async () => {
      await checkoutFlowPage.clickFinish();
      await expect(checkoutFlowPage.completeHeader).toHaveText('Thank you for your order!');
      await expect(checkoutFlowPage.checkoutCompleteTitle).toContainText('Checkout: Complete');
    });
  });
});
