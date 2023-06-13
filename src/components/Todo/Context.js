import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";

export const TodoContext = createContext();

const TodoContextProvider = (props) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authenticatedUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authenticatedUser.idToken.jwtToken}`,
          },
        };
        const response = await fetch(
          `${process.env.REACT_APP_API_GATEWAY}`,
          requestOptions
        );

        if (response.ok) {
          const data = await response.json();
          const parsedTodos = JSON.parse(data.body); // Parse the response into an array
          setTodos(parsedTodos);
          setLoading(false);
        } else {
          console.error("Error:", response.status);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteTodo = async (id) => {
    try {
      // Make the DELETE request to the API
      const response = await fetch(
        `${process.env.REACT_APP_API_GATEWAY}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authenticatedUser.idToken.jwtToken}`,
          },
        }
      );

      if (response.ok) {
        // Update the todos state by removing the deleted item
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      } else {
        console.error("Error:", response.status);
        // Handle the error case if needed
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      // Handle the error case if needed
    }
  };

  const handleAddTodo = (todo) => {
    setTodos((prevTodos) => [...prevTodos, todo]);
  };

  if (loading) {
    return <p>Loading...</p>; // Render a loading state until todos are fetched
  }

  return (
    <TodoContext.Provider
      value={{ todos: todos || [], handleDeleteTodo, handleAddTodo }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
