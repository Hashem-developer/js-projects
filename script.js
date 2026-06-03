const $ = document;
const todoInput = $.getElementById("todo_input");
const addBtn = $.getElementById("btn-primary");
const removeBtn = $.getElementById("btn-danger");
const todoListItems = $.querySelector(".todo_list");
const message = $.querySelector(".alert-message");
let todoListArray = [];

const addTodoItem = () => {
  let todoValue = todoInput.value;
  // console.log(todoValue);
  message.classList.remove("active");
  let obj = {
    id: todoListArray.length + 1,
    title: todoValue,
    isComplete: false,
  };
  todoInput.value = "";

  todoListArray.push(obj);
  setLocalStorage(todoListArray);
  todoGenerator(todoListArray);
};

const todoGenerator = (todoList) => {
  let li_element, p_element, div_element, btnFirst, btnSecond;
  todoListItems.innerHTML = "";

  todoList.forEach((todo) => {
    //todo => {id: todo.id, todo.title, todo.isComplete}
    li_element = $.createElement("li");
    p_element = $.createElement("p");
    div_element = $.createElement("div");
    btnFirst = $.createElement("button");
    btnSecond = $.createElement("button");

    // console.log(todoList[i]);
    li_element.classList.add("todo_item");

    p_element.classList.add("todo-value");
    p_element.innerHTML = todo.title;

    div_element.classList.add("btn_bx");

    btnFirst.classList.add("btn", "complete_btn");
    btnFirst.innerHTML = "Complete";
    btnFirst.setAttribute("onclick", `isCompleteTodo(${todo.id})`);
    btnSecond.classList.add("btn", "delete_btn");
    btnSecond.innerHTML = "Delete";
    btnSecond.setAttribute("onclick", `removeTodo(${todo.id})`);

    if (todo.isComplete) {
      p_element.classList.remove("todo_value");
      p_element.classList.add("incomplete_todo_value");
      btnFirst.innerHTML = "Incomplete";
    }

    div_element.append(btnFirst, btnSecond);
    li_element.append(p_element, div_element);
    todoListItems.appendChild(li_element);
  });
};
const isCompleteTodo = (todoId) => {
  // console.log(todoId);
  let localStorageValue = JSON.parse(localStorage.getItem("todoList"));
  todoListArray = localStorageValue;
  todoListArray.forEach((todo) => {
    if (todo.id === todoId) {
      todo.isComplete = !todo.isComplete;
    }
  });
  setLocalStorage(todoListArray);
  todoGenerator(todoListArray);
};
const removeTodo = (todoId) => {
  // console.log(todoId);
  let localStorageValue = JSON.parse(localStorage.getItem("todoList"));
  todoListArray = localStorageValue;

  let mainTodoIndex = todoListArray.findIndex((todo) => {
    return todo.id === todoId;
  });
  todoListArray.splice(mainTodoIndex, 1);
  setLocalStorage(todoListArray);
  todoGenerator(todoListArray);
};

const setLocalStorage = (todoList) => {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

const removeTodoList = () => {
  todoListArray = [];
  todoGenerator(todoListArray);
  todoListItems.innerHTML = "";
  localStorage.removeItem("todoList");
};
window.onload = function () {
  let localStorageValue = JSON.parse(localStorage.getItem("todoList"));
  localStorageValue
    ? (todoListArray = localStorageValue)
    : (todoListArray = []);
  todoGenerator(todoListArray);
};
addBtn.addEventListener("click", addTodoItem);
removeBtn.addEventListener("click", removeTodoList);
todoInput.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    addTodoItem();
  }
});
