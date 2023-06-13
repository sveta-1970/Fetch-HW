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
    info.map((product) => {
      console.log(product);
    });
  })
  .catch((e) => {
    console.error(e);
  });

//api nova poshta

const apiKey = "43bd842411af97c9174700033d27b00e"; //для нової пошти
const headers = new Headers({
  "Content-Type": "application/json",
  Authorization: apiKey,
});

fetch("https://api.novaposhta.ua/v2.0/json/", { headers })
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));


//weather api
const apiKey_weather = "5e558f0e7abf23b620280db81851fd8d";
const data_weather = req_weather(
  `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey_weather}&units=metric`
);
async function req_weather(url) {
  const data = await fetch(url);
  return await data.json();
} //в результате получаем Promise

const final_data = data_weather
  .then((info) => {
    console.log(info);
  })
  .catch((e) => {
    console.error(e);
  });
