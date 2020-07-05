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

    const addNewTask = (newTaskName) => {
        tasks.push({
            taskName: newTaskName,
            taskDone: false,
        });
        render();
        document.querySelector(".js-newTask").value = "";
    }

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
    }

    const render = () => {
        let htmlTasks = "";

        for (const task of tasks) {
            htmlTasks += `
            <li class="taskList__task
            ${task.taskDone ? " taskList__task--done" : ""}"
            >
            ${task.taskName}
            </li>
        `;
            document.querySelector(".js-taskList").innerHTML = htmlTasks;
        }
    };

    const init = () => {

        welcome();
        render();
        onFormSubmit();

    };

    init();

}