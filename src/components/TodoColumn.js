import React, { useState } from "react";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

const TodoColumn = ({ droppableId, todos, setTodos }) => {
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    setFilteredList(todos.filter((t) => t.todo === value));
  };

  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div
          className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <span className="todos__heading">{droppableId?.slice(4)} Tasks</span>
          <input
            type="text"
            onChange={handleChange}
            value={search}
          />
          {filteredList.length === 0 &&
            todos?.map((todo, index) => (
              <div>
                <SingleTodo
                  index={index}
                  todos={todos}
                  todo={todo}
                  key={todo.id}
                  setTodos={setTodos}
                />
              </div>
            ))}
          {filteredList.length > 0 &&
            filteredList?.map((todo, index) => (
              <div>
                <SingleTodo
                  index={index}
                  todos={todos}
                  todo={todo}
                  key={todo.id}
                  setTodos={setTodos}
                />
              </div>
            ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TodoColumn;
