/*
Написать код приложения, интерфейс которого состоит из поля ввода и кнопки «Получить список задач». При нажатии на кнопку нужно отправить запрос с помощью fetch на URL https://jsonplaceholder.typicode.com/users/3/todos. Число 3 представляет собой id пользователя, вместо него нужно подставить число, введенное в поле. Если пользователь с таким id существует, вернется список задач для этого пользователя, каждая задача представлена объектом вида:
{
    "userId": 3,
    "id": 43,
    "title": "tempore ut sint quis recusandae",
    "completed": true
}
Где title — описание задачи, а completed — флаг, отображающий, выполнена задача или нет. Вывести данный список на страницу, оформив соответствующим образом: в виде списка (ul или ol), выполненные задачи должны быть написаны зачеркнутым текстом. Если пользователь с введенным id не существует, вывести сообщение:
«Пользователь с указанным id не найден».
*/

const btn =  document.querySelector(".btn"),
      resultDiv = document.querySelector(".result");

btn.addEventListener("click", () => {
  resultDiv.innerHTML = "";
  const userId = document.querySelector(".userId").value;
  if(userId.length == 0) {
    resultDiv.innerHTML = "Пользователь не указан";
    return;
  };
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    if(data && data[0]) {
      let li = "";
      data.forEach((item) => {
        li += `<li style="text-decoration: ${item.completed ? "none" : "line-through"}">${item.title}</li>`;
      });
      resultDiv.innerHTML = `<ul>${li}</ul>`;
    }
    else {
      resultDiv.innerHTML = "Пользователь с указанным id не найден";
    };
  });
});
