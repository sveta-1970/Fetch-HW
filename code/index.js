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
    info.map((item) => {
      console.log(item);
    });
  })
  .catch((e) => {
    console.error(e);
  });

//api nova poshta

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

data_np
  .then((info) => console.log(info))
  .catch((error) => console.error(error));

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
  })
  .catch((e) => {
    console.error(e);
  });
