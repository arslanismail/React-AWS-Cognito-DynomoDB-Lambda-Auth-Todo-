import React, {useContext} from "react";
import { Navigate } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";
import TodoList from "./Todo/List";
import AddTodoItem from "./Todo/Add";
import TodoContextProvider, { TodoContext } from "./Todo/Context";
import { AuthContext } from "./Auth/AuthContext";

const Home = () => {
  const { todos } = useContext(TodoContext);
  const { authenticatedUser } = useContext(AuthContext);

  if (!authenticatedUser) {
    return <Navigate to="/signin" />;
  }

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        User Profile
      </Heading>
      <Text mb={4}>Welcome, {authenticatedUser.username}!</Text>
      <AddTodoItem />
      <TodoList todos={todos} />
    </Box>
  );
};

const HomeWithContext = () => (
  <TodoContextProvider>
    <Home />
  </TodoContextProvider>
);

export default HomeWithContext;
