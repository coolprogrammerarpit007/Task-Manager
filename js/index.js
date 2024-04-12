`use strict`;

// Task Manager App

const container = document.querySelector(".task-container");
const dashboard = document.querySelector(".dashboard");
const taskInput = document.getElementById("task");
const addTaskBtn = document.querySelector(".add");
const showTaskBtn = document.querySelector(".show-task");
const searchBtn = document.querySelector(".search-btn");
const inputSearch = document.querySelector(`.search-tasks`);

// Tasks to be added here

const taskList = document.querySelector(".task-list");

// Task List JSON Object

// *********************************

// State Variables.
const addedTasks = [];
let count = 0;
let newTask = 0;

// **********************************

// function to add the task
const addTask = () => {
  let value = count;
  count++;

  // Creating JSON Data
  addedTasks.push({
    id: value,
    "Task-Description": taskInput.value,
  });

  //  Emptying the Input Value.
  taskInput.value = "";
  // console.log(addedTasks);
};

// Adding event listener to the add task button.

addTaskBtn.addEventListener("click", addTask);

// *************************************

// Working with the dashboard to show the tasks

// function to be called to show task
const showTask = () => {
  taskList.classList.remove("hide");
  const taskShow = Number(prompt("Enter your task id: "));

  // check if the id valid or not
  let checkId = addedTasks[taskShow]?.id === taskShow;

  // here ?. is nullish coercion operator
  if (checkId) {
    const div = document.createElement("div");
    const taskTitle = document.createElement("li");
    taskTitle.setAttribute("id", "newtask" + newTask);
    newTask++;
    taskTitle.textContent = addedTasks[taskShow]["Task-Description"];
    // Creating the delete task button
    const deleteTaskBtn = document.createElement("button");
    deleteTaskBtn.innerText = "Delete Task";
    deleteTaskBtn.setAttribute("id", "delete-btn" + taskTitle);
    deleteTaskBtn.setAttribute("class", "delete-task");
    div.append(taskTitle, deleteTaskBtn);

    taskList.append(div);

    // **********************************
    const deleteTask = function () {
      const bool = confirm("Are you sure you want to delete this task?");
      console.log(this);
      if (bool) {
        const parent = this.parentElement;
        parent.remove();
      } else {
        alert("Ok, You are safe with your tasks. ");
      }
    };

    const deleteBtns = document.querySelectorAll(".delete-task");
    for (let i = 0; i < deleteBtns.length; i++) {
      deleteBtns[i].addEventListener("click", deleteTask);
    }

    // *************************************
  } else {
    alert("You enter a invalid id...");
  }
};

// Add event listener to the show task button.
showTaskBtn.addEventListener("click", showTask);

// ****************************************

// **********************************

// Adding the search feature to the task manager App.

// when the search button is clicked
searchBtn.addEventListener("click", function (e) {
  if (addedTasks.length > 0) {
    // taking value from the search bar
    const input = inputSearch.value.toLowerCase();

    // Itterating over tasks array
    for (let i = 0; i < addedTasks.length; i++) {
      if (addedTasks[i]["Task-Description"].toLowerCase().indexOf(input) > -1) {
        taskList.classList.add("hide");
        const newTask = document.createElement("p");
        newTask.innerText = addedTasks[i]["Task-Description"];
        dashboard.appendChild(newTask);
        inputSearch.value = "";
      }
    }
  }
});
