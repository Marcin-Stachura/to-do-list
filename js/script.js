{

    const tasks = [

        {
            taskName: "test task done",
            taskDone: true,
        },
        {
            taskName: "test task not done",
            taskDone: false,
        },

    ];

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

        if (newTaskName === "")
            return;

        addNewTask(newTaskName);
    };

    const addNewTask = (newTaskName) => {
        tasks.push({
            taskName: newTaskName,
            taskDone: false,
        });
        render();
        clearInput();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleDoneTask = (taskIndex) => {
        tasks[taskIndex].taskDone = !tasks[taskIndex].taskDone;
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

    const render = () => {
        let htmlTasks = "";

        for (const task of tasks) {
            htmlTasks += `
            <li class="taskList__task
            ${task.taskDone ? " taskList__task--done" : ""}"
            >
            <button class="js-taskDone">done?</button>
            ${task.taskName}
            <button class="js-remove">delete</button>
            </li>
        `};
        document.querySelector(".js-taskList").innerHTML = htmlTasks;

        bindDeleteButtonEvents();
        bindToggleDoneButtonEvents();
    };

    const init = () => {

        welcome();
        render();
        onFormSubmit();

    };

    init();

}