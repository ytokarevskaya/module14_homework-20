/*
Дан JSON-файл с информацией о выручке фирмы по кварталам за период с 2017 по 2019 год. Файл доступен по этой ссылке. Вам нужно написать код приложения, интерфейс которого состоит из:
выпадающего списка (использовать тег select, подробная документация здесь), в котором можно выбрать год с 2017 по 2018;
кнопки «Загрузить отчет».
Пользователь выбирает год в списке и нажимает кнопку «Загрузить отчет». Если год не выбран, вывести сообщение «Выберите, пожалуйста, год». Если год выбран, отправить XHR-запрос к JSON-файлу, используя URL, указанный выше, обработать его содержимое и вывести информацию о выручке в выбранном году в виде таблицы
*/


const url = "https://my.api.mockaroo.com/revenue_2017-2019.json?key=fd36b440";

const dropdown = document.querySelector(".dropdown"),
      button = document.querySelector(".button"),
      errorField = document.querySelector(".error"),
      resultTableTbody = document.querySelector(".table-bordered").getElementsByTagName('tbody')[0];
      chartDiv = document.querySelector(".chartDiv");

//запрос данных
sendRequest = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open("get", url, true);
  xhr.onload = () => {
    if(xhr.status != 200) {
      errorField.innerHTML = `Ошибка запроса! Статус ответа: ${xhr.status}`;
    }
    else {
      const result = JSON.parse(xhr.response);
      if(callback) {
        callback(result);
      };
    };
  };
  xhr.onerror = () => errorField.innerHTML = `Ошибка запроса! Статус ответа: ${xhr.status}`;
  xhr.send();
}

//функция обработки полученных данных
displayResult = (data) => {
  const selectedYear = parseInt(dropdown.value);
  let salesArray = [];
  data.forEach(item => {
    let year = parseInt(item.year);
    if(year === selectedYear) {
      let tds = "";
      for (const prop in item.sales) {
        tds += `<td>${item.sales[prop]}</td>`;
        salesArray.push(item.sales[prop]);
      };
      resultTableTbody.innerHTML = `<tr>${tds}</tr>`;
      chartDiv.innerHTML += `<img src="https://quickchart.io/chart?c={type:'bar',data:{labels:['Кв.1','Кв.2','Кв.3','Кв.4'], datasets:[{label:'Выручка за ${selectedYear} год',data:${JSON.stringify(salesArray)}}]}}" alt="График выручки за ${selectedYear}">`;
      return;
    };
  });
}

//обработчик на кнопку
button.addEventListener("click", () => {
  chartDiv.innerHTML = "";
  errorField.innerHTML = "";
  resultTableTbody.innerHTML = "";
  const year = parseInt(dropdown.value);
  if(isNaN(year)) {
    errorField.innerHTML = `Выберите, пожалуйста, год.`;
    return;
  }
  sendRequest(url, displayResult);
});
