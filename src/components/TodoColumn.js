import React from "react";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

const TodoColumn = ({ droppableId, todos, setTodos }) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div
          className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <span className="todos__heading">{droppableId.slice(4)} Tasks</span>
          {todos?.map((todo, index) => (
            <SingleTodo
              index={index}
              todos={todos}
              todo={todo}
              key={todo.id}
              setTodos={setTodos}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TodoColumn;
