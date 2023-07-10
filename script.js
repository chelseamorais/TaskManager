var currentDate = new Date();
var currentYear = currentDate.getFullYear();
var currentMonth = currentDate.getMonth();
var currentDay = currentDate.getDate();

var monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

var tasks = {}; // Object to store tasks for each date

function renderCalendar() {
    // Calendar rendering logic remains the same
    // ...
    var firstDay = new Date(currentYear, currentMonth, 1).getDay();
    var totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    var calendarBody = document.getElementById('calendar-body');
    calendarBody.innerHTML = '';

    document.getElementById('current-month').textContent = monthNames[currentMonth] + ' ' + currentYear;

    var date = 1;
    for (var i = 0; i < 6; i++) {
        var row = document.createElement('tr');

        for (var j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                var cell = document.createElement('td');
                row.appendChild(cell);
            } else if (date > totalDays) {
                break;
            } else {
                var cell = document.createElement('td');
                cell.textContent = date;
                row.appendChild(cell);

                if (currentYear === currentDate.getFullYear() && currentMonth === currentDate.getMonth() && date === currentDay) {
                    cell.classList.add('current-day');
                }

                var cellDate = new Date(currentYear, currentMonth, date);

                cell.addEventListener('click', function() {
                    // Handle cell click event
                    var selectedDate = new Date(currentYear, currentMonth, this.textContent);
                    var taskList = tasks[selectedDate.toDateString()] || [];
                    var newTask = prompt('Enter a new task for ' + selectedDate.toDateString());
                    if (newTask) {
                        taskList.push(newTask);
                        tasks[selectedDate.toDateString()] = taskList;
                        renderTaskList();
                    }
                });

                if (tasks[cellDate.toDateString()] && tasks[cellDate.toDateString()].length > 0) {
                    cell.classList.add('has-tasks');
                }

                date++;
            }
        }

        calendarBody.appendChild(row);
    }

}

function renderTaskList() {
    var taskListContainer = document.getElementById('task-list-container');
    taskListContainer.innerHTML = '';

    var heading = document.createElement('h2');
    heading.textContent = 'Task List';
    taskListContainer.appendChild(heading);

    for (var date in tasks) {
        if (tasks.hasOwnProperty(date)) {
            var taskList = tasks[date];

            if (taskList.length > 0) {
                var dateHeading = document.createElement('h3');
                dateHeading.textContent = date;
                taskListContainer.appendChild(dateHeading);

                var list = document.createElement('ul');
                taskList.forEach(function(task) {
                    var listItem = document.createElement('li');
                    listItem.classList.add('task-list-item');

                    var checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.classList.add('checklist-item');
                    listItem.appendChild(checkbox);

                    var taskLabel = document.createElement('label');
                    taskLabel.textContent = task;
                    listItem.appendChild(taskLabel);

                    list.appendChild(listItem);
                });

                taskListContainer.appendChild(list);
            }
        }
    }
}

document.getElementById('prev-btn').addEventListener('click', function() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
});

document.getElementById('next-btn').addEventListener('click', function() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
});

renderCalendar();
renderTaskList();
