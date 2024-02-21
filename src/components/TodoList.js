import React from "react";
import TodoColumn from "./TodoColumn";

const TodoList = ({ todos, setTodos, StartedTodos, setStartedTodos, CompletedTodos, setCompletedTodos }) => {
  return (
    <div className="container">
      {/* TodoAdded Column */}
      <TodoColumn droppableId="TodoAdded" todos={todos} setTodos={setTodos} />

      {/* TodoStarted Column */}
      <TodoColumn droppableId="TodoStarted" todos={StartedTodos} setTodos={setStartedTodos} />

      {/* TodoCompleted Column */}
      <TodoColumn droppableId="TodoCompleted" todos={CompletedTodos} setTodos={setCompletedTodos} />
    </div>
  );
};

export default TodoList;
