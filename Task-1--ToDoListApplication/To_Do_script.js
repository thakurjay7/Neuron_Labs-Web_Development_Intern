const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", handleTodoClick);
filterOption.addEventListener("change", filterTodo);

function addTodo(event) {
    event.preventDefault();
    const todoText = todoInput.value.trim(); // Trim to remove leading/trailing spaces

    if (todoText !== "") {
        createTodoElement(todoText);
        saveLocalTodos(todoText);
        todoInput.value = ""; // Clear input field
    }
}

function createTodoElement(todoText) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoText;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    appendButtons(todoDiv);

    todoList.appendChild(todoDiv);
}

function appendButtons(todoDiv) {
    const completedButton = createButton("complete-btn", '<i class="fas fa-check-circle"></i>');
    const trashButton = createButton("trash-btn", '<i class="fas fa-trash"></i>');

    todoDiv.appendChild(completedButton);
    todoDiv.appendChild(trashButton);
}

function createButton(className, innerHTML) {
    const button = document.createElement("button");
    button.classList.add(className);
    button.innerHTML = innerHTML;
    return button;
}

function handleTodoClick(e) {
    const target = e.target;
    const todo = target.parentElement;

    if (target.classList.contains("trash-btn")) {
        todo.classList.add("slide");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", () => {
            todo.remove();
        });
    } else if (target.classList.contains("complete-btn")) {
        todo.classList.toggle("completed");
    }
}

function filterTodo() {
    const todos = Array.from(todoList.children);
    const selectedOption = filterOption.value;

    todos.forEach((todo) => {
        const completed = todo.classList.contains("completed");

        switch (selectedOption) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                todo.style.display = completed ? "flex" : "none";
                break;
            case "incomplete":
                todo.style.display = completed ? "none" : "flex";
                break;
        }
    });
}

function saveLocalTodos(todoText) {
    const todos = getLocalTodos();
    todos.push(todoText);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    return storedTodos.filter((todo) => todo.trim() !== ""); // Remove empty or whitespace todos
}

function removeLocalTodos(todo) {
    const todoText = todo.querySelector(".todo-item").innerText;
    const todos = getLocalTodos();
    const index = todos.indexOf(todoText);
    
    if (index !== -1) {
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
}
