import { useState } from 'react'
import './App.css'


function App() {
  let taskList = [];

  const createTask = (event) => {
    event.preventDefault();
    const userInput = document.getElementById("task-input").value.trim();
    if (userInput !== '') {
      taskList.push({ text: userInput, completed: false });
      renderTasks();
      document.querySelector("#task-input").value = '';
    }
  }

  const toggleComplete = (index) => {
    taskList[index].completed = !taskList[index].completed;
    renderTasks();
  }

  const deleteTask = (index) => {
    taskList.splice(index, 1);
    renderTasks();
  }

  const renderTasks = () => {
    const taskListContainer = document.getElementById("task-list");
    taskListContainer.innerHTML = '';

    taskList.forEach((task, index) => {
      const li = document.createElement('li');

      // Create a checkbox for marking as completed
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => toggleComplete(index));

      // Create the task text and apply strikethrough if completed
      const taskText = document.createElement('span');
      taskText.textContent = task.text;
      if (task.completed) {
        taskText.style.textDecoration = 'line-through';
      }

      // Create a delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteTask(index));

      li.appendChild(checkbox);
      li.appendChild(taskText);
      li.appendChild(deleteButton);
      taskListContainer.appendChild(li);
    });
  }

  return (
    <>
      <h1>To Do List</h1>
      <form onSubmit={(event) => createTask(event)}>
        <input type="text" placeholder='Enter Task Here' id="task-input" />
        <button type="submit">Click To Add</button>
      </form>
      <ul id="task-list"></ul>
    </>
  );
}

export default App;
