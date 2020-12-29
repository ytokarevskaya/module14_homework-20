/*
Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.
JS-объект:
{
  list: [
    { name: 'Ivan Ivanov', age: 35, prof: 'teacher', lang: 'en' },
    { name: 'Петр Петров', age: 58, prof: 'driver', lang: 'ru' },
  ]
}
*/

const xmlStr =
  `<list>
    <student>
      <name lang="en">
        <first>Ivan</first>
        <second>Ivanov</second>
      </name>
      <age>35</age>
      <prof>teacher</prof>
    </student>
    <student>
      <name lang="ru">
        <first>Петр</first>
        <second>Петров</second>
      </name>
      <age>58</age>
      <prof>driver</prof>
    </student>
  </list>`;

const parser = new DOMParser();
const xmlDOM = parser.parseFromString(xmlStr, "text/html");
const listNode = xmlDOM.querySelector("list");
const children = listNode.querySelectorAll("student");

let studentArray = [];

children.forEach(studentNode => {

  let student = {};

  student.age = Number(studentNode.querySelector("age").textContent);
  student.prof = studentNode.querySelector("prof").textContent;

  let studentNameNode = studentNode.querySelector("name");
  student.name = studentNameNode.querySelector("first").textContent + " " + studentNameNode.querySelector("second").textContent;
  student.lang = studentNameNode.getAttribute("lang");

  studentArray.push(student);

});

const result = {};
result.list = studentArray;

console.log(result);
