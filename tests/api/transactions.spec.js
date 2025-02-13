import { test, expect } from '@playwright/test';

test('Find Transactions via UI', async ({ page }) => {
    // Step 1: Open ParaBank Login Page
    await page.goto('https://parabank.parasoft.com/parabank');

    // Step 2: Log in (If required)
    await page.fill('input[name="username"]', 'yourUsername');  // Replace with actual username
    await page.fill('input[name="password"]', 'yourPassword');
    await page.click('input[value="Log In"]');

    // Step 3: Navigate to "Find Transactions"
    await page.click('text=Find Transactions');

    // Step 4: Enter Amount and Click "Find Transactions"
    await page.fill('#amount', '100.00');  // Example amount
    await page.click('#findByAmount');

    // Step 5: Wait for transactions to load
    await page.waitForSelector('#transactionTable tbody tr');

    // Step 6: Extract and print transactions
    const transactions = await page.locator('#transactionTable tbody tr').allTextContents();
    console.log('Extracted Transactions:', transactions);

    // Step 7: Validate transactions exist
    expect(transactions.length).toBeGreaterThan(0);
});
