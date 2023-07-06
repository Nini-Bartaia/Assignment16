

import React, { useState, useCallback, memo } from 'react';

function TodoItem({ task, onFinish, onDelete, onTransfer }) {
  const [isInProgress, setIsInProgress] = useState(false);

  const handleToggleProgress = useCallback(() => {
    setIsInProgress((prevInProgress) => !prevInProgress);
  }, []);

  const taskStyle = {
    border: isInProgress ? '2px solid blue' : '2px solid red',
    padding: '10px',
    margin: '5px',
  };

  return (
    <li style={taskStyle}>
      {task}
      <button onClick={onFinish}>Finish</button>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onTransfer}>Transfer to Tasks</button>
      <button onClick={handleToggleProgress}>
        {isInProgress ? 'Remove from In Progress' : 'Mark as In Progress'}
      </button>
    </li>
  );
}

const MemoizedTodoItem = memo(TodoItem);

function TodoList() {
  const [taskInput, setTaskInput] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [inProgressList, setInProgressList] = useState([]);

  const handleInputChange = useCallback((e) => {
    setTaskInput(e.target.value);
  }, []);

  const handleAddTask = useCallback(() => {
    if (taskInput.trim() !== '') {
      setTodoList((prevTodoList) => [...prevTodoList, taskInput]);
      setTaskInput('');
    }
  }, [taskInput]);

  const handleFinishTask = useCallback((task) => {
    setTodoList((prevTodoList) => prevTodoList.filter((item) => item !== task));
    setCompletedList((prevCompletedList) => [...prevCompletedList, task]);
  }, []);

  const handleDeleteTask = useCallback((task, isCompleted) => {
    if (isCompleted) {
      setCompletedList((prevCompletedList) => prevCompletedList.filter((item) => item !== task));
    } else {
      setTodoList((prevTodoList) => prevTodoList.filter((item) => item !== task));
    }
    setInProgressList((prevInProgressList) => prevInProgressList.filter((item) => item !== task));
  }, []);

  const handleTransferTask = useCallback((task) => {
    setCompletedList((prevCompletedList) => prevCompletedList.filter((item) => item !== task));
    setTodoList((prevTodoList) => [...prevTodoList, task]);
    setInProgressList((prevInProgressList) => prevInProgressList.filter((item) => item !== task));
  }, []);

  const handleMoveToInProgress = useCallback((task) => {
    setTodoList((prevTodoList) => prevTodoList.filter((item) => item !== task));
    setInProgressList((prevInProgressList) => [...prevInProgressList, task]);
  }, []);

  return (
    <div>
      <h2>Tasks to be Performed</h2>
      <input type="text" value={taskInput} onChange={handleInputChange} />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {todoList.map((task, index) => (
          <MemoizedTodoItem
            key={index}
            task={task}
            onFinish={() => handleFinishTask(task)}
            onDelete={() => handleDeleteTask(task, false)}
            onTransfer={() => handleTransferTask(task)}
           onMoveToInProgress={() => handleMoveToInProgress(task)}
          />
        ))}
      </ul>

      <h2>In Progress</h2>
      <ul>
        {inProgressList.map((task, index) => (
          <MemoizedTodoItem
            key={index}
            task={task}
            onFinish={() => handleFinishTask(task)}
            onDelete={() => handleDeleteTask(task, false)}
            onTransfer={() => handleTransferTask(task)}
            onMoveToInProgress={() => handleMoveToInProgress(task)}
          />
        ))}
      </ul>

      <h2>Completed Tasks</h2>
      <ul>
        {completedList.map((task, index) => (
          <MemoizedTodoItem
            key={index}
            task={task}
            onFinish={() => handleDeleteTask(task, true)}
            onDelete={() => handleDeleteTask(task, true)}
            onTransfer={() => handleTransferTask(task)}
            onMoveToInProgress={() => handleMoveToInProgress(task)}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

