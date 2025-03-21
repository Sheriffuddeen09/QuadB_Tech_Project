import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskInput from "./TaskInput";
import { deleteTask, fetchTasks } from "../../api/apitasks/TaskSlice";
import EditSide from "../layout/Editside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import EditSider from "../layout/Editsider";

const TaskList = ({
  theme,
  sidebaradd,
  sidebaradder,
  taskToEdit,
  setTaskToEdit,
  handleSideAdd,
  handleSideAdder,
}) => {
  // Extracts the tasks list and status from the Redux state
const { list, status } = useSelector((state) => state.tasks);
const dispatch = useDispatch();

// State for managing task priority filter
const [taskPriority, setTaskPriority] = useState("");

// State for tracking completed tasks (checkbox functionality)
const [completedTasks, setCompletedTasks] = useState([]);

// This is a toggle to manage the priority state of tasks as a key-value pair (taskId: priority)
const [priorities, setPriorities] = useState({});

// Fetches tasks from the backend when the component mounts or if the status changes to "idle"
useEffect(() => {
  if (status === "idle") {
    dispatch(fetchTasks());
  }
}, [dispatch, status]);

// Restores completed tasks and priorities from localStorage when the task list changes
useEffect(() => {
  const savedCompletedTasks =
    JSON.parse(localStorage.getItem("completedTasks")) || []; // Get saved completed tasks
  const savedPriorities =
    JSON.parse(localStorage.getItem("taskPriorities")) || {}; // Get saved priorities

  setCompletedTasks(savedCompletedTasks); // Update completed tasks state
  setPriorities(savedPriorities); // Update priorities state
}, [list]);

// Persists completed tasks and priorities to localStorage whenever they change
useEffect(() => {
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  localStorage.setItem("taskPriorities", JSON.stringify(priorities));
}, [completedTasks, priorities]);

// Handles the toggle functionality for task completion (checkbox state)
const handleCheckboxClick = (task) => {
  if (completedTasks.some((t) => t.id === task.id)) {
    // If the task is already completed, remove it from the completed list
    setCompletedTasks(completedTasks.filter((t) => t.id !== task.id));
  } else {
    // Otherwise, add the task to the completed list
    setCompletedTasks([...completedTasks, task]);
  }
};

// This is a toggle to change task priority cyclically between High, Medium, and Low
const handlePriorityChange = (taskId) => {
  setPriorities((prev) => {
    const newPriority =
      prev[taskId] === "High"
        ? "Medium"
        : prev[taskId] === "Medium"
        ? "Low"
        : "High"; // Cycle through priorities
    return { ...prev, [taskId]: newPriority }; // Update the priority for the given taskId
  });
};

// Handles the deletion of a task from the list
const handleDeleteTask = (id) => {
  dispatch(deleteTask(id)); // Dispatch action to delete the task in the Redux store
  setCompletedTasks(completedTasks.filter((task) => task.id !== id)); // Remove the task from completed tasks
};

// Renders the priority of a task with appropriate styling based on its value
const renderPriority = (priority) => {
  switch (priority) {
    case "High":
      return <span className="text-red-500 font-semibold">High</span>; // High priority in red
    case "Medium":
      return <span className="text-yellow-500 font-semibold">Medium</span>; // Medium priority in yellow
    case "Low":
      return <span className="text-green-500 font-semibold">Low</span>; // Low priority in green
    default:
      return <span className="text-gray-500">No Priority</span>; // Default for no priority
  }
};


  return (
    <div className="mt-0">
      <div className="inline-flex items-center">
        <label className="text-sm font-medium">To Do</label>
        <select
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value)}
            className="p-2 rounded mb-4 bg-transparent -translate-x-20 translate-y-2"
          >
          <option value=""></option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div className={`list p-5 text-sm ${theme} ${sidebaradd ? "long" : ""} max-w-full`}>
        <p>Add A Task</p>
        <div className="flex flex- justify-between items-center text-sm mt-10 sm:gap-6 w-full max-w-full overflow-hidden">
          <div className={`flex items-center space-x-4 w-full sm:w-auto sid ${theme}`}>
            {/* Icons */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-4 cursor-pointer lg:block hidden" onClick={handleSideAdd}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-4 cursor-pointer block sm:hidden" onClick={handleSideAdder}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
</svg>
            {/* Additional Icons */}
            <EditSider sidebaradder={sidebaradder} handleSideAdder={handleSideAdder} theme={theme} />
            <EditSide sidebaradd={sidebaradd} handleSideAdd={handleSideAdd} theme={theme} />
          </div>
          <div className={` add rounded text-sm sm:text-lg ${theme}`}>
            <TaskInput
              taskToEdit={taskToEdit}
              setTaskToEdit={(task) => {
                console.log("setTaskToEdit called:", task);
                setTaskToEdit(task);
              }}
            />
        </div>
      </div>
    </div>
      {/* Incomplete Tasks */}
      <div className="mt-4">
        {list
          .filter((task) =>
            taskPriority ? priorities[task.id] === taskPriority : true
          )
          .filter((task) => !completedTasks.some((t) => t.id === task.id))
          .map((task) => (
            <div
              key={task.id}
              className={`flex justify-between items-center p-4 text-sm rounded mb-2 ${theme} ${sidebaradd ? "long" : ""}`}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={completedTasks.some((t) => t.id === task.id)}
                  onChange={() => handleCheckboxClick(task)}
                  className="w-5 h-5 cursor-pointer"
                />
                <span className="ml-2">{task.title}</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faStar}
                  className={`cursor-pointer ${
                    priorities[task.id] === "High"
                      ? "text-yellow-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => handlePriorityChange(task.id)}
                />
                <span className="ml-2">{renderPriority(priorities[task.id])}</span>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="ml-4 text-red-500"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Completed Tasks */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Completed Tasks</h2>
        {completedTasks.map((task) => (
          <div
            key={task.id}
            className={`flex justify-between items-center p-4 rounded mb-2 ${theme} ${sidebaradd ? "long" : ""}`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked
                onChange={() => handleCheckboxClick(task)}
                className="w-5 h-5 cursor-pointer"
              />
              <span className="ml-2 line-through">{task.title}</span>
            </div>
            <div className="flex items-center">
              <span className="ml-2">{renderPriority(priorities[task.id])}</span>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="ml-4 text-red-500"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
