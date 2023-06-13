import React, { useContext } from "react";
import { List, ListItem, ListIcon, CloseButton } from "@chakra-ui/react";
import { TodoContext } from "./Context";

const TodoList = () => {
  const { todos, handleDeleteTodo } = useContext(TodoContext);
  return (
    <List spacing={3}>
      {todos.map((todo) => (
        <ListItem
          key={todo.id}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          borderRadius="md"
          bg="gray.100"
          padding={3}
        >
          <span>{todo.title}</span>
          <ListIcon
            as={CloseButton}
            color="red.500"
            onClick={() => handleDeleteTodo(todo.id)}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;
