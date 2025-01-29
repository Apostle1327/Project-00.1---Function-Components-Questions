// 3. Create a todo list where the user can add and remove tasks.

class todoList {
  constructor() {
    this.tasks = [];
    this.todoListElement = document.querySelector("#todoList");
    this.todoListInput = document.querySelector("#todoInput");
    this.todoSubmit = document.querySelector("#todoSubmit");
    this.taskErrorElement = document.querySelector("#taskError");

    this.todoSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      this.addTask();
    });
    this.todoListElement.addEventListener("click", (e) => {
      this.removeTask(e);
    });
  }

  addTask() {
    const taskText = this.todoListInput.value.trim();

    if (taskText === "") {
      this.taskErrorElement.textContent = "Task cannot be empty!";
      this.taskErrorElement.style.color = "red";
      return;
    }

    this.taskErrorElement.textContent = "";

    const taskId = Date.now();
    this.tasks.push({ id: taskId, text: taskText });
    this.render();
    this.todoListInput.value = ""; // Clear input field
  }

  removeTask(e) {
    if (!e.target.classList.contains("removeButton")) return;

    const taskId = Number(e.target.dataset.id);
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.render();
  }

  render() {
    this.todoListElement.innerHTML = "";
    this.tasks.forEach((task) => {
      const listItem = document.createElement("li");
      listItem.className =
        "todoItem list-group-item d-flex justify-content-between align-items-center my-2 shadow-sm p-3 rounded";
      listItem.style.backgroundColor = "#343a40";
      listItem.style.color = "white";
      listItem.style.width = "60%";
      listItem.style.margin = "10px auto";
      listItem.innerHTML = `
        ${task.text}
        <button type="button" class="btn btn-danger btn-sm removeButton" data-id="${task.id}">Remove</button>
      `;
      this.todoListElement.appendChild(listItem);
    });
  }
}

const newList = new todoList();
