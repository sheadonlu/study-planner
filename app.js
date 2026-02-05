// DOM Elements
const taskForm = document.getElementById("taskForm");
const titleInput = document.getElementById("titleInput");
const dateInput = document.getElementById("dateInput");
const priorityInput = document.getElementById("priorityInput");

const listEl = document.getElementById("list");
const emptyState = document.getElementById("emptyState");

// Task Array
let tasks = [];

// Helper method to update empty state visibility
function updateEmptyState() {
    if (tasks.length === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
    }
}

function renderTasks() {
  listEl.innerHTML = "";

  for (const task of tasks) {
    const card = document.createElement("div");
    card.className = "task";
    card.dataset.id = task.id;

    // left: checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "toggle";
    checkbox.checked = task.done;

    // middle: content
    const content = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = task.title;

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = "Due: " + task.dueDate + " • Priority: " + task.priority.toUpperCase();

    const badges = document.createElement("div");
    badges.className = "badges";

    const badge = document.createElement("span");
    badge.className = "badge";
    if (task.done) {
        badge.textContent = "Done";
    } else {
        badge.textContent = "Active";
    }

    badges.appendChild(badge);

    content.appendChild(title);
    content.appendChild(meta);
    content.appendChild(badges);

    // right: actions
    const actions = document.createElement("div");
    actions.className = "actions";

    const delBtn = document.createElement("button");
    delBtn.className = "btn delete";
    delBtn.type = "button";
    delBtn.textContent = "Delete";

    actions.appendChild(delBtn);

    // assemble card
    card.appendChild(checkbox);
    card.appendChild(content);
    card.appendChild(actions);

    listEl.appendChild(card);
  }

  updateEmptyState();
}

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const dueDate = dateInput.value;
    const priority = priorityInput.value;

    if (!title || !dueDate) {
        return;
    }

    const newTask = {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        title,
        dueDate,
        priority,
        done: false,
    };

    tasks.push(newTask);

    titleInput.value = "";
    dateInput.value = "";
    priorityInput.value = "med";

    renderTasks();
});