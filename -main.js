//1. 투두리스트 디자인 만들기
//2. Todo 객체 생성
//내용, 체크여부, id
let tasks = [{ todo: "", id: "", end: { date: "" } }];
const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const btnAdd = document.getElementById("btnAdd");
const taskList = document.querySelector(".tasklist");

btnAdd.addEventListener("click", () => {
  let text = taskInput.value;
  if (!text) return;
  const li = document.createElement("li");
  const checkBox = document.createElement("input");
  const delBtn = document.createElement("button");
  const content = document.createElement("span");

  checkBox.type = "checkbox";

  let date2 = dateInput.value;
  if (date2) {
    content.innerHTML = ` ${taskInput.value}  ||  마감기한 : ${dateInput.value}`;
  } else {
    content.innerHTML = ` ${taskInput.value} \n `;
  }

  delBtn.textContent = "x";

  checkBox.addEventListener("change", () => {
    if (checkBox.checked) {
      span.style.textDecoration = "line-through";
    } else {
      span.style.textDecoration = "none";
    }
  });

  delBtn.addEventListener("click", (event) => {
    taskList.removeChild(li);
  });

  li.appendChild(checkBox);
  li.appendChild(content);
  li.appendChild(delBtn);

  taskList.appendChild(li);

  tasks.push({ todo: taskInput.value, date: dateInput.value });
  taskInput.value = "";
  dateInput.value = "";
});
console.log(tasks);
