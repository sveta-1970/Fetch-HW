/*
Задача знайти api монобанк курс валют, нова пошта віділення та погода. 
 1 Напишіть JavaScript-функцію, яка виконує GET запит до відкритого API за допомогою Fetch.
 2 Функція повинна приймати URL API як вхідний параметр.
 3 Використовуйте Fetch, щоб виконати GET запит за вказаною URL.
 4 Обробляйте отриману відповідь у форматі JSON та виводьте результати в консоль.
 5 Обробляйте можливі помилки під час виконання запиту та виводьте відповідне повідомлення про помилку.
*/

//api monobank

const data = req("https://api.monobank.ua/bank/currency");

async function req(url) {
  const data = await fetch(url);
  return await data.json();
} //в результате получаем Promise

data
  .then((info) => {
    showCurrency(info);
  })
  .catch((e) => {
    console.error(e);
  });

function showCurrency(data = []) {
  if (!Array.isArray(data)) return;
  const tbody = document.querySelector("tbody");

  data.forEach((obj, i) => {
    const pattern = `
         <tr>
         <td>${i + 1}</td>
         <td>${obj.currencyCodeA}</td>
         <td>${obj.rateCross.toFixed(2)}</td>
         </tr>
         `;
    tbody.insertAdjacentHTML("beforeend", pattern);
  });
}

//weather api
async function req_weather(url) {
  const data = await fetch(url);
  return await data.json();
} //в результате получаем Promise

const apiKey_weather = "5e558f0e7abf23b620280db81851fd8d";
const data_weather = req_weather(
  `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey_weather}&units=metric`
);

data_weather
  .then((info) => {
    console.log(info);
    showWeather(info);
  })
  .catch((e) => {
    console.error(e);
  });

function showWeather(obj) {
  const weather = document.getElementById("weather");
  const pattern = `
  <div class="city">${obj.name}</div>
  <div class="temperature">${Math.round(obj.main.temp)} °C</div>
  <div class="description">${obj.weather[0].description}</div>
  `;

  weather.insertAdjacentHTML("beforeend", pattern);
}

//api nova poshta

const input = document.querySelector("#search");
const button = document.querySelector("#search_button");

async function req_np({
  url,
  apiKey,
  modelName,
  calledMethod,
  methodProperties,
}) {
  const data = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      modelName,
      calledMethod,
      methodProperties,
      apiKey,
    }),
  });
  return await data.json();
}

const data_np = req_np({
  url: "https://api.novaposhta.ua/v2.0/json/",
  apiKey: "",
  modelName: "Address",
  calledMethod: "getWarehouses",
  methodProperties: {},
});

button.addEventListener("click", handleFilter);

function handleFilter(e) {
  e.preventDefault();
  data_np
    .then((info) => {
      showWarehouses(info.data);
    })
    .catch((error) => console.error(error));
}

function showWarehouses(data = []) {
  if (!Array.isArray(data)) return;
  const warehouses = document.querySelector("#warehouses");

  data.map((item) => {
    const search_city = input.value;
    if (item.SettlementDescription === search_city) {
      console.log(item.ShortAddress); //адреса
      const pattern = `<li>${item.ShortAddress}</li>`;
      warehouses.insertAdjacentHTML("beforeend", pattern);
    }
  });
}
