// Function to generate the schedule based on wake-up time and first task time
window.generateSchedule = function () {
    const wakeupTime = document.getElementById("wakeupTime").value;
    const firstTaskTime = document.getElementById("firstTaskTime").value;

    // Convert time strings to Date objects for easier manipulation
    const wakeupDateTime = new Date(`2000-01-01T${wakeupTime}`);
    const firstTaskDateTime = new Date(`2000-01-01T${firstTaskTime}`);

    const timeDifference = Math.abs(firstTaskDateTime - wakeupDateTime) / 60000; // in minutes

    const tasksContainer = document.getElementById("tasks");
    tasksContainer.innerHTML = ''; // Clear existing tasks

    let remainingTime = timeDifference;
    let currentTaskStart = wakeupDateTime;

    const tasks = [
        { name: "Read Bible", defaultTime: 30 },
        { name: "Memory Verse", defaultTime: 5 },
        { name: "Journal", defaultTime: 15 },
        { name: "Cardio", defaultTime: 25 },
        { name: "Core", defaultTime: 15 },
        { name: "Stretch", defaultTime: 5 },
    ];

    let notificationMessage = ''; // Message to notify the user

    tasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");

        const taskDuration = Math.min(task.defaultTime, remainingTime);

        if (taskDuration > 0) {
            taskElement.innerHTML = `
                <span>${task.name}</span>
                <span>Start: ${formatTime(currentTaskStart)}</span>
                <span>End: ${formatTime(new Date(currentTaskStart.getTime() + taskDuration * 60000))}</span>
            `;

            tasksContainer.appendChild(taskElement);
        } else {
            notificationMessage = `You don't have enough time for ${task.name}. Good luck with the rest of your day!`;
            return; // Exit the loop if there's not enough time for the task
        }

        remainingTime -= taskDuration;
        currentTaskStart = new Date(currentTaskStart.getTime() + taskDuration * 60000);
    });

    // Display the notification message on the page
    const notificationElement = document.createElement("div");
    notificationElement.innerHTML = `<p>${notificationMessage}</p>`;
    tasksContainer.appendChild(notificationElement);
};

// Function to format time as HH:MM
function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
