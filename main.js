//1. 투두리스트 디자인 만들기
//2. Todo 객체 생성
//내용, 체크여부, id
let tasks = [];
const taskInput = document.getElementById("task-input");
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
  content.innerHTML = taskInput.value;

  delBtn.textContent = "삭제";

  checkBox.addEventListener("click", () => {
    li.classList.toggle("complete");
  });

  delBtn.addEventListener("click", (event) => {
    console.log(event);
    event.target.parentNode.remove();
  });

  li.appendChild(checkBox);
  li.appendChild(content);
  li.appendChild(delBtn);

  taskList.appendChild(li);

  tasks.push(taskInput.value);
  taskInput.value = "";
});
