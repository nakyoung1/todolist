//1. 투두리스트 디자인 만들기
//2. Todo 객체 생성
//내용, 체크여부, id
let tasks = [{ id: "", todo: "", date: "", category: "" }];
const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const btnAdd = document.getElementById("btnAdd");
const taskList = document.querySelector(".tasklist");
const category = document.getElementById("category");

//추가 버튼을 클릭했을 때
btnAdd.addEventListener("click", () => {
  //할일 입력칸이 유효한지 확인
  let text = taskInput.value;
  //유효하지 않다면 아래 코드는 실행하지 않음
  if (!text) return;

  const li = document.createElement("li");
  const checkBox = document.createElement("input");
  const delBtn = document.createElement("button");
  const content = document.createElement("span");
  const editBtn = document.createElement("button");
  const newId = Date.now();
  li.setAttribute("id", newId);
  checkBox.type = "checkbox";

  //날짜값이 있다면 마감기한을 출력
  if (dateInput.value) {
    content.innerHTML = ` ${taskInput.value}  ||  마감기한 : ${dateInput.value} || 카테고리 ${category.value}`;
  } else {
    content.innerHTML = ` ${taskInput.value} || 카테고리 ${category.value} `;
  }
  editBtn.textContent = "edit";
  delBtn.textContent = "delete";

  // checkBox.addEventListener("click", () => {
  //   li.classList.toggle("complete");
  // });

  //체크박스에 체크 시 선 추가
  checkBox.addEventListener("change", () => {
    if (checkBox.checked) {
      content.style.textDecoration = "line-through";
    } else {
      content.style.textDecoration = "none";
    }
  });

  //수정 버튼 클릭 시 할일 / 마감기한 수정
  const editText = document.getElementById("edit-text");
  const editDate = document.getElementById("edit-date");
  const dialog = document.querySelector("dialog");
  const confirmBtn = document.getElementById("confirmBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  let editTask;

  editBtn.onclick = (event) => {
    editTask = content;
    console.log(event);
    const todoID = event.target.parentNode.getAttribute("id");
    dialog.show();

    confirmBtn.onclick = () => {
      if (editDate.value) {
        editTask.innerHTML = ` ${editText.value}  ||  마감기한 : ${editDate.value}`;
      } else {
        editTask.innerHTML = ` ${editText.value}`;
      }
      const updateTodo = tasks.find((list) => Number(list.id) === Number(todoID));
      // let updateTodo;
      // console.log(todoID);
      // tasks.forEach((item) => {
      //   if (item.id === Number(todoID)) updateTodo = item;
      // });
      // console.log(updateTodo);
      updateTodo.todo = editText.value;
      updateTodo.date = editDate.value;
      dialog.close();
    };
    cancelBtn.onclick = () => {
      dialog.close();
    };
    editText.value = "";
    editDate.value = "";
    console.log(tasks);
  };
  console.log(tasks);
  // 삭제 버튼 클릭 시 리스트에서 삭제
  delBtn.addEventListener("click", (event) => {
    taskList.removeChild(li);
    const todoID = event.target.parentNode.getAttribute("id");
    const delTodo = tasks.find((list) => Number(list.id) === Number(todoID));
    console.log(todoID);
    const newTasks = tasks.filter((item) => item.id !== delTodo.id);
    tasks = newTasks;
    console.log(newTasks);
    console.log(tasks);
  });

  // input 값을 tasks 배열에 추가
  tasks.push({ id: newId, todo: taskInput.value, date: dateInput.value });
  //입력값을 초기화
  taskInput.value = "";
  dateInput.value = "";

  //요소를 li에 추가
  li.appendChild(checkBox);
  li.appendChild(content);
  li.appendChild(editBtn);
  li.appendChild(delBtn);

  //ul인 taskList에 li추가
  taskList.appendChild(li);
});
