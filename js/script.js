{

    let tasks = [];

    const welcome = () => {
        console.log("Hello there!")
    };

    const onFormSubmit = () => {
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", formSubmitted);
    };

    const formSubmitted = (event) => {
        event.preventDefault(event);
        const newTaskName = document.querySelector(".js-newTask").value.trim();

        if (newTaskName === "") {
            clearInput();
            return;
        }
        addNewTask(newTaskName);
        clearInput();
    };

    const addNewTask = (newTaskName) => {
        tasks = [
            ...tasks,
            { taskName: newTaskName },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleDoneTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], taskDone: !tasks[taskIndex].taskDone },
            ...tasks.slice(taskIndex + 1),
        ]
        render();
    };

    const bindDeleteButtonEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const bindToggleDoneButtonEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-taskDone");
        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleDoneTask(taskIndex);
            });
        });
    };

    const clearInput = () => {
        document.querySelector(".js-newTask").value = "";
        document.querySelector(".js-newTask").focus();
    };

    const renderTasks = () => {
        let htmlTasks = "";

        for (const task of tasks) {
            htmlTasks += `
            <li class="taskList__task
            ${task.taskDone ? " taskList__task--done" : ""}"
            >
            <button class="js-taskDone listButton listButton--done">
            ${task.taskDone ? "✔" : ""}
            </button>
            <span
            ${task.taskDone ? " class=\"taskList__taskName\"" : ""}">
            ${task.taskName}</span>
            
            <button class="js-remove listButton listButton--remove">🗑</button>
            </li>
        `};
        document.querySelector(".js-taskList").innerHTML = htmlTasks;
    };

    const renderButtons = () => {
        let htmlButtons = ``;
        if (document.querySelector(".js-taskList").innerHTML !== "") {
            htmlButtons += `
            <span> <button class=\"js-ToggleVisibilityDoneTasks taskListButton \">add/delete task</button></span>
            <span> <button class=\"js-setDoneTasks taskListButton \">all done!</button></span>
            `;
        }
        document.querySelector(".js-taskListButtonRow").innerHTML = htmlButtons;
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindDeleteButtonEvents();
        bindToggleDoneButtonEvents();
    }

    const init = () => {

        welcome();
        render();
        onFormSubmit();

    };

    init();

}