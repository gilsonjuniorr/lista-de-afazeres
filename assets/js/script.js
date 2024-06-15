document.addEventListener("DOMContentLoaded", function(){

    const form = document.getElementById('add-task');
    const taskList = document.getElementById('task');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const input = document.querySelector('#input').value;
        const li = createTagLi(input);
        createTask(li);

        form.reset();
        saveTasks();
    });

    function createTagLi(text) {
        const li = document.createElement('li');
        li.innerHTML = text;
        return li;
    }

    function createTask(li) {
        const checkbox = createInputCheckbox();
        const editIcon = createIconToEdit();
        const trashIcon = createTrashIcon();

        li.insertBefore(checkbox, li.firstChild);
        li.appendChild(editIcon);
        li.appendChild(trashIcon);
        taskList.appendChild(li);
    }

    function createInputCheckbox() {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('click', markTaskCompleted);
        return checkbox;
    }

    function markTaskCompleted(event) {
        const checkbox = event.target;
        const li = checkbox.parentNode;

        if (checkbox.checked) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }
        saveTasks();
    }

    function createTrashIcon() {
        const icon = document.createElement('i');
        icon.classList.add('fa-regular', 'fa-trash-can');
        icon.title = 'Apagar.';
        icon.addEventListener('click', deleteTask);
        return icon;
    }

    function deleteTask() {
        const li = this.parentNode;
        li.remove();
        saveTasks();
    }

    function createIconToEdit() {
        const icon = document.createElement('i');
        icon.classList.add('fa-regular', 'fa-pen-to-square');
        icon.title = 'Editar.';
        icon.addEventListener('click', editTask);
        return icon;
    }

    function editTask() {
        const maxLength = 20;
        let newTask = prompt(`Por favor, digite a nova tarefa abaixo (limite de ${maxLength} caracteres):`);

        if (!newTask) return;

        if (newTask.length > maxLength) {
            alert(`Limite de ${maxLength} caracteres excedido. Apenas os primeiros ${maxLength} caracteres serão utilizados.`);
            newTask = newTask.slice(0, maxLength);
        }

        const li = this.parentNode;
        const text = li.childNodes[1];
        text.textContent = newTask;

        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        const taskItems = taskList.querySelectorAll('li');

        taskItems.forEach(function(task) {
            const taskText = task.innerText;
            const taskCompleted = task.querySelector('input[type="checkbox"]').checked;

            tasks.push({ text: taskText, completed: taskCompleted });
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));

        if (tasks) {
            tasks.forEach(function(task) {
                const li = createTagLi(task.text);
                const checkbox = createInputCheckbox();
                const editIcon = createIconToEdit();
                const trashIcon = createTrashIcon();

                li.insertBefore(checkbox, li.firstChild);
                li.appendChild(editIcon);
                li.appendChild(trashIcon);
                taskList.appendChild(li);

                if (task.completed) {
                    checkbox.checked = true;
                    li.classList.add('completed');
                }
            });
        }
    }

    loadTasks();
});
