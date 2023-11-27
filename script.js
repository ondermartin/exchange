const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const result = document.getElementById('result');

// Fetch available currencies and populate dropdowns
async function populateCurrencies() {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    const currencies = Object.keys(data.rates);

    currencies.forEach(currency => {
      const option1 = document.createElement('option');
      option1.text = currency;
      option1.value = currency;
      fromCurrency.add(option1);

      const option2 = document.createElement('option');
      option2.text = currency;
      option2.value = currency;
      toCurrency.add(option2);
    });
  } catch (error) {
    console.error('Error fetching currencies:', error);
  }
}

// Convert currency based on user input
async function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (from === to) {
    result.innerText = 'Please select different currencies';
    return;
  }

  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await response.json();

    const exchangeRate = data.rates[to];
    const convertedAmount = (amount.value * exchangeRate).toFixed(2);

    result.innerText = `${amount.value} ${from} = ${convertedAmount} ${to}`;
  } catch (error) {
    result.innerText = 'Error converting currency';
    console.error('Error:', error);
  }
}

// Populate currency dropdowns on page load
window.onload = populateCurrencies;
