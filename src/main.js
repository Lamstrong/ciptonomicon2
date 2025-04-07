import { createApp } from "vue";
import App from "./App.vue";
import { loadTicker } from "./api";
createApp(App).mount("#app");

// async function updateTickers() {
//     const exchangeData = await loadTicker(this.tickerList.map((t)=>t.name))
//     this.tickerList.forEach((ticker)=>{
//         const price = exchangeData[ticker.name.toUpperCase()]
//         ticker.price = price
//     })

// fetch("https://jsonplaceholder.typicode.com/users")
//   .then((resp) => resp.json())
//   .then((json) => console.log(json))
//   .catch((err) => console.error(err));

// async function myFn() {
//   const resp = await fetch("https://jsonplaceholder.typicode.com/users");
//   const json = await resp.json();
//   console.log(json);
// }

// myFn();

// const socket = new WebSocket(
//   "wss://javascript.info/article/websocket/demo/hello"
// );

// socket.onopen = function (event) {
//   console.log("[open] Соединение установлено");
//   console.log("Отправляем данные на сервер");
//   socket.send("Меня зовут Джон");
// };

// socket.onmessage = function (event) {
//   console.log(`[message] Данные получены с сервера: ${event.data}`);
// };
// socket.onclose = function (event) {
//   if (event.wasClean) {
//     console.log(
//       `[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
//     );
//   } else {
//     console.log(`[close] Соединение прервано`);
//   }
// };

// socket.onerror = function (error) {
//   console.log("[error]");
// };

// const obj = {
//   name: "Mika",
//   age: "19",
//   job: "in proccess...",
// };

// const entries = [
//   ["name", "Mika"],
//   ["age", "19"],
//   ["job", "in proccess..."],
// ];

// // console.log(Object.entries(obj));
// // console.log(Object.fromEntries(entries));

// const map = new Map(entries);
// console.log(map);
