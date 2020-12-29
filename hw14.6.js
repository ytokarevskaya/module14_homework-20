/*
Создать Promise, в котором c задержкой в 3 секунды сгенерировать случайное целое число от 1 до 100. Для создания задержки использовать setTimeout. Если сгенерированное число — четное, Promise выполнится успешно (resolve), если нечетное — выполнится с ошибкой (reject). После разрешения Promise обработать результат его выполнения и вывести сообщение в консоль:
«Завершено успешно. Сгенерированное число — number», если Promise завершился успешно. Вместо number подставить сгенерированное число
«Завершено с ошибкой. Сгенерированное число — number», если Promise завершился с ошибкой. Вместо number подставить сгенерированное число 
*/

const checkNumberPromise = new Promise((resolve, reject) => {

  setTimeout(() => {
    const min = 0, max = 100;
    let num = Math.floor(Math.random() * (max - min + 1) + min);
    if(num % 2 === 0) {
      resolve(num);
    }
    else {
      reject(num);
    }
  }, 3000);
});

checkNumberPromise
  .then((result) => {
    console.log(`Завершено успешно. Сгенерированное число — ${result}`);
  })
  .catch((result) => {
    console.log(`Завершено с ошибкой. Сгенерированное число — ${result}`);
  });
