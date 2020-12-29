/*
Написать скрипт, который при открытии страницы будет делать следующее:
если пользователь зашел в первый раз, вывести окно prompt с сообщением: «Добро пожаловать! Назовите, пожалуйста, ваше имя».
После того, как пользователь введет имя, записать имя, дату и время визита в localStorage.
Если пользователь открывает страницу не впервые (это можно узнать по наличию соответствующих записей в localStorage), вывести в alert сообщение вида: «Добрый день, *имя пользователя*! Давно не виделись. В последний раз вы были у нас *дата последнего посещения*» и перезаписать дату последнего посещения.
Дату можно вывести в любом удобочитаемом формате (не Timestamp, должен четко читаться день, месяц, год и время — часы и минуты).
*/

convertDate = (strDate) => {
  date = new Date(strDate);
  let dd = String(date.getDate()).padStart(2, "0"),
      mm = String(date.getMonth() + 1).padStart(2, "0"),
      yyyy = date.getFullYear(),
      h = String(date.getHours()).padStart(2, "0"),
      m = String(date.getMinutes()).padStart(2, "0");
  return `${dd}.${mm}.${yyyy} ${h}:${m}`;
}

setCookie = (userName) => {
  let today = new Date();
  let userData = {
    "userName": userName,
    "lastVisited": today
  };
  localStorage.setItem("userData", JSON.stringify(userData));
}

document.addEventListener("DOMContentLoaded", () => {

  let userData = localStorage.getItem("userData") || "";

  if(userData.length == 0) {
    let userName = prompt("Добро пожаловать! Назовите, пожалуйста, ваше имя");
    setCookie(userName);
  }
  else {
    userData = JSON.parse(userData);
    alert(`Добрый день, ${userData.userName}! Давно не виделись. В последний раз вы были у нас ${convertDate(userData.lastVisited)}`);
    setCookie(userData.userName);
  };

});
