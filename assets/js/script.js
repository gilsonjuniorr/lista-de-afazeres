const form = document.getElementById('add-task');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const input = document.querySelector('#input').value;
    const li = createTagLi(input);
    createTask(li);

    form.reset();
})

function createTagLi(text) {
    const li = document.createElement('li');
    li.innerHTML = text;

    return li;
}

function createTask(li) {
    const task = document.querySelector('#task');
    const checkbox = createInputCheckbox();
    const textnode = li.firstChild;
    task.appendChild(li);
    li.insertBefore(checkbox, textnode);
    const edit = createIconToEdit();
    li.appendChild(edit);
    const trash = createTrashIcon();
    li.appendChild(trash);

    salveTask();
}

function salveTask() {
    const ul = document.querySelector('#task');
    const task = ul.querySelectorAll('li');
    const toDolist = [];

    for (let li of task) {
        let taskText = li.innerText;
        toDolist.push(taskText);
    }

    const jsonTask = JSON.stringify(toDolist);
    localStorage.setItem('tasks', jsonTask);
}

function addSavedTasks() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
        const toDolist = JSON.parse(tasks);
        
        for (let task of toDolist) {    
            createTask(createTagLi(task));
        }
    }
}

addSavedTasks();

function markTaskCompleted(event) {
    const checkbox = event.target;
    const li = checkbox.parentNode;

    if (checkbox.checked) {
        li.classList.add('completed');
    } else {
        li.classList.remove('completed');
    }
}

function createInputCheckbox() {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    checkbox.addEventListener('click', markTaskCompleted)

    return checkbox;
}

function createTrashIcon() {
    const icon = document.createElement('i');
    icon.classList.add('fa-regular', 'fa-trash-can');

    icon.addEventListener('click', deleteTask);
    icon.title = 'Apagar.'

    return icon;
}

function deleteTask() {
    const li = this.parentNode;
    li.remove();
    salveTask();
}

function createIconToEdit() {
    const icon = document.createElement('i');
    icon.classList.add('fa-regular', 'fa-pen-to-square');

    icon.title = 'Editar.';

    icon.addEventListener('click', editTask);

    return icon;
}

function editTask() {
    alert('Essa função ainda não está disponível.')
}