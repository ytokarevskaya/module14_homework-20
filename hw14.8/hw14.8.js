/*
Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.
Заголовок первого input — «номер страницы».
Заголовок второго input — «лимит».
Заголовок кнопки — «запрос».
При клике на кнопку происходит следующее:
Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input.
Пример: если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
После получения данных вывести список картинок на экран.
Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).
*/

//функция проверки диапазона
validateNumber = (value, min, max) => {
  value = +value;
  if((typeof value !== "number" || isNaN(value)) || (value < min || value > max)) {
    return false;
  };
  return true;
}

//функция записи в кукис
setCookies = (data) => {
  localStorage.setItem("userData", JSON.stringify(data));
}

//функция очистки кукис
clearCookies = () => {
  localStorage.removeItem("userData");
}

//отображение полученного результата на странице
displayResult = data => {
  let images = "";
  data.forEach(item => {
    console.log(item, `<img src="${item.download_url}" alt="${item.author}">`);
    images += `<img src="${item.download_url}" alt="${item.author}" class="width-100">`;
  });
  return images;
}

document.addEventListener("DOMContentLoaded", () => {

  const formInput = document.querySelectorAll(".formInput"),
        button = document.querySelector(".btn");
  const resultField = document.querySelector(".result");

  const min = 1, max = 10;

  //обработчик на кнопку
  button.addEventListener("click", () => {
    //очистка кукис и предыдущего результата
    clearCookies();
    resultField.innerHTML = "";
    const pageNumber = formInput[0].value,
          limit = formInput[1].value;
    //проверка введенных значений
    if(!validateNumber(pageNumber, min, max) && !validateNumber(limit, min, max)) {
      resultField.innerHTML = `Номер страницы и лимит вне диапазона от ${min} до ${max}`;
    }
    else if(!validateNumber(pageNumber, min, max)) {
      resultField.innerHTML = `Номер страницы вне диапазона от ${min} до ${max}`;
    }
    else if(!validateNumber(limit, min, max)) {
      resultField.innerHTML = `Лимит вне диапазона от ${min} до ${max}`;
    }
    else {
      fetch(`https://picsum.photos/v2/list?page=${pageNumber}&limit=${limit}`)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        resultField.innerHTML = displayResult(result);
        setCookies(result);
      })
      .catch(() => {
        resultField.innerHTML = "Произошла ошибка при загрузке ресурса."
      })
    };
  });

  //проверка, посещал ли пользователь страницу и загрузка результатов из кукис
  let userData = localStorage.getItem("userData") || "";
  if(userData.length > 0) {
    userData = JSON.parse(userData);
    resultField.innerHTML = displayResult(userData);
  }

});
