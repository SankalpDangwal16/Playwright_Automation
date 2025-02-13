// Function to generate a random username
export function generateRandomUsername() {
  return `user_${Math.random().toString(36).substring(2, 10)}`;
}

// Function to generate random Australian user data
export function generateRandomUserData() {
  const firstNames = ['Liam', 'Olivia', 'Noah', 'Emma', 'Jack', 'Isabella', 'Lucas', 'Mia'];
  const lastNames = ['Smith', 'Brown', 'Williams', 'Jones', 'Taylor', 'Wilson', 'Evans', 'Walker'];
  const cities = ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Canberra', 'Hobart'];
  const states = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'ACT', 'TAS'];

  const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const firstName = randomItem(firstNames);
  const lastName = randomItem(lastNames);
  const city = randomItem(cities);
  const state = randomItem(states);
  const randomStreetNumber = Math.floor(Math.random() * 1000);
  const postcode = Math.floor(2000 + Math.random() * 7999); // Valid Australian postcodes range

  return {
    firstName: firstName,
    lastName: lastName,
    address: `${randomStreetNumber} ${randomItem(['George St', 'King St', 'Elizabeth St', 'Queen St'])}`,
    city: city,
    state: state,
    zipCode: `${postcode}`,
    phone: `04${Math.floor(10000000 + Math.random() * 89999999)}`, // Australian mobile numbers start with 04
    ssn: `${Math.floor(100 + Math.random() * 900)}-${Math.floor(10 + Math.random() * 90)}-${Math.floor(1000 + Math.random() * 9000)}`,
    username: generateRandomUsername(),
    password: `Pass${Math.random().toString(36).substring(2, 6)}@123`
  };
}
