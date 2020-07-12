{

    let tasks = [];
    let hideDoneTasks = false;

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

    const ToggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const SetAllDoneTasks = () => {
        for (const task of tasks) {
            task.taskDone = true;
        };
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

    const bindToggleHideDoneTasksEvent = () => {
        const ToggleHideDoneTasksButton = document.querySelector(".js-ToggleVisibilityDoneTasks");
        ToggleHideDoneTasksButton.addEventListener("click", () => {
            ToggleHideDoneTasks();
        });
    };

    const bindToggleAllDoneEvent = () => {
        const ToggleDoneAllButton = document.querySelector(".js-setDoneTasks");
        ToggleDoneAllButton.addEventListener("click", () => {
            SetAllDoneTasks();
        });
    };

    const bindToggleButtonsEvents = () => {
        if (document.querySelector(".js-taskList").innerHTML === "") {
            return;
        };
        bindToggleHideDoneTasksEvent();
        bindToggleAllDoneEvent();
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
            ${task.taskDone ? " taskList__task--done" : ""}
            ${(hideDoneTasks && task.taskDone) ? " taskList__task--hidden" : ""}"
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

            let alldone = true;
            for (const task of tasks) {
                if (!task.taskDone)
                    alldone = false;
            };

            htmlButtons += `
            <span> <button class=\"js-ToggleVisibilityDoneTasks taskListButton \">
            ${hideDoneTasks ? "Show " : "Hide "}done tasks</button></span>
            <span> <button 
            ${alldone ? "disabled" : ""}
            class=\"js-setDoneTasks taskListButton
            ${alldone ? "taskListButton--disabled" : ""}
             \">All tasks done!</button></span>
            `;
        };
        document.querySelector(".js-taskListButtonRow").innerHTML = htmlButtons;
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindDeleteButtonEvents();
        bindToggleDoneButtonEvents();
        bindToggleButtonsEvents();
    }

    const init = () => {

        welcome();
        render();
        onFormSubmit();

    };

    init();

}