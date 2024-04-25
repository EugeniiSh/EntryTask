console.log('Hellow!');

async function getRate()
{
  const response = await fetch('https://open.er-api.com/v6/latest/USD');

  if (response.ok) 
  {
    const json = await response.json();
    console.log(json);
    return json;
  } 
  else 
  {
    console.log("Ошибка HTTP: " + response.status);
  }
}

async function renderOptionElements(responseJson, selectElement)
{
  const copyJson = await responseJson;
  const allCurrencyArr = Object.keys(copyJson.rates);
  allCurrencyArr.forEach((key) =>
  {
    const optionElement = document.createElement('option');
    optionElement.textContent = key;
    selectElement.append(optionElement);
  })
}

async function getExchangeRate(responseJson, whatChange, fromChange)
{
  const copyJson = await responseJson;
  return copyJson.rates[fromChange] / copyJson.rates[whatChange];
}

async function showLastUpdate(responseJson, htmlElement)
{
  const copyJson = await responseJson;
  htmlElement.textContent = `Данные за ${copyJson.time_last_update_utc}`;
}


const enteringAmountLeft = document.querySelector('.entering-amount-left');
const enteringAmountRight = document.querySelector('.entering-amount-right');

const enteringCurrencyLeft = document.querySelector('.entering-currency-left');
const enteringCurrencyRight = document.querySelector('.entering-currency-right');

const lastUpdate = document.querySelector('.last-update');


const rates = getRate();
renderOptionElements(rates, enteringCurrencyLeft);
renderOptionElements(rates, enteringCurrencyRight);
showLastUpdate(rates, lastUpdate);


enteringAmountLeft.addEventListener('input', () =>
{
  const whatChange = enteringCurrencyLeft.options[enteringCurrencyLeft.options.selectedIndex].textContent;
  const fromChange = enteringCurrencyRight.options[enteringCurrencyRight.options.selectedIndex].textContent;

  const exchangeRate = getExchangeRate(rates, whatChange, fromChange);
  exchangeRate.then(data => enteringAmountRight.value = enteringAmountLeft.value * data);
})

enteringAmountRight.addEventListener('input', () =>
{
  const whatChange = enteringCurrencyRight.options[enteringCurrencyRight.options.selectedIndex].textContent;
  const fromChange = enteringCurrencyLeft.options[enteringCurrencyLeft.options.selectedIndex].textContent;

  const exchangeRate = getExchangeRate(rates, whatChange, fromChange);
  exchangeRate.then(data => enteringAmountLeft.value = enteringAmountRight.value * data);
})

enteringCurrencyLeft.addEventListener('change', () =>
{
  const whatChange = enteringCurrencyLeft.options[enteringCurrencyLeft.options.selectedIndex].textContent;
  const fromChange = enteringCurrencyRight.options[enteringCurrencyRight.options.selectedIndex].textContent;

  const exchangeRate = getExchangeRate(rates, whatChange, fromChange);
  exchangeRate.then(data => enteringAmountRight.value = enteringAmountLeft.value * data);
})

enteringCurrencyRight.addEventListener('change', () =>
{
  const whatChange = enteringCurrencyRight.options[enteringCurrencyRight.options.selectedIndex].textContent;
  const fromChange = enteringCurrencyLeft.options[enteringCurrencyLeft.options.selectedIndex].textContent;

  const exchangeRate = getExchangeRate(rates, whatChange, fromChange);
  exchangeRate.then(data => enteringAmountLeft.value = enteringAmountRight.value * data);
})

