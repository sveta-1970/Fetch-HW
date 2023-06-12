export async function req(url) {
  const data = await fetch(url);
  return await data.json();
} //в результате получаем Promise
