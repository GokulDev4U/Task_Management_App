import React, { useState, useEffect } from "react";
import "./css/App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { DragDropContext } from "react-beautiful-dnd";

const App = () => {
  const [todo, setTodo] = useState("")
  const [allTodos, setAllTodos] = useState({
    todos: [],
    StartedTodos: [],
    CompletedTodos: [],
  });

  const { todos, StartedTodos, CompletedTodos } = allTodos;

  // Load todos from local storage on component mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("allTodos")) || {
      todos: [],
      StartedTodos: [],
      CompletedTodos: [],
    };
    setAllTodos(storedTodos);
  }, []);

  // Save todos to local storage whenever todos state changes
  useEffect(() => {
    localStorage.setItem("allTodos", JSON.stringify(allTodos));
  }, [allTodos]);

  const handleAdd = (e) => {
    e.preventDefault();

    if (todo) {
      setAllTodos((prev) => ({
        ...prev,
        todos: [...prev.todos, { id: Date.now(), todo, isDone: false }],
      }));
      setTodo("");
    }
  };

  const onDragEnd = (result) => {
    console.log(result)
    const { destination, source } = result

    console.log(result)

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    let add
    let active = todos
    let started = StartedTodos;
    let complete = CompletedTodos

      // Source Logic
      if (source.droppableId === "TodoAdded") {
        add = active[source.index];
        active.splice(source.index, 1);
      } else if (source.droppableId === "TodoStarted") {
        add = started[source.index];
        started.splice(source.index, 1);
      } else {
        add = complete[source.index];
        complete.splice(source.index, 1);
      }
  
      // Destination Logic
      if (destination.droppableId === "TodoAdded") {
        active.splice(destination.index, 0, add);
      } else if (destination.droppableId === "TodoStarted") {
        started.splice(destination.index, 0, add);
      } else {
        complete.splice(destination.index, 0, add);
      }

    setAllTodos((prev) => ({
      ...prev,
      todos: active,
      StartedTodos: started,
      CompletedTodos: complete,
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Task Management App</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={(newTodos) => setAllTodos((prev) => ({ ...prev, todos: newTodos }))}
          StartedTodos={StartedTodos}
          setStartedTodos={(newStartedTodos) => setAllTodos((prev) => ({ ...prev, StartedTodos: newStartedTodos }))}
          CompletedTodos={CompletedTodos}
          setCompletedTodos={(newCompletedTodos) => setAllTodos((prev) => ({ ...prev, CompletedTodos: newCompletedTodos }))}
        />
      </div>
    </DragDropContext>
  );
};

export default App;

