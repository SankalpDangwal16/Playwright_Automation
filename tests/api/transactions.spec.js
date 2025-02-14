const { test, expect } = require('@playwright/test');

test('Verify Transactions for Account 14454', async ({ request }) => {
  // Define the username and password

// Since this  is a dummy data pushing the credentials..

  const username = "josedon";
  const password = "sanku";

  // Combine username and password and encode to base64
  const credentials = `${username}:${password}`;
  const encodedCredentials = Buffer.from(credentials).toString("base64");

  // Define the headers with Authorization
  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Referer": "https://parabank.parasoft.com/",
    "X-Requested-With": "XMLHttpRequest",
    "Authorization": `Basic ${encodedCredentials}`,
  };

  // Define the URL for the transaction API
  const url = "https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/14454/transactions?timeout=30000";

  // Extract account ID dynamically from the URL
  const accountId = url.split('/')[6];  // Extract account ID from URL (14454)

  // Ensure the accountId is correctly parsed as a number
  const expectedAccountId = Number(accountId);  // Ensuring accountId is a number for proper comparison

  // Send the GET request using Playwright's request API
  const response = await request.get(url, { headers });

  // Log the request URL and response details
  console.log(`Request URL: ${response.url()}`);
  console.log(`Request Headers: ${JSON.stringify(response.headers())}`);

  // Ensure the response status is OK (200)
  expect(response.status()).toBe(200);

  // Parse the response body as JSON
  const responseBody = await response.json();
  console.log(`Response Body: ${JSON.stringify(responseBody)}`);

  // Validate specific fields in the response
  expect(responseBody).toHaveLength(1); // Check if there is one transaction in the response

  const transaction = responseBody[0];
  
  // Expected values for comparison
  const expectedTransaction = {
    accountId: expectedAccountId,  // Correctly set accountId as a number
  };

  // Field: accountId
  // Assert if 'accountId' field is not null
  expect(transaction.accountId).not.toBeNull();
  console.log(`Field: accountId`);
  console.log(`Expected: Not Null == Actual: ${transaction.accountId}`);

  // Field: date
  // Assert if 'date' field is not null
  expect(transaction.date).not.toBeNull();
  console.log(`Field: date`);
  console.log(`Expected: Not Null == Actual: ${transaction.date}`);

  // Field: description
  // Assert if 'description' contains 'bill payment'
  expect(transaction.description).toContain("Bill Payment");
  console.log(`Field: description`);
  console.log(`Expected: Contains 'Bill Payment' == Actual: ${transaction.description}`);

  // Field: amount
  // Assert if 'amount' is not null
  expect(transaction.amount).not.toBeNull();
  console.log(`Field: amount`);
  console.log(`Expected: Not Null == Actual: ${transaction.amount}`);

  // Field: type
  // Assert if 'type' is 'Debit'
  expect(transaction.type).toBe("Debit");
  console.log(`Field: type`);
  console.log(`Expected: Debit == Actual: ${transaction.type}`);
});
