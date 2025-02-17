//1. 투두리스트 디자인 만들기
//2. Todo 객체 생성
//내용, 체크여부, id
//할일 목록 저장할 배열
let tasks = JSON.parse(localStorage.getItem("todos")) || [];
//필요한 요소 불러옴
const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const btnAdd = document.getElementById("btnAdd");
const taskList = document.querySelector(".tasklist");
const categoryInput = document.getElementById("category");

// 로컬 스토리지에 저장된 목록 불러오기
loadData();

//저장된 데이터를 가져오는 함수
function loadData() {
  if (!tasks) tasks = [];
  tasks.forEach((item) => {
    makeTag(item);
  });
}

//화면에 표시할 태그를 만드는 함수
function makeTag({ id, todo, date, category, completed }) {
  // li 생성
  const li = document.createElement("li");
  li.id = id;
  li.className = "listoftodo";

  const li2 = document.createElement("div");
  li2.className = "li2";
  //체크박스 생성
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.checked = completed;
  checkBox.class = "checkbox";
  //할일 내용 표시 span 생성
  const content = document.createElement("span");
  content.className = "content";

  //날짜 +카테고리
  const div2 = document.createElement("div");
  div2.className = "div2";

  const li3 = document.createElement("div");
  li3.className = "li3";

  const dateText = document.createElement("span");
  dateText.className = "datetext";

  const categoryText = document.createElement("span");
  categoryText.className = "categorytext";
  // 할일 수정버튼 생성
  const editBtn = document.createElement("button");
  editBtn.className = "editbtn";
  editBtn.textContent = "edit";
  // 할일  삭제버튼 생성
  const delBtn = document.createElement("button");
  delBtn.className = "delbtn";
  delBtn.textContent = "delete";

  content.innerHTML = ` ${todo} `;
  dateText.innerHTML = `${date ? `${date}` : ""}`;
  categoryText.innerHTML = `카테고리 : ${category}`;
  //체크박스에 체크 시 선 추가
  checkBox.addEventListener("change", () => {
    //tasks 배열 안의 객체 id 와 li의 id가 같은 객체를 checkCompleted에 할당
    const checkCompleted = tasks.find((item) => item.id === id);
    //해당 객체에서 compledted 값(true / false) 확인해서 업데이트
    checkCompleted.completed = checkBox.checked;
    saveTasks(); //로컬 스토리지 저장
    content.style.textDecoration = checkBox.checked ? "line-through" : "none";
  });

  //수정 버튼 클릭 시 할일 / 마감기한 수정
  editBtn.onclick = () => {
    openEditDialog(id, content, dateText, categoryText);
  };

  delBtn.onclick = () => {
    deleteTask(id, li);
  };

  //요소를 li에 추가
  li2.appendChild(checkBox);
  li2.appendChild(content);

  div2.appendChild(categoryText);
  div2.appendChild(dateText);

  li3.appendChild(editBtn);
  li3.appendChild(delBtn);

  li.appendChild(li2);
  li.appendChild(div2);
  li.appendChild(li3);

  //ul인 taskList에 li추가
  taskList.appendChild(li);
}

//추가 버튼을 클릭했을 때
btnAdd.addEventListener("click", () => {
  //유효하지 않다면 아래 코드는 실행하지 않음
  if (!taskInput.value) return;
  const newTask = {
    id: Date.now(),
    todo: taskInput.value,
    date: dateInput.value,
    category: categoryInput.value,
    completed: false, // false인 값이 체크되지 않은 값으로 설정
  };

  tasks.push(newTask);
  saveTasks();
  makeTag(newTask);

  //입력값을 초기화
  taskInput.value = "";
  dateInput.value = "";
});

function openEditDialog(id, content, dateText, categoryText) {
  const dialog = document.querySelector("dialog");
  const editText = document.getElementById("edit-text");
  const editDate = document.getElementById("edit-date");
  const confirmBtn = document.getElementById("confirmBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  const task = tasks.find((item) => item.id === id);
  editText.value = task.todo;
  editDate.value = task.date;

  dialog.show();
  confirmBtn.onclick = () => {
    task.todo = editText.value || task.todo;
    task.date = editDate.value || task.date;
    saveTasks();
    content.innerHTML = ` ${task.todo} `;
    dateText.innerHTML = `${task.date ? `마감기한 : ${task.date}` : ""}`;
    categoryText.innerHTML = `카테고리 : ${task.category}`;

    dialog.close();
  };
  editText.value = "";
  editDate.value = "";

  cancelBtn.onclick = () => {
    dialog.close();
  };
}

function deleteTask(id, li) {
  tasks = tasks.filter((item) => item.id !== id);
  saveTasks();
  taskList.removeChild(li);
}

function saveTasks() {
  localStorage.setItem("todos", JSON.stringify(tasks));
}
