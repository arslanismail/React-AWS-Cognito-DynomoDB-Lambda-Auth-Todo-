import React, { useContext, useState } from "react";
import { FormControl, Input, Button } from "@chakra-ui/react";
import { TodoContext } from "./Context";
import { AuthContext } from "../Auth/AuthContext";

const AddTodoItem = () => {
  const { handleAddTodo } = useContext(TodoContext);
  const [todoText, setTodoText] = useState("");
  const { authenticatedUser } = useContext(AuthContext);

  const addTodo = async () => {
    if (todoText.trim() !== "") {
      const newTodo = {
        id: Math.random(),
        title: todoText,
        body: ""
      };

      // Make a POST request to the API
      try {
        const response = await fetch(`${process.env.REACT_APP_API_GATEWAY}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${authenticatedUser.idToken.jwtToken}`,
          },
          body: JSON.stringify(newTodo)
        });

        if (response.ok) {
          // Handle successful response
          handleAddTodo(newTodo);
          setTodoText("");
        } else {
          // Handle error response
          console.error("Failed to add todo:", response.status);
        }
      } catch (error) {
        // Handle network error
        console.error("Network error:", error);
      }
    }
  };

  return (
    <FormControl display="flex" mb={4}>
      <Input
        placeholder="Add a new todo"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <Button
        ml={2}
        colorScheme="teal"
        onClick={addTodo}
        disabled={!todoText.trim()}
      >
        Add Todo
      </Button>
    </FormControl>
  );
};

export default AddTodoItem;
