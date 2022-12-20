import React, { FC, useState, ChangeEvent } from "react";
import { ITask } from "./Interface";
import "./App.css";
import TodoTask from "./components/TodoTask";

const App: FC = () => {
  //State
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  //Function
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadline(Number(event.target.value));
    }
  };
//add task(item)
  const addTask = (): void => {
    if(!task || deadline) return alert("plz fill input")
    const newTask = { taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);
    setTask("")
    setDeadline(0)
  };
//finish task
  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(todoList.filter((task) =>{
      return task.taskName != taskNameToDelete
    }))
  }


  return (
    <>
      <div className="App">
        <div className="header">
          <div className="input-container">
          <input
            type="text"
            placeholder="Task..."
            name="task"
            value={task}
            onChange={handleChange}
          />
          <br />
          <input
            type={"number"}
            placeholder="How many Times (in Days)..."
            name="deadline"
            // value={deadline}
            onChange={handleChange}
          />
          <br />
          <button onClick={addTask}>Add Task</button>
          </div>
        </div>
        <div className="todoList">
          {todoList.map((task: ITask, i: number)=>{
            return (
            <TodoTask key={i} task={task} completeTask={completeTask} />
            )
          })}
        </div>
      </div>
    </>
  );
};

export default App;
